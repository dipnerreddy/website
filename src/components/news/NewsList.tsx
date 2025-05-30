// src/components/news/NewsList.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import NewsCard from './NewsCard';
import Modal from '../common/Modal'; // Adjust path if needed
import Image from 'next/image'; // For displaying image in modal if needed

// This interface should include all fields needed for both card and modal
interface NewsArticle {
  ID: string;
  Headline: string;
  Caption: string;
  ImageUrl: string;
  DatePublished: string;
  FullContent?: string; // Make sure this is fetched and available
  Category?: string;
}

const NewsList = () => {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const csvUrl ="https://docs.google.com/spreadsheets/d/e/2PACX-1vR_C_vzVTpL0_QYFk4WCAJrTSVFdq7_yrxhJDAhDQAqbdJQRfIF4YPND_HyQT2FHOY9jkiL9cZuYtsB/pub?gid=0&single=true&output=csv";

      if (!csvUrl) {
        setError("News data source URL is not configured.");
        setLoading(false);
        return;
      }

      try {
        Papa.parse(csvUrl, {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.errors.length > 0) {
              console.error("CSV Parsing errors:", results.errors);
              setError("Error parsing news data. Check CSV format.");
              setLoading(false);
              return;
            }
            // Ensure your CSV has 'FullContent' or adapt accordingly
            const typedData = results.data as NewsArticle[];
            const sortedData = typedData.sort(
              (a, b) => new Date(b.DatePublished).getTime() - new Date(a.DatePublished).getTime()
            );
            setNewsArticles(sortedData);
            setLoading(false);
          },
          error: (err: any) => {
            console.error("PapaParse download error:", err);
            setError("Failed to download or parse news data.");
            setLoading(false);
          }
        });
      } catch (e: any) {
        setError(e.message || "An unknown error occurred while fetching data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null); // Clear selected article
  };

  if (loading) {
    return <p className="text-center text-black text-lg py-10">Loading news...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">Error: {error}</p>;
  }

  const displayContentInModal = selectedArticle?.FullContent || selectedArticle?.Caption || "";

  return (
    <>
      <section className="py-10 md:py-16 bg-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-8 md:mb-12">
            Latest News & Updates
          </h2>

          {newsArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {newsArticles.map((article) => (
                <NewsCard
                  key={article.ID}
                  article={article} // Pass the whole article object
                  onCardClick={handleCardClick}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-600">No news articles found at the moment.</p>
          )}
        </div>
      </section>

      {/* Modal for displaying selected article */}
      {selectedArticle && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={selectedArticle.Headline}>
          <article className="prose prose-lg max-w-none"> {/* Tailwind Typography for styling */}
            {selectedArticle.ImageUrl && (
              <div className="relative w-full h-64 sm:h-80 md:h-96 mb-6 rounded-md overflow-hidden">
                <Image
                  src={selectedArticle.ImageUrl}
                  alt={selectedArticle.Headline}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
             {selectedArticle.Category && (
                <p className="text-sm text-indigo-600 font-semibold mb-2">{selectedArticle.Category}</p>
            )}
            <p className="text-sm text-slate-500 mb-4">
                Published on: {new Date(selectedArticle.DatePublished).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            {/* Render content, splitting by newlines if it's plain text with line breaks */}
            {displayContentInModal.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            {/* If FullContent can contain HTML, and you trust the source:
            <div dangerouslySetInnerHTML={{ __html: displayContentInModal }} />
            Be very careful with dangerouslySetInnerHTML.
            */}
          </article>
        </Modal>
      )}
    </>
  );
};

export default NewsList;