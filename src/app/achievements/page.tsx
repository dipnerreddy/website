// src/app/achievements/page.tsx
import React from 'react';
// Import components used by the AchievementsSection
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Star, Award as AwardIcon, Users, BookOpen, Medal } from "lucide-react"; // Aliased Award to AwardIcon

// Metadata remains the same
export const metadata = {
  title: 'Our Achievements | Radiant High School',
  description: 'Explore the remarkable achievements and milestones of Radiant High School students and faculty.',
};

// This is the AchievementsSection component, now part of this page file
// You could also keep it as a separate component file and import it.
const AchievementsSectionContent = () => {
  const achievements = [
    {
      icon: Trophy,
      title: "Academic Excellence",
      description: "Consistent 100% pass rate in board examinations with distinction grades",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      icon: Star,
      title: "Student Recognition",
      description: "Multiple students selected for state-level science and mathematics competitions",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: AwardIcon, // Using aliased AwardIcon
      title: "Educational Awards",
      description: "Recognized as one of the top rural schools in Andhra Pradesh",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Successfully implemented various community service programs",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: BookOpen,
      title: "Innovation in Teaching",
      description: "Pioneering digital learning initiatives in rural education with LEAD School",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      icon: Medal,
      title: "Sports Excellence",
      description: "District champions in various inter-school sports competitions",
      color: "text-red-600",
      bgColor: "bg-red-100"
    }
  ];

  const stats = [
    { number: "1500+", label: "Students Impacted", color: "text-blue-600" }, // Changed from Graduated for broader impact
    { number: "35+", label: "Dedicated Teachers", color: "text-green-600" },
    { number: "50+", label: "Awards & Recognitions", color: "text-orange-600" }, // Changed from Recognition
    { number: "95%", label: "Parent Satisfaction Rate", color: "text-purple-600" } // Added Rate
  ];

  return (
    // The section id "achievements" might conflict if your page layout has other nav items
    // using it. If this is the main content of the /achievements page, an id might not be needed
    // or can be more specific like "detailed-achievements".
    <section id="detailed-achievements" className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header from reference is used in the page's main header now */}
        
        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <Card key={index} className="group rounded-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 sm:hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 ${achievement.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`h-7 w-7 sm:h-8 sm:w-8 ${achievement.color}`} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-6 sm:mb-8">
            Our Impact in Numbers
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl sm:text-4xl md:text-5xl font-bold ${stat.color} mb-1 sm:mb-2`}>
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium text-xs sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notable Alumni Section */}
        <Card className="mt-12 sm:mt-16 bg-gradient-to-r from-blue-600 to-orange-600 text-white rounded-xl sm:rounded-2xl">
          <CardContent className="p-6 sm:p-8 text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Alumni Success Stories</h3>
            <p className="text-md sm:text-lg opacity-90 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed">
              Our graduates have gone on to excel in various fields including engineering, 
              medicine, and technology. They continue to make us proud 
              and inspire our current students to reach for the stars.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-center">
              <div>
                <div className="text-xl sm:text-2xl font-bold">85%</div>
                <div className="text-xs sm:text-sm opacity-90">Pursuing Higher Education</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold">60%</div>
                <div className="text-xs sm:text-sm opacity-90">In Professional Courses</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold">40%</div>
                <div className="text-xs sm:text-sm opacity-90">In Engineering & Medicine</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};


const AchievementsPage = () => {
  // The Google Doc embed URL is no longer needed if replaced by the new section
  const achievementsDocEmbedUrl = 'https://docs.google.com/document/d/e/2PACX-1vRfOm7iy2tHkDe7xD9mnQ5xmgkA_hzNF2ufsLLMXdY8YT49PoTDh-AAlpJP6oig_A/pub?embedded=true';

  return (
    // Adjusted background to match the reference section's gradient
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-[calc(100vh-var(--header-height,150px)-var(--footer-height,300px))] py-10 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Page Header - Merged with the reference section's header */}
        <header className="text-center mb-12 md:mb-16"> {/* Increased bottom margin */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"> {/* Changed color from slate-800 */}
            Our Achievements
          </h1>
          <div className="w-20 sm:w-24 h-1 bg-blue-600 mx-auto my-4 sm:my-6"></div> {/* Added underline */}
          <p className="mt-3 text-md sm:text-lg text-gray-600 max-w-2xl sm:max-w-3xl mx-auto"> {/* Changed color from slate-600 */}
            Celebrating milestones of excellence, recognition, and the success stories 
            that define our commitment to quality education and holistic development at Radiant High School.
          </p>
        </header>

        {/* Render the new AchievementsSectionContent */}
        <AchievementsSectionContent />
        
        {/* The Google Doc embed is now removed. If you want to keep it as an *additional* resource, 
            you can uncomment the section below and place it appropriately. */}
        
        <div className="mt-16 bg-white p-2 sm:p-4 md:p-6 rounded-lg shadow-xl border">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-6 text-center">
            Archived Achievements Report
          </h2>
          <div className="mx-auto max-w-4xl">
            <iframe
              src={achievementsDocEmbedUrl}
              title="School Achievements Report - Google Docs"
              className="w-full h-[80vh] md:h-[70vh] lg:h-[85vh] rounded border"
            >
              <p className="p-4 text-center">
                Your browser does not support embedded documents.
              </p>
            </iframe>
          </div>
          <p className="text-center mt-6 text-sm text-slate-600">
            <a href={achievementsDocEmbedUrl.replace('/pub?embedded=true', '/edit')} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Open Archived Report in a new tab
            </a>
          </p>
        </div>
       
      </div>
    </div>
  );
};

export default AchievementsPage;