// src/components/faculty/FacultyGrid.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Papa, { PapaParseError, PapaParseResult } from 'papaparse';
import FacultyCard from './FacultyCard'; // Assuming FacultyCard.tsx exists and is correct

interface FacultyMember {
  ID: string;
  Name: string;
  Qualification: string;
  Department?: string;
  ImageUrl: string;
}

const FacultyGrid = () => {
  const [facultyMembers, setFacultyMembers] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const csvUrl = process.env.NEXT_PUBLIC_FACULTY_DATA_CSV_URL;

      if (!csvUrl) {
        setError("Faculty data source URL is not configured.");
        setLoading(false);
        return;
      }

      try {
        Papa.parse(csvUrl, {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: (results: PapaParseResult<FacultyMember>) => {
            if (results.errors.length > 0) {
              console.error("CSV Parsing errors (Faculty):", results.errors);
              const errorMessages = results.errors.map(err => err.message).join(', ');
              setError(`Error parsing faculty data. Details: ${errorMessages}. Please check CSV format/headers.`);
              setLoading(false);
              return;
            }
            const typedData = results.data
             .filter(item => item.ID && item.Name && item.Qualification); // Basic validation
            const sortedData = typedData.sort((a, b) => a.Name.localeCompare(b.Name));
            setFacultyMembers(sortedData);
            setLoading(false);
          },
          error: (err: PapaParseError) => {
            console.error("PapaParse Download/Parse Error (Faculty):", err);
            setError(`Failed to download or parse faculty data. Error: ${err.message || 'Unknown PapaParse error'}`);
            setLoading(false);
          }
        });
      } catch (e) {
        let errorMessage = "An unknown error occurred while fetching faculty data.";
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
        return <p className="text-center text-slate-600">Loading faculty information...</p>;
    }
    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }
    if (facultyMembers.length === 0) {
        return <p className="text-center text-slate-600">Faculty information coming soon.</p>;
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {facultyMembers.map((faculty) => (
          <FacultyCard
            key={faculty.ID}
            imageUrl={faculty.ImageUrl}
            name={faculty.Name}
            qualification={faculty.Qualification}
            department={faculty.Department}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-12 md:py-16 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-10 md:mb-12">
          Meet Our Esteemed Faculty
        </h2>
        {renderContent()}
      </div>
    </section>
  );
};

export default FacultyGrid;