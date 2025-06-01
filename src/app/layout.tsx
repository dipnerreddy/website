// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/Header';
// Correct the import for Footer:
import { Footer } from '@/components/footer/Footer'; // <<< CHANGE THIS LINE

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Radiant High School',
  description: 'Radiant High School Nunna, one of the best school situated in Vijayawada. ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="flex flex-col min-h-screen">
      <head>
        {/* Standard head elements */}
      </head>
      <body className={`${inter.className} flex flex-col flex-grow`}>
        <Header />
        <main className="flex-grow bg-[#F8F9FA]">
          {children}
        </main>
        <Footer /> {/* This should now work */}
      </body>
    </html>
  );
}