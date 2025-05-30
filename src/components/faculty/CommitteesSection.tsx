"use client";

import React, { useEffect, useState } from 'react';
import Papa, { ParseResult } from 'papaparse';

interface Committee {
  ID: string;
  Name: string;
  Purpose: string;
  Members?: string; // Comma-separated string from CSV
}

const CommitteesSection = () => {
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const csvUrl ="https://docs.google.com/spreadsheets/d/e/2PACX-1vSsQY3f2DMZhFvC7jPPW6mpIYiJuQMM7fYgGtmnROi0gFGbIykpWrcf6EeIaic-LFmzV8r-9AStL9sW/pub?gid=0&single=true&output=csv";

      if (!csvUrl) {
        setError("Committees data source URL is not configured.");
        setLoading(false);
        return;
      }

      try {
        Papa.parse<Committee>(csvUrl, {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: (results: ParseResult<Committee>) => {
            if (results.errors.length > 0) {
              console.error("CSV Parsing errors (Committees):", results.errors);
              const errorMessages = results.errors.map(err => err.message).join(', ');
              setError(`Error parsing committees data. Details: ${errorMessages}. Please check CSV format/headers.`);
              setLoading(false);
              return;
            }
            const typedData = results.data.filter(item => item.ID && item.Name && item.Purpose); // Basic validation
            setCommittees(typedData);
            setLoading(false);
          },
          error: (err: Error) => {
            console.error("PapaParse Download/Parse Error (Committees):", err);
            setError(`Failed to download or parse committee data. Error: ${err.message || 'Unknown PapaParse error'}`);
            setLoading(false);
          }
        });
      } catch (e) {
        let errorMessage = "An unknown error occurred while fetching committees data.";
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
      return <p className="text-center text-slate-600">Loading committee information...</p>;
    }
    if (error) {
      return <p className="text-center text-red-500">Error: {error}</p>;
    }
    if (committees.length === 0) {
      return <p className="text-center text-slate-600">Committee information coming soon.</p>;
    }
    return (
      <div className="space-y-8 max-w-3xl mx-auto">
        {committees.map((committee) => (
          <div key={committee.ID} className="bg-slate-50 p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">{committee.Name}</h3>
            <p className="text-slate-600 leading-relaxed mb-3">{committee.Purpose}</p>
            {committee.Members && committee.Members.trim() !== "" && (
              <div>
                <p className="text-sm font-medium text-slate-700">Key Members:</p>
                <ul className="list-disc list-inside text-sm text-slate-500">
                  {committee.Members.split(',').map((member, i) => (
                    <li key={`${committee.ID}-member-${i}`}>{member.trim()}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-10 md:mb-12">
          Our School Committees
        </h2>
        {renderContent()}
      </div>
    </section>
  );
};

export default CommitteesSection;
