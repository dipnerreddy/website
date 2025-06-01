"use client";

import React, { useEffect, useState } from 'react';
import Papa, { ParseResult } from 'papaparse';
import AlumniCard from './AlumniCard';

interface Alumnus {
  ID?: string;
  Name: string;
  PassoutYear: string;
  MobileNumber: string;
  ImageUrl: string;
}

const AlumniDisplay = () => {
  const [allAlumni, setAllAlumni] = useState<Alumnus[]>([]);
  const [filteredAlumni, setFilteredAlumni] = useState<Alumnus[]>([]);
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const csvUrl ="https://docs.google.com/spreadsheets/d/e/2PACX-1vTPF3cK2MkFUDBgTgfhGC4ISftxdIbRu0YWFm17lruJq62n_rIMSuc3TUwkzv0ZahNmIMvNXv36h0YD/pub?gid=0&single=true&output=csv";

      if (!csvUrl) {
        setError("Alumni data source URL is not configured.");
        setLoading(false);
        return;
      }

      try {
        Papa.parse<Alumnus>(csvUrl, {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: (results: ParseResult<Alumnus>) => {
            if (results.errors.length > 0) {
              console.error("CSV Parsing errors (Alumni):", results.errors);
              const errorMessages = results.errors.map(err => err.message).join(', ');
              setError(`Error parsing alumni data. Details: ${errorMessages}. Please check CSV format/headers.`);
              setLoading(false);
              return;
            }
            const typedData = results.data.filter(item => item.Name && item.PassoutYear);
            setAllAlumni(typedData);

            const years = [...new Set(typedData.map(a => a.PassoutYear.trim()).filter(Boolean))]
              .sort((a, b) => parseInt(b, 10) - parseInt(a, 10));
            setAvailableYears(years);
            if (years.length > 0 && !selectedYear) {
              setSelectedYear(years[0]);
            }
            setLoading(false);
          },
          error: (error: Error, file: File | string) => {
            console.error("PapaParse Download/Parse Error (Alumni):", error);
            setError(`Failed to download or parse alumni data. Error: ${error.message || 'Unknown PapaParse error'}`);
            setLoading(false);
          }
        });
      } catch (e) {
        let errorMessage = "An unknown error occurred while fetching alumni data.";
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

  useEffect(() => {
    if (selectedYear && allAlumni.length > 0) {
      const filtered = allAlumni
        .filter(alumnus => alumnus.PassoutYear === selectedYear)
        .sort((a, b) => a.Name.localeCompare(b.Name));
      setFilteredAlumni(filtered);
    } else if (!selectedYear && allAlumni.length > 0) {
      setFilteredAlumni([]);
    } else {
      setFilteredAlumni([]);
    }
  }, [selectedYear, allAlumni]);

  const renderContent = () => {
    if (loading) {
      return <p className="text-center text-slate-600">Loading alumni data...</p>;
    }
    if (error) {
      return <p className="text-center text-red-500">Error: {error}</p>;
    }
    if (filteredAlumni.length > 0) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAlumni.map((alumnus, index) => (
            <AlumniCard
              key={alumnus.ID || `${selectedYear}-${index}`}
              name={alumnus.Name}
              passoutYear={alumnus.PassoutYear}
              mobileNumber={alumnus.MobileNumber}
              imageUrl={alumnus.ImageUrl}
            />
          ))}
        </div>
      );
    }
    if (selectedYear) {
      return <p className="text-center text-slate-600">No alumni found for the year {selectedYear}.</p>;
    }
    if (allAlumni.length > 0 && !selectedYear) {
      return <p className="text-center text-slate-600">Please select a year to view alumni.</p>;
    }
    return <p className="text-center text-slate-600">No alumni data available at the moment.</p>;
  };

  return (
    <section className="py-10 md:py-16 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-8 md:mb-10">
          Our Esteemed Alumni
        </h2>

        {!loading && !error && availableYears.length > 0 && (
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <label htmlFor="year-select" className="font-medium text-slate-700 mb-2 sm:mb-0">
              Select Passout Year:
            </label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-slate-900 bg-white"
            >
              <option value="">-- All Years --</option>
              {availableYears.map(year => (
                <option key={year} value={year} className="text-slate-800">
                  {year}
                </option>
              ))}
            </select>
          </div>
        )}
        {renderContent()}
      </div>
    </section>
  );
};

export default AlumniDisplay;
