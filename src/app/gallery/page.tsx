// src/app/gallery/page.tsx
import React from 'react';
import ImageGrid from '@/components/gallery/ImageGrid'; // Assuming this path
import { v2 as cloudinary } from 'cloudinary';

// Define a more specific type for Cloudinary resource if you want, or parts of it
interface CloudinaryResourceBasic {
  public_id: string;
  secure_url: string;
  width?: number;
  height?: number;
  context?: { custom?: { alt?: string; caption?: string } };
  filename?: string;
  format?: string;
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const metadata = {
  title: 'Gallery | Radiant High School',
  description: 'Explore moments and memories from Radiant High School events and activities.',
};

// Define the shape of the image data we expect for our components
export interface GalleryImageType {
  id: string;
  url: string;
  width: number;
  height: number;
  alt: string;
  public_id: string;
  format: string;
}

// --- TYPE PREDICATE FUNCTION ---
// This function checks if an item is not null AND asserts its type to GalleryImageType for TypeScript
function isGalleryImage(item: GalleryImageType | null): item is GalleryImageType {
  return item !== null;
}
// --- END OF TYPE PREDICATE FUNCTION ---

async function getGalleryImages(): Promise<GalleryImageType[] | { error: string }> {
  const FOLDER_NAME = 'radiant_high_gallery';

  try {
    console.log(`[SERVER] getGalleryImages: Attempting to fetch from folder: ${FOLDER_NAME}`);
    
    const searchResult = await cloudinary.search
      .expression(`folder:${FOLDER_NAME}`)
      .sort_by('uploaded_at', 'desc')    
      .max_results(50)                   
      .with_field('context')             
      .execute();

    const resources: CloudinaryResourceBasic[] = searchResult.resources || [];

    if (resources.length === 0) {
      console.warn(`[SERVER] getGalleryImages: No images found in folder '${FOLDER_NAME}'.`);
      return [];
    }
    
    console.log(`[SERVER] getGalleryImages: Found ${resources.length} resources in folder '${FOLDER_NAME}'.`);

    // Explicitly type the result of map as an array that can contain GalleryImageType or null
    const mappedImages: (GalleryImageType | null)[] = resources.map((resource: CloudinaryResourceBasic) => {
      let altText = (resource.context?.custom?.alt) ||
                    (resource.context?.custom?.caption) ||
                    (resource.filename ? resource.filename.replace(/[-_]/g, ' ') : '') ||
                    `Gallery image ${resource.public_id}`;
      
      // Check for essential properties. If any are missing, return null for this item.
      if (resource.public_id == null || resource.secure_url == null || resource.width == null || resource.height == null) {
        console.warn('[SERVER] getGalleryImages: Resource missing essential properties:', resource.public_id || 'Unknown public_id');
        return null; 
      }

      return {
        id: resource.public_id,
        url: resource.secure_url,
        width: resource.width, // width will be number here
        height: resource.height, // height will be number here
        alt: altText,
        public_id: resource.public_id,
        format: resource.format || '', // Ensure format is always string
      };
    });

    // --- USE THE TYPE PREDICATE IN THE FILTER ---
    const images: GalleryImageType[] = mappedImages.filter(isGalleryImage);
    // --- END OF USING TYPE PREDICATE ---

    console.log(`[SERVER] getGalleryImages: Successfully processed ${images.length} valid images.`);
    return images;

  } catch (error: unknown) {
    console.error('[SERVER] getGalleryImages: Error fetching images from Cloudinary:', error);
    let errorMessage = 'Failed to fetch images.';
    if (error instanceof Error) {
        errorMessage += ` Details: ${error.message}`;
    } else if (typeof error === 'object' && error !== null && 'error' in error) {
        // Attempt to parse Cloudinary specific error structure if present
        const cdError = (error as { error?: { message?: string } }).error;
        if (cdError && cdError.message) {
            errorMessage += ` Cloudinary Error: ${cdError.message}`;
        }
    } else if (typeof error === 'string') {
        errorMessage += ` Details: ${error}`;
    }
    return { error: errorMessage };
  }
}

// This is a React Server Component (RSC) by default in the App Router
export default async function GalleryPage() {
  console.log("[PAGE] GalleryPage: Fetching initial image data on the server...");
  const initialImagesData = await getGalleryImages();

  return (
    <>
      <ImageGrid initialImagesData={initialImagesData} />
    </>
  );
}