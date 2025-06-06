// src/components/aboutpage/AboutHero.tsx
import React from 'react';

const AboutHero = () => {
  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] z-0">
      {/* Background Image */}
      <img
        src="/images/slide1.jpg"
        alt="Radiant High School students. Best School in Vijayawada."
        className="absolute inset-0 w-full h-full object-cover z-0"
        loading="eager"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-[5]"></div>

      {/* Text Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white p-4 z-[6]">
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
