import React from 'react';
import { PhotoCard } from './PhotoCard';
import { type AnimeCharacter } from '../types/Photo';

interface PhotoGridProps {
    photos: AnimeCharacter[];
    onPhotoClick: (photo: AnimeCharacter) => void;
    viewMode: 'grid' | 'masonry';
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, onPhotoClick, viewMode }) => {
    if (viewMode === 'masonry') {
        return (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                {photos.map((photo) => (
                    <PhotoCard
                        key={photo.id}
                        photo={photo}
                        onClick={() => onPhotoClick(photo)}
                        className="break-inside-avoid mb-4"
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {photos.map((photo) => (
                <PhotoCard
                    key={photo.id}
                    photo={photo}
                    onClick={() => onPhotoClick(photo)}
                />
            ))}
        </div>
    );
};