// src/components/academics/AcademicsTabs.tsx
"use client"; // This component uses client-side state

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Award, Target as TargetIcon, LucideIcon } from "lucide-react"; // Import LucideIcon

// Define the structure and data for content first.
// This allows TypeScript to infer its shape and keys.
const contentData = {
  curriculum: {
    title: "Comprehensive Curriculum (LEAD School)",
    description: "At Radiant High School, Nunna, we follow the integrated and internationally benchmarked curriculum of LEAD School, designed to provide a strong foundation while encouraging critical thinking, creativity, and making students future-ready. More details below.",
    items: [
      "English Language & Literature (ELGA program focus)",
      "Mathematics & Advanced Mathematics (Concrete-Pictorial-Abstract approach)",
      "Science (Physics, Chemistry, Biology - Inquiry-based learning)",
      "Social Studies (History, Geography, Civics - Real-world connections)",
      "Coding & Computational Skills (CCS program)",
      "Second Language (Telugu/Hindi - Aligned with NEP guidelines)",
      "Digital Literacy & Citizenship",
      "Holistic development through co-curricular activities"
    ]
  },
  teaching: {
    title: "Innovative Teaching Methodologies",
    description: "We employ modern teaching techniques that make learning engaging, interactive, and effective for all students, inspired by LEAD School's best practices.",
    items: [
      "Interactive Smart Classrooms with audio-visual aids",
      "Experiential & Project-Based Learning",
      "Collaborative Group Activities & Peer Learning",
      "Hands-on Science Experiments & STEM activities",
      "Use of Digital Learning Resources & Apps (LEAD Student App)",
      "Personalized Attention & Differentiated Instruction",
      "Regular Doubt Clearing Sessions",
      "Flipped Classroom approach where applicable"
    ]
  },
  assessment: {
    title: "Holistic Assessment Patterns",
    description: "Our assessment system, aligned with LEAD School, evaluates not just academic performance but overall development and mastery of concepts.",
    items: [
      "Continuous & Comprehensive Evaluation (CCE)",
      "Formative and Summative Assessments",
      "Practical & Laboratory Assessments",
      "Project Work, Presentations & Portfolios",
      "Skill-based assessments (e.g., ELGA levels)",
      "Regular feedback to students and parents (via PTMs and LEAD App)",
      "Remedial support based on assessment outcomes",
      "National-level benchmarking with LEAD"
    ]
  },
  approach: {
    title: "Student-Centered Approach (LEAD Philosophy)",
    description: "We believe in nurturing each child's unique potential through personalized attention, holistic development, and empowering them to take charge of their learning journey.",
    items: [
      "Focus on conceptual understanding over rote learning",
      "Small Class Sizes for Better Teacher-Student Interaction",
      "Regular Parent-Teacher Meetings & Communication (LEAD App)",
      "Guidance & Counselling Services",
      "Emphasis on Extracurricular & Co-curricular Development",
      "Leadership skill development programs",
      "Building essential 21st-century skills (Communication, Collaboration, Creativity, Critical Thinking)",
      "Fostering a love for lifelong learning"
    ]
  }
};

// Derive the type for tab IDs from the keys of contentData.
// This will be "curriculum" | "teaching" | "assessment" | "approach"
type ActiveTabId = keyof typeof contentData;

// Define an interface for the tab objects
interface TabConfig {
  id: ActiveTabId;
  label: string;
  icon: LucideIcon; // Use the specific LucideIcon type
}

// Renamed from AcademicsSection to be more specific about its content
const AcademicsTabs = () => {
  // Type the activeTab state with ActiveTabId
  const [activeTab, setActiveTab] = useState<ActiveTabId>("curriculum");

  const tabs: TabConfig[] = [
    { id: "curriculum", label: "Curriculum", icon: BookOpen },
    { id: "teaching", label: "Teaching Methods", icon: Users },
    { id: "assessment", label: "Assessment", icon: Award },
    { id: "approach", label: "Our Approach", icon: TargetIcon },
  ];

  // Get the content for the currently active tab.
  // This is now type-safe because activeTab is guaranteed to be a key of contentData.
  const currentTabData = contentData[activeTab];

  return (
    <section id="academics-detailed" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Academic Excellence at Radiant High School
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-blue-600 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-md sm:text-lg text-gray-600 max-w-2xl sm:max-w-3xl mx-auto">
            Providing quality education through innovative teaching methods, a comprehensive curriculum via LEAD School, 
            and personalized attention to help every student reach their full potential.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                className={`px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-200 rounded-md sm:rounded-lg ${
                  activeTab === tab.id 
                    ? "bg-blue-600 text-white shadow-lg" 
                    : "text-gray-600 hover:text-blue-600 hover:border-blue-600 border-gray-300"
                }`}
                onClick={() => setActiveTab(tab.id)} // tab.id is of type ActiveTabId
              >
                <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                {tab.label}
              </Button>
            );
          })}
        </div>
        <Card className="shadow-xl rounded-lg">
          <CardContent className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {currentTabData.title} {/* Accessing properties on type-safe currentTabData */}
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {currentTabData.description}
                </p>
                <div className="space-y-2">
                  <h4 className="text-md sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Key Features:</h4>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {/* currentTabData.items is guaranteed to be string[] */}
                    {currentTabData.items.slice(0, 4).map((item, index) => (
                      <li key={index} className="flex items-start space-x-2 sm:space-x-3">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full mt-[7px] sm:mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-2 mt-4 lg:mt-0">
                <h4 className="text-md sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 pt-0 lg:pt-12">Additional Benefits:</h4>
                <ul className="space-y-1.5 sm:space-y-2">
                  {currentTabData.items.slice(4).map((item, index) => (
                    <li key={index} className="flex items-start space-x-2 sm:space-x-3">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full mt-[7px] sm:mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-16 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">1-10</div>
            <div className="text-gray-600 text-xs sm:text-sm">Grade Levels</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1 sm:mb-2">15:1</div>
            <div className="text-gray-600 text-xs sm:text-sm">Student-Teacher Ratio</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">100%</div>
            <div className="text-gray-600 text-xs sm:text-sm">Target Pass Rate</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">8+</div>
            <div className="text-gray-600 text-xs sm:text-sm">Years of Excellence</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicsTabs;