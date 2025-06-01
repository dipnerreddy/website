"use client";

import React, { useEffect, useState } from 'react';
import Papa, { ParseError, ParseResult } from 'papaparse';

interface UpcomingEvent {
  ID: string;
  Name: string;
  Date: string;
  Time?: string;
  Venue?: string;
  Description: string;
}

const UpcomingActivities = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const csvUrl ="https://docs.google.com/spreadsheets/d/e/2PACX-1vTrkRp5vkmX0aKlGVxst66Mnq-XuqeXbHdhbFauTgJEZuWVjjX9Q0YejBpDruiQpdTskwf4qwmhLsEa/pub?gid=0&single=true&output=csv";

      if (!csvUrl) {
        setError("Upcoming activities data source URL is not configured.");
        setLoading(false);
        return;
      }

      try {
        Papa.parse<UpcomingEvent>(csvUrl as string, {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: (results: ParseResult<UpcomingEvent>) => {
            if (results.errors.length > 0) {
              console.error("CSV Parsing errors (Upcoming Activities):", results.errors);
              const errorMessages = results.errors.map(err => err.message).join(', ');
              setError(`Error parsing upcoming activities data. Details: ${errorMessages}. Please check CSV format/headers.`);
              setLoading(false);
              return;
            }

            const typedData = results.data.filter(item => item.ID && item.Name && item.Date && item.Description);
            const sortedData = typedData.sort(
              (a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime()
            );

            setUpcomingEvents(sortedData);
            setLoading(false);
          },
          error: (err: Error) => {
            console.error("PapaParse Download/Parse Error (Upcoming Activities):", err);
            setError(`Failed to download or parse upcoming activities data. Error: ${err.message || 'Unknown PapaParse error'}`);
            setLoading(false);
          }
        });
      } catch (e) {
        let errorMessage = "An unknown error occurred while fetching upcoming activities data.";
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

  const renderContent = () => {
    if (loading) {
      return <p className="text-center text-slate-600">Loading upcoming activities...</p>;
    }
    if (error) {
      return <p className="text-center text-red-500">Error: {error}</p>;
    }
    if (upcomingEvents.length === 0) {
      return <p className="text-center text-slate-600">No upcoming activities scheduled. Please check back soon!</p>;
    }

    return (
      <div className="flex overflow-x-auto space-x-4 md:space-x-6 pb-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-200">
        {upcomingEvents.map((event) => (
          <div
            key={event.ID}
            className="flex-shrink-0 w-72 sm:w-80 bg-white p-5 rounded-lg shadow-md border-l-4 border-blue-600"
          >
            <h3 className="text-lg font-semibold text-slate-700 mb-1">{event.Name}</h3>
            <p className="text-sm text-blue-700 font-medium mb-2">
              {new Date(event.Date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            {event.Time && (
              <p className="text-xs text-slate-500">
                <strong>Time:</strong> {event.Time}
              </p>
            )}
            {event.Venue && (
              <p className="text-xs text-slate-500 mb-2">
                <strong>Venue:</strong> {event.Venue}
              </p>
            )}
            <p className="text-sm text-slate-600 leading-relaxed">{event.Description}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="py-10 md:py-12 bg-blue-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 md:mb-8 text-center md:text-left">
          Upcoming Activities
        </h2>
        {renderContent()}
      </div>
    </section>
  );
};

export default UpcomingActivities;
