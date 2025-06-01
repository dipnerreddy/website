"use client";

import React, { useEffect, useState } from 'react';
import Papa, { ParseError, ParseResult } from 'papaparse';
import PastActivityCard from './PastActivityCard';

interface PastEvent {
  ID: string;
  Name: string;
  Date: string; // Format: YYYY-MM-DD or similar
  Description?: string;
  ImageUrl: string;
}

const PastActivitiesGrid = () => {
  const [pastEvents, setPastEvents] = useState<PastEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const csvUrl ="https://docs.google.com/spreadsheets/d/e/2PACX-1vRIZqNbh5KVhe7nA66WjxHQEh2LNqvmxz3wmw46rG7jA8yEhJoF2a4YepGhxG92OyAlCi683F4EfnrO/pub?gid=2089880172&single=true&output=csv";

      if (!csvUrl) {
        setError("Past activities data source URL is not configured.");
        setLoading(false);
        return;
      }

      try {
        Papa.parse<PastEvent>(csvUrl, {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: (results: ParseResult<PastEvent>) => {
            if (results.errors.length > 0) {
              console.error("CSV Parsing errors (Past Activities):", results.errors);
              const errorMessages = results.errors.map(err => err.message).join(', ');
              setError(`Error parsing past activities data. Details: ${errorMessages}. Please check CSV format/headers.`);
              setLoading(false);
              return;
            }

            const typedData = results.data.filter(item => item.ID && item.Name && item.Date);
            const sortedData = typedData.sort(
              (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
            );

            setPastEvents(sortedData);
            setLoading(false);
          },
          error: (err: Error, file: string) => {
            console.error("PapaParse Download/Parse Error (Past Activities):", err);
            setError(`Failed to download or parse past activities data. Error: ${err.message || 'Unknown error'}`);
            setLoading(false);
          }
        });
      } catch (e) {
        let errorMessage = "An unknown error occurred while fetching past activities data.";
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
      return <p className="text-center text-slate-600">Loading past activities...</p>;
    }
    if (error) {
      return <p className="text-center text-red-500">Error: {error}</p>;
    }
    if (pastEvents.length === 0) {
      return <p className="text-center text-slate-600">No past activities to display yet.</p>;
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {pastEvents.map((event) => (
          <PastActivityCard
            key={event.ID}
            imageUrl={event.ImageUrl}
            name={event.Name}
            date={new Date(event.Date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            description={event.Description}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-10 md:py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 md:mb-8 text-center md:text-left">
          Glimpses of Past Activities
        </h2>
        {renderContent()}
      </div>
    </section>
  );
};

export default PastActivitiesGrid;
