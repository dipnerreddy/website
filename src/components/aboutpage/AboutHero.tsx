// src/components/aboutpage/AboutHero.tsx
import React from 'react';
import Image from 'next/image';

const AboutHero = () => {

  return (
    // Ensure the main hero container itself doesn't unintentionally get a high z-index
    // by default. Giving it a specific, lower z-index can help.
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] z-0"> {/* ADDED z-0 or z-1 (if needed) */}
      {/* Background Image */}
      <Image
        src='/images/slide1.jpg'
        alt="Radiant High School students. Best School in Vijayawada."
        layout="fill"
        objectFit="cover"
        className="z-0" // This z-0 is for within this component's stacking context
        priority
      />
      {/* Overlay */}
      {/* This overlay has z-10 in your original code, let's keep it or ensure it's below menu */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-[5]"></div> {/* Changed z-10 to z-[5] or similar */}

      {/* Text Content */}
      {/* This text has z-20 in your original code, ensure it's below menu */}
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white p-4 z-[6]"> {/* Changed z-20 to z-[6] or similar */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Discover Radiant High School, Nunna
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl max-w-3xl">
          Radiant High School in Vijayawada empowers students through academic excellence, character building, and future-ready innovation in a dynamic learning environment.
        </p>
      </div>
    </div>
  );
};

export default AboutHero;