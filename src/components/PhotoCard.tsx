import React from 'react';
import { type Photo } from '../types/Photo';

interface PhotoCardProps {
    photo: Photo;
    onClick: () => void;
    className?: string;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onClick, className = '' }) => {
    return (
        <div
            className={`group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${className}`}
            onClick={onClick}
        >
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold text-lg mb-1">{photo.title}</h3>
                    <p className="text-sm opacity-90">{photo.description}</p>
                    <p className="text-xs opacity-75 mt-1">by {photo.photographer}</p>
                </div>
            </div>

            {/* Category badge */}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {photo.category}
            </div>
        </div>
    );
};