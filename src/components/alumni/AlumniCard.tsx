import React from 'react';

interface AlumniCardProps {
  name: string;
  passoutYear: number | string;
  mobileNumber: string;
  imageUrl: string;
}

const AlumniCard: React.FC<AlumniCardProps> = ({ name, passoutYear, mobileNumber, imageUrl }) => {
  const placeholderImage = '/images/placeholder-avatar.png'; // fallback if imageUrl is missing

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="relative w-full h-48 sm:h-56 bg-gray-200">
        <img
          src={imageUrl || placeholderImage}
          alt={`Photo of ${name}`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-slate-800 mb-1">{name}</h3>
        <p className="text-sm text-slate-600">Batch of {passoutYear}</p>
        <p className="text-xs text-blue-600 mt-1">{mobileNumber}</p>
      </div>
    </div>
  );
};

export default AlumniCard;
