// src/components/aboutpage/HistoryTimeline.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { FiFlag, FiAward, FiHome, FiTrendingUp, FiCheckCircle, FiStar } from 'react-icons/fi';

const IconMap: { [key: string]: React.ElementType } = {
  Home: FiHome, Milestone: FiTrendingUp, Award: FiAward, Flag: FiFlag, Achievement: FiCheckCircle, Star: FiStar,
};

interface TimelineEventData {
  ID: string; Year: string; Title: string; Description: string; IconName: string; ColorClass: string;
}

const HistoryTimeline = () => {
  const [timelineEvents, setTimelineEvents] = useState<TimelineEventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ... (fetchData logic as before) ...
    const fetchData = async () => {
      setLoading(true); setError(null);
      const csvUrl = process.env.NEXT_PUBLIC_TIMELINE_EVENTS_CSV_URL;
      if (!csvUrl) { setError("Timeline URL not configured."); setLoading(false); return; }
      try {
        Papa.parse(csvUrl, {
          download: true, header: true, skipEmptyLines: true,
          complete: (results) => {
            if (results.errors.length > 0) {
              console.error("CSV Errors:", results.errors);
              setError("Error parsing timeline. Check CSV."); setLoading(false); return;
            }
            const data = (results.data as TimelineEventData[])
                          .filter(item => item.ID && item.Year && item.Title && item.ColorClass && item.IconName);

            const sorted = data.sort((a, b) => {
              if (a.Year === 'Present') return 1; if (b.Year === 'Present') return -1;
              const yA = parseInt(a.Year.split('-')[0]), yB = parseInt(b.Year.split('-')[0]);
              return !isNaN(yA) && !isNaN(yB) ? yA - yB : a.Year.localeCompare(b.Year);
            });
            setTimelineEvents(sorted); setLoading(false);
          },
          error: (err: any) => { console.error("Papa DL Error:", err); setError(`Download/Parse Error: ${err.message}`); setLoading(false); }
        });
      } catch (e: any) { setError(e.message || "Fetch Error"); setLoading(false); }
    };
    fetchData();
  }, []);


  const renderIcon = (iconName: string) => {
    const IconComponent = IconMap[iconName] || FiStar;
    return <IconComponent className="text-slate-900" size={20} />;
  };

  if (loading) return <p className="text-center text-slate-600 py-10">Loading timeline...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Error: {error}</p>;
  if (timelineEvents.length === 0) return <p className="text-center text-slate-600 py-10">Timeline information coming soon.</p>;

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12 md:mb-16">
          Our Journey Through Time
        </h2>
        <div className="relative"> {/* Main timeline container */}
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-300 transform -translate-x-1/2 h-full z-0"></div>

          {timelineEvents.map((event, index) => {
            const isLeftAlignedContent = index % 2 === 0; // Content on the left for desktop

            return (
              <div
                key={event.ID}
                // Each item pushes its content to one side on desktop
                className={`md:flex ${isLeftAlignedContent ? 'md:justify-start' : 'md:justify-end'} mb-10 md:mb-8 relative`}
                // Added md:relative here for the icon's absolute positioning within this item "row"
              >
                {/* Desktop Icon - Positioned absolutely to sit on the central line */}
                {/* It's positioned relative to the parent 'timeline-item' div */}
                <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className={`w-10 h-10 rounded-full ${event.ColorClass || 'bg-gray-400'} flex items-center justify-center shadow-md`}>
                    {renderIcon(event.IconName)}
                  </div>
                </div>

                {/* Content Section (Mobile: full width with icon inline, Desktop: half width) */}
                <div className={`w-full md:w-[calc(50%-2.5rem)] ${isLeftAlignedContent ? 'md:mr-auto' : 'md:ml-auto'}`}>
                  {/* Mobile Icon and Title */}
                  <div className="flex items-center md:hidden mb-3">
                    <div className={`w-10 h-10 rounded-full ${event.ColorClass || 'bg-gray-400'} flex items-center justify-center shadow-md mr-4 flex-shrink-0`}>
                      {renderIcon(event.IconName)}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700">{event.Year} - {event.Title}</h3>
                  </div>
                  
                  {/* Content Box */}
                  <div
                    className={`bg-slate-50 p-6 rounded-lg shadow-lg relative 
                                border-t-4 md:border-t-0 
                                ${isLeftAlignedContent ? 'md:text-right md:border-r-4' : 'md:text-left md:border-l-4'}`}
                    style={{ borderColor: event.ColorClass ? event.ColorClass.replace('bg-', '') : 'transparent' }}
                  >
                    {/* Arrow for Desktop */}
                    <div
                      className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 w-0 h-0 
                                  border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent
                                  ${isLeftAlignedContent ? 'left-full border-l-[10px]' : 'right-full border-r-[10px]' }`}
                      style={{ 
                        borderColor: isLeftAlignedContent 
                          ? `transparent transparent transparent ${event.ColorClass ? event.ColorClass.replace('bg-', '') : 'transparent'}` 
                          : `transparent ${event.ColorClass ? event.ColorClass.replace('bg-', '') : 'transparent'} transparent transparent`
                      }}
                    ></div>
                    
                    <h3 className={`hidden md:block text-xl font-semibold text-slate-700 mb-1`}>{event.Year} - {event.Title}</h3>
                    <p className={`text-md text-slate-600 leading-relaxed`}>
                      {event.Description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;