// src/components/homepage/HomeComponent2.tsx
"use client";

import React from 'react';
// Import Button component (assuming Shadcn/ui or similar)
import { Button } from "@/components/ui/button";
// Import icons (assuming lucide-react)
import { BookOpen, ArrowRight } from "lucide-react";
import Link from 'next/link';

// Old const variables are no longer needed for this new design
// const heroImageSrc = '/images/slide1.jpg';
// const heroImageAlt = 'Inspiring educational environment';
// const heroQuote = "Excellence happens not by accident. <br /> It is a process.";

const HomeComponent2 = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        {/* You might want to make these responsive or adjust positioning based on screen size */}
        <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-48 h-48 sm:w-64 sm:h-64 bg-blue-500 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-48 h-48 sm:w-64 sm:h-64 bg-orange-500 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"> {/* Added py padding */}
        <div className="text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-6 sm:mb-8">
            {/* Consider using Next.js Image component here if image is in public folder and for optimization */}
            <img 
              src="/small-logo.png" 
              alt="Radiant High School Logo" 
              className="h-24 sm:h-32 w-auto" // Removed animate-fade-in for now, ensure it's defined if you use it
            />
          </div>

          {/* Main Headline */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              <span className="text-[#1A3E72]">Radiant High School</span> 
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl text-[#00A3D9] font-semibold">
              Nunna, Vijayawada
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xl sm:max-w-2xl mx-auto">
              Excellence in Education Since 2017
            </p>
          </div>

          {/* Tagline */}
          <div className="text-center py-4 sm:py-6">
            <p className="text-xl sm:text-2xl md:text-3xl font-light text-orange-600 italic">
              &quot;Where Knowledge Rises&quot;
            </p>
          </div>

          {/* Description */}
          <p className="text-md sm:text-lg text-gray-700 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed">
            A leading co-educational institution in Vijayawada, Andhra Pradesh, 
            committed to nurturing young minds from <span className="font-bold text-[#1A3E72] ">Kindergarden to Class 10</span> through academic excellence, 
            holistic development, and community engagement.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-6 sm:pt-8">
            <Link href="/academics">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold group w-full sm:w-auto"
              >
                <BookOpen className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Explore Academics
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            {/* <Link href="/admissions">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700 px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold w-full sm:w-auto"
              >
                Join Us Today.
              </Button>
            </Link> */}
          </div>

          {/* School Info Banner */}
          <div className="mt-12 sm:mt-16 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 max-w-3xl sm:max-w-4xl mx-auto border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-center">
              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-blue-600">Classes</h3>
                <p className="text-gray-700 text-sm sm:text-base">Kindergarden to 10th Grade</p>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-orange-600">Established</h3>
                <p className="text-gray-700 text-sm sm:text-base">2017</p>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-green-600">Education Type</h3>
                <p className="text-gray-700 text-sm sm:text-base">Co-Educational</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeComponent2;