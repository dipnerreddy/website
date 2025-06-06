// src/components/activities/PastActivityCard.tsx
import React from 'react';

interface PastActivityCardProps {
  imageUrl: string;
  name: string;
  date?: string;
  description?: string;
}

const PastActivityCard: React.FC<PastActivityCardProps> = ({ imageUrl, name, date, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group">
      <div className="relative w-full h-48 sm:h-56">
        <img
          src={imageUrl || '/images/placeholder.png'}
          alt={`Image of ${name}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-slate-800 mb-1 truncate" title={name}>{name}</h3>
        {date && <p className="text-xs text-slate-500 mb-2">{date}</p>}
        {description && <p className="text-sm text-slate-600 leading-snug line-clamp-2">{description}</p>}
      </div>
    </div>
  );
};

export default PastActivityCard;
