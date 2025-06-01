// src/components/homepage/HomeComponent3.tsx
import React from 'react';
// We don't need next/image or next/link from the old component if not used here
// Import Card components (assuming Shadcn/ui or similar)
import { Card, CardContent } from "@/components/ui/card";
// Import icons (assuming lucide-react)
import { Target, Eye, Heart } from "lucide-react"; // Removed Users as it's not in the final reference
import Link from 'next/link';

// It's common practice to name the component based on its content/purpose
// So, if this section is truly "About Us", `AboutSection` might be a better name.
// For now, I'll keep HomeComponent3 as per your file name.
const HomeComponent3 = () => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-gray-50"> {/* Added responsive padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Radiant High School
          </h2>
          <div className="w-40 sm:w-24 h-1 bg-blue-600 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-md sm:text-lg text-gray-600 max-w-2xl sm:max-w-3xl mx-auto">
            Established in 2017, Radiant High School has been a beacon of educational excellence 
            in Nunna, Vijayawada. shaping young minds and building tomorrow&apos;s leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
          {/* Text Content (Our Story) */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-2xl font-semibold sm:font-bold text-gray-900">Our Story</h3>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              Founded with a vision to provide quality education to students in Vijayawada, 
              Radiant High School has grown to become a trusted institution for holistic education. 
              We believe that every child has the potential to shine, and our role is to provide 
              the right environment and guidance to help them discover their talents.
            </p>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              Our dedicated team of educators works tirelessly to ensure that students not only 
              excel academically but also develop into well-rounded individuals with strong moral 
              values and leadership qualities. We foster an environment where knowledge truly rises 
              and students are prepared for the challenges of tomorrow.
            </p>
            {/* You can add a "Learn More" button here if desired, similar to your old component */}
            
            <Link
              href="/about-us" // Or a more specific page like /our-story
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow-md transition-colors text-sm"
            >
              Discover Our Journey
            </Link> 
           
          </div>

          {/* Principal's Image & Message */}
          <div className="relative">
            <Card className="overflow-hidden shadow-lg rounded-lg"> {/* Ensured rounded-lg for consistency */}
              <CardContent className="p-0">
                {/* Consider using next/image here */}
                <img 
                  src="/images/principal.png" // Image from reference
                  alt="Principal of Radiant High School, Avuthu Madhu Sudhan Reddy" 
                  className="w-full h-80 sm:h-96 object-cover" // Adjusted height
                />
                <div className="p-4 sm:p-6 bg-white">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Message From Avuthu Madhu Sudhan Reddy</h4>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed"> {/* Adjusted text size and leading */}
                    &quot;Education is the most powerful weapon which you can use to change the world. 
                    At Radiant High School, we are committed to empowering every student with 
                    knowledge, skills, and values.&quot; <br />
                    ~ Principal, Radiant High School.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Vision, Mission, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <Card className="text-center p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg"> {/* Ensured rounded-lg */}
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold sm:font-bold text-gray-900">Our Vision</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                To be a leading educational institution that nurtures creative, confident, 
                and compassionate global citizens who contribute positively to society.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg"> {/* Ensured rounded-lg */}
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Target className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold sm:font-bold text-gray-900">Our Mission</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                To provide quality education that develops academic excellence, critical thinking, 
                moral values, and life skills in a supportive and inclusive environment.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg"> {/* Ensured rounded-lg */}
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold sm:font-bold text-gray-900">Our Values</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Integrity, Excellence, Respect, Innovation, and Community - these core values 
                guide everything we do and shape the character of our students.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HomeComponent3;