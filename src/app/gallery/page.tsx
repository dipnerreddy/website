// src/app/gallery/page.tsx
import React from 'react';
import ImageGrid from '@/components/gallery/ImageGrid';
import { parse } from 'csv-parse/sync'; // ✅ Import CSV parser
import { v4 as uuidv4 } from 'uuid';

export const metadata = {
  title: 'Gallery | Radiant High School',
  description: 'Explore moments and memories from Radiant High School events and activities. [Vijayawada Best School]',
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
function isGalleryImage(item: GalleryImageType | null): item is GalleryImageType {
  return item !== null;
}
// --- END TYPE PREDICATE FUNCTION ---

async function getGalleryImages(): Promise<GalleryImageType[] | { error: string }> {
  const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQD9JwQNB3ZKCsLgEkVcFY8oZ8ugVsabOYkUG-I1iSZGdYhZp1Kpod908d65h02AFvj_WJVIJTc7ucs/pub?output=csv';

  try {
    const res = await fetch(SHEET_CSV_URL);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);

    const csvText = await res.text();

    const records = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
    });

   const images: GalleryImageType[] = records.map((row: any) => ({
  id: row.id && row.id.trim() !== '' ? row.id : uuidv4(),  // Use existing id or generate UUID
  url: row.url,
  alt: row.alt || 'Gallery Image',
  width: 800, // Placeholder width
  height: 600, // Placeholder height
  public_id: row.url,
  format: row.url?.split('.').pop() || 'jpg',
}));

    return images;
  } catch (error: unknown) {
    console.error('Error fetching Google Sheet CSV:', error);
    return { error: 'Failed to load image data from Google Sheets.' };
  }
}

// React Server Component
export default async function GalleryPage() {
  console.log("[PAGE] GalleryPage: Fetching initial image data on the server...");
  const initialImagesData = await getGalleryImages();

  return (
    <>
      <ImageGrid initialImagesData={initialImagesData} />
    </>
  );
}
