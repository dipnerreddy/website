// src/app/gallery/page.tsx
import React from 'react';
import ImageGrid from '@/components/gallery/ImageGrid'; // Assuming this path
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary - this is fine here as it's a Server Component
// Ensure these environment variables are set in your .env.local and on Vercel
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

// Define the shape of the image data we expect
export interface GalleryImageType { // Renamed to avoid conflict if used elsewhere
  id: string;
  url: string;
  width: number;
  height: number;
  alt: string;
  public_id: string; // Keep for reference or advanced transformations
  format: string;    // Keep for reference
}

async function getGalleryImages(): Promise<GalleryImageType[] | { error: string }> {
  const FOLDER_NAME = 'radiant_high_gallery'; // Ensure this EXACTLY matches your Cloudinary folder name

  try {
    console.log(`[SERVER] getGalleryImages: Attempting to fetch from folder: ${FOLDER_NAME}`);
    
    const searchResult = await cloudinary.search
      .expression(`folder:${FOLDER_NAME}`) // Query for assets in the specified folder
      .sort_by('uploaded_at', 'desc')     // Show newest images first
      .max_results(50)                    // Limit results (consider pagination for more)
      .with_field('context')              // To get custom metadata like alt text or captions
      .execute();

    // console.log('[SERVER] getGalleryImages: Full Cloudinary searchResult:', JSON.stringify(searchResult, null, 2)); // Verbose log

    const resources = searchResult.resources;

    if (!resources) {
      console.warn(`[SERVER] getGalleryImages: No 'resources' field in Cloudinary response for folder '${FOLDER_NAME}'.`);
      return [];
    }
    if (resources.length === 0) {
      console.warn(`[SERVER] getGalleryImages: No images found in folder '${FOLDER_NAME}'.`);
      return [];
    }

    console.log(`[SERVER] getGalleryImages: Found ${resources.length} resources in folder '${FOLDER_NAME}'.`);

    const images = resources.map((resource: any) => {
      // Construct alt text: try custom context, then filename, then a generic fallback
      let altText = (resource.context?.custom?.alt) ||
                    (resource.context?.custom?.caption) ||
                    (resource.filename ? resource.filename.replace(/[-_]/g, ' ') : '') ||
                    `Gallery image ${resource.public_id}`;
      
      // Validate essential properties
      if (!resource.public_id || !resource.secure_url || resource.width == null || resource.height == null) {
        console.warn('[SERVER] getGalleryImages: Resource missing essential properties:', resource.public_id || 'Unknown public_id');
        return null; // This item will be filtered out
      }

      return {
        id: resource.public_id,
        url: resource.secure_url,
        width: resource.width,
        height: resource.height,
        alt: altText,
        public_id: resource.public_id,
        format: resource.format,
      };
    }).filter(image => image !== null) as GalleryImageType[]; // Filter out any nulls from invalid resources

    console.log(`[SERVER] getGalleryImages: Successfully processed ${images.length} valid images.`);
    return images;

  } catch (error: any) {
    console.error('[SERVER] getGalleryImages: Error fetching images from Cloudinary:', error);
    let errorMessage = 'Failed to fetch images.';
    if (error.error && error.error.message) { 
        errorMessage += ` Cloudinary Error: ${error.error.message}`;
    } else if (error.message) {
        errorMessage += ` Details: ${error.message}`;
    }
    return { error: errorMessage };
  }
}

// This is a React Server Component (RSC) by default in the App Router
export default async function GalleryPage() {
  console.log("[PAGE] GalleryPage: Fetching initial image data on the server...");
  const initialImagesData = await getGalleryImages();
  // The console.log for imageData was already in your snippet, which is good for debugging

  return (
    <>
      {/* Optional: A small hero/banner for this page */}
      {/* <div className="bg-purple-600 text-white py-10 text-center">
        <h1 className="text-4xl font-bold">Moments & Memories</h1>
        <p className="text-lg mt-2">A glimpse into life at Radiant High.</p>
      </div> */}
      <ImageGrid initialImagesData={initialImagesData} />
    </>
  );
}