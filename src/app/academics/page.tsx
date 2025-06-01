// src/app/academics/page.tsx
// NO "use client" here, this is a Server Component by default.

import AcademicsTabs from '@/components/academics/AcademicsTabs';
import React from 'react';
// Import the new Client Component


// Metadata can be exported from Server Components
export const metadata = {
  title: 'Academics & Performance | Radiant High School',
  description: 'Explore academic programs, performance analytics, and educational insights at Radiant High School.',
};

// Your Looker Studio Embed URL
const lookerStudioEmbedUrl = "https://lookerstudio.google.com/embed/reporting/e1007ad4-3f61-4205-8d7b-861aa8de942c/page/Z5EMF";

const AcademicsPage = () => {
  return (
    <div className="bg-gray-50 min-h-[calc(100vh-var(--header-height,150px)-var(--footer-height,300px))] py-10 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Render the new AcademicsTabs (Client Component) */}
        <AcademicsTabs />
        
        {/* <header className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800">
            Academic Excellence at Radiant High School
          </h1>
          <p className="mt-3 text-lg text-slate-600 max-w-3xl mx-auto">
            Dive into our academic performance data, curriculum highlights, and the
            educational philosophy that drives student success at Radiant High School.
          </p>
        </header> */}

        {/* Embed Looker Studio Dashboard */}
        <section className="mb-12" id="performance-dashboard">
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-6 text-center">
            Performance Dashboard
          </h1>
          <div className="bg-white p-1 sm:p-2 rounded-lg shadow-xl border overflow-hidden">
            {lookerStudioEmbedUrl ? (
              <iframe
                width="100%"
                height="750"
                src={lookerStudioEmbedUrl}
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                title="Academic Performance Dashboard - Radiant High School"
              ></iframe>
            ) : (
              <p className="text-center text-gray-500 py-10">Performance dashboard is currently unavailable.</p>
            )}
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            Dashboard may take a moment to load. Refresh if you encounter issues.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AcademicsPage;