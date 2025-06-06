// src/components/gallery/ImageGrid.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import FsLightbox from 'fslightbox-react';
import { GalleryImageType } from '@/app/gallery/page'; // Import the type from page.tsx

interface ImageGridProps {
  initialImagesData: GalleryImageType[] | { error: string };
}

const ImageGrid: React.FC<ImageGridProps> = ({ initialImagesData }) => {
  const [images, setImages] = useState<GalleryImageType[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });

  function openLightboxOnSlide(slideNumber: number) {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: slideNumber,
    });
  }

  useEffect(() => {
    if (initialImagesData && 'error' in initialImagesData) {
      setError(initialImagesData.error);
      setImages([]);
      console.error("ImageGrid received error:", initialImagesData.error);
    } else if (initialImagesData && Array.isArray(initialImagesData)) {
      setImages(initialImagesData);
      setError(null);
    } else {
      setError("Invalid initial data for gallery.");
      setImages([]);
      console.error("ImageGrid received invalid initialImagesData:", initialImagesData);
    }
  }, [initialImagesData]);

  if (error) {
    return (
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-2 sm:px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-10 md:mb-12">
            Photo Gallery
          </h2>
          <p className="text-xl text-red-600">Error loading gallery: {error}</p>
          <p className="text-slate-500 mt-2">Please try again later or contact support.</p>
        </div>
      </section>
    );
  }

  // Show a loading or empty state if images are not yet populated but no error
  // This handles the initial render before useEffect sets the images from props
  if (images.length === 0 && !error) { // Added !error condition
    // Check if initialImagesData was passed but just resulted in empty images (not an error)
    const wasDataProcessed = initialImagesData && (Array.isArray(initialImagesData) || 'error' in initialImagesData);
    if (!wasDataProcessed) {
        // This could be an initial "loading from prop" state if desired, though with RSC it should be immediate.
        // For now, if initialImagesData isn't there yet (shouldn't happen with RSC), show "No images"
         return (
            <section className="py-10 md:py-16">
                <div className="container mx-auto px-2 sm:px-4 md:px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-10 md:mb-12">
                    Photo Gallery
                </h2>
                <p className="text-xl text-slate-600">Loading gallery...</p> {/* Or a spinner */}
                </div>
            </section>
        );
    }
    // If data was processed and images array is still empty (and no error)
    return (
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-2 sm:px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-10 md:mb-12">
            Photo Gallery
          </h2>
          <p className="text-xl text-slate-600">No images in the gallery yet. Check back soon!</p>
        </div>
      </section>
    );
  }


  return (
    <section className="py-10 md:py-16 bg-[#F8F9FA]">
      <div className="container mx-auto px-2 sm:px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-10 md:mb-12">
          Photo Gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden cursor-pointer group relative shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
              onClick={() => openLightboxOnSlide(index + 1)}
              title={`View ${image.alt}`}
            >
              {/* <Image
                src={image.url}
                alt={image.alt}
                fill 
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                priority={index < 10} 
              /> */}

              <img
                src={image.url}
                alt={image.alt || 'Gallery image'}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                loading={index < 10 ? 'eager' : 'lazy'}
              />

            </div>
          ))}
        </div>
      </div>

      {images.length > 0 && (
        <FsLightbox
          toggler={lightboxController.toggler}
          sources={images.map(img => img.url)}
          slide={lightboxController.slide}
        />
      )}
    </section>
  );
};

export default ImageGrid;