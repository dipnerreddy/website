import React from 'react';

interface NewsArticleForCard {
  ID: string;
  Headline: string;
  Caption: string;
  ImageUrl: string;
  DatePublished: string;
  Category?: string;
  FullContent?: string;
}

interface NewsCardProps {
  article: NewsArticleForCard;
  onCardClick: (article: NewsArticleForCard) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({
  article,
  onCardClick,
}) => {
  const { Headline, Caption, ImageUrl, DatePublished, Category } = article;

  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:shadow-xl group border border-gray-200 flex flex-col h-full cursor-pointer"
      onClick={() => onCardClick(article)}
    >
      <div className="relative w-full h-48 bg-gray-200 group-hover:opacity-90 transition-opacity">
        {ImageUrl ? (
          <img
            src={ImageUrl}
            alt={Headline}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>
      <div className="p-4 md:p-5 flex flex-col flex-grow">
        {Category && (
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full mb-2 self-start">
            {Category}
          </span>
        )}
        <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
          {Headline}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-3 flex-grow">
          {Caption}
        </p>
        <p className="text-xs text-slate-400 mt-auto">
          Published: {new Date(DatePublished).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
};

export default NewsCard;