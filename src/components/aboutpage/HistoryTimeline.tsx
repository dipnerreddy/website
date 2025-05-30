// src/components/aboutpage/HistoryTimeline.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Papa, { ParseError, ParseResult, ParseRemoteConfig } from 'papaparse';
import { FiFlag, FiAward, FiHome, FiTrendingUp, FiCheckCircle, FiStar } from 'react-icons/fi';

const IconMap: { [key: string]: React.ElementType } = {
  Home: FiHome,
  Milestone: FiTrendingUp,
  Award: FiAward,
  Flag: FiFlag,
  Achievement: FiCheckCircle,
  Star: FiStar,
  Default: FiStar,
};

interface TimelineEventData {
  ID: string;
  Year: string;
  Title: string;
  Description: string;
  IconName: string;
  ColorClass: string;
}

const HistoryTimeline = () => {
  const [timelineEvents, setTimelineEvents] = useState<TimelineEventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const csvUrlFromEnv ="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ1UzCy7EhMQB4YYYQM8aH-2QNXL90Ld4Pha9Zqzn7koV6HMIhdg1-Aou6CyDnDP5T75fzYMf6quQOt/pub?gid=0&single=true&output=csv";

      if (!csvUrlFromEnv) {
        setError("Timeline events data source URL is not configured.");
        setLoading(false);
        return;
      }

      const csvUrl: string = csvUrlFromEnv;

      const papaConfig: ParseRemoteConfig<TimelineEventData> = {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (results: ParseResult<TimelineEventData>) => {
          if (results.errors.length > 0) {
            console.error("CSV Parsing Errors (Timeline):", results.errors);
            const errorMessages = results.errors.map(err => err.message).join(', ');
            setError(`Error parsing timeline data. Details: ${errorMessages}. Please check CSV format/headers.`);
            setLoading(false);
            return;
          }

          const data = (results.data || []).filter(
            item =>
              item.ID &&
              item.Year &&
              item.Title &&
              item.Description &&
              item.ColorClass &&
              item.IconName
          );

          const sorted = data.sort((a, b) => {
            if (a.Year === 'Present') return 1;
            if (b.Year === 'Present') return -1;
            const yearA = parseInt(a.Year.split('-')[0], 10);
            const yearB = parseInt(b.Year.split('-')[0], 10);
            return !isNaN(yearA) && !isNaN(yearB) ? yearA - yearB : a.Year.localeCompare(b.Year);
          });

          setTimelineEvents(sorted);
          setLoading(false);
        },
      //  error: (err: Error, file: string) => {
      //   console.error("PapaParse Download/Parse Error (Timeline):", err);
      //   let errorMessage = "Failed to download or parse timeline data.";
      //   if (err?.message) {
      //     errorMessage += ` Error: ${err.message}`;
      //   }
      //   setError(errorMessage);
      //   setLoading(false);
      // }
      error: (err: Error, file: string) => {
        console.error("PapaParse Download/Parse Error (Timeline):", err);
        let errorMessage = "Failed to download or parse timeline data.";
        if (err?.message) {
          errorMessage += ` Error: ${err.message}`;
        }
        setError(errorMessage);
        setLoading(false);
      }
      };

      try {
        Papa.parse<TimelineEventData>(csvUrl, papaConfig);
      } catch (e) {
        let errorMessage = "An unknown error occurred while fetching timeline data.";
        if (e instanceof Error) {
          errorMessage = e.message;
        } else if (typeof e === 'string') {
          errorMessage = e;
        }
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderIcon = (iconName: string) => {
    const IconComponent = IconMap[iconName] || IconMap.Default;
    return <IconComponent className="text-slate-900" size={20} />;
  };

  const getBorderColorStyle = (colorClass: string): string => {
    if (colorClass && colorClass.startsWith('bg-')) {
      return colorClass.substring(3);
    }
    return colorClass || 'transparent';
  };

  if (loading) return <p className="text-center text-slate-600 py-10">Loading timeline...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Error: {error}</p>;
  if (timelineEvents.length === 0 && !loading && !error) return <p className="text-center text-slate-600 py-10">Timeline information coming soon.</p>;
  if (timelineEvents.length === 0) return null;

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12 md:mb-16">
          Our Journey Through Time
        </h2>
        <div className="relative">
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-300 transform -translate-x-1/2 h-full z-0"></div>
          {timelineEvents.map((event, index) => {
            const isLeftAlignedContent = index % 2 === 0;
            const borderColorValue = getBorderColorStyle(event.ColorClass);

            return (
              <div
                key={event.ID}
                className={`md:flex ${isLeftAlignedContent ? 'md:justify-start' : 'md:justify-end'} mb-10 md:mb-8 relative`}
              >
                <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className={`w-10 h-10 rounded-full ${event.ColorClass || 'bg-gray-400'} flex items-center justify-center shadow-md`}>
                    {renderIcon(event.IconName)}
                  </div>
                </div>
                <div className={`w-full md:w-[calc(50%-2.5rem)] ${isLeftAlignedContent ? 'md:mr-auto' : 'md:ml-auto'}`}>
                  <div className="flex items-center md:hidden mb-3">
                    <div className={`w-10 h-10 rounded-full ${event.ColorClass || 'bg-gray-400'} flex items-center justify-center shadow-md mr-4 flex-shrink-0`}>
                      {renderIcon(event.IconName)}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700">{event.Year} - {event.Title}</h3>
                  </div>
                  <div
                    className={`bg-slate-50 p-6 rounded-lg shadow-lg relative 
                                border-t-4 md:border-t-0 
                                ${isLeftAlignedContent ? 'md:text-right md:border-r-4' : 'md:text-left md:border-l-4'}`}
                    style={{ borderColor: borderColorValue }}
                  >
                    <div
                      className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 w-0 h-0 
                                  border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent
                                  ${isLeftAlignedContent ? 'left-full border-l-[10px]' : 'right-full border-r-[10px]' }`}
                      style={{ 
                        borderColor: isLeftAlignedContent 
                          ? `transparent transparent transparent ${borderColorValue}` 
                          : `transparent ${borderColorValue} transparent transparent`
                      }}
                    ></div>
                    <h3 className={`hidden md:block text-xl font-semibold text-slate-700 mb-1`}>
                      {event.Year} - {event.Title}
                    </h3>
                    <p className="text-md text-slate-600 leading-relaxed">
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
