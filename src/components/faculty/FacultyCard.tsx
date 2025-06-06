// src/components/faculty/FacultyCard.tsx
import React from 'react';

interface FacultyCardProps {
  imageUrl: string;
  name: string;
  qualification: string;
  department?: string;
}

const FacultyCard: React.FC<FacultyCardProps> = ({ imageUrl, name, qualification, department }) => {
  const placeholderImage = '/images/placeholder-avatar.png';

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col h-full">
      <div className="relative w-full h-56 sm:h-64 bg-gray-200">
        <img
          src={imageUrl || placeholderImage}
          alt={`Photo of ${name}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-5 text-center flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-slate-800 mb-1">{name}</h3>
        <p className="text-sm text-blue-600 font-medium mb-2 flex-grow">{qualification}</p>
        {department && (
          <p className="text-xs text-slate-500 mt-auto">{department}</p>
        )}
      </div>
    </div>
  );
};

export default FacultyCard;
