import { useState, useMemo } from 'react';
import { type Photo } from '../types/Photo';
import { photos } from '../data/photos';

export const usePhotoGallery = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

    const filteredPhotos = useMemo(() => {
        return photos.filter(photo => {
            const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                photo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                photo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesCategory = selectedCategory === 'All' || photo.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    const selectedPhotoIndex = useMemo(() => {
        if (!selectedPhoto) return -1;
        return filteredPhotos.findIndex(photo => photo.id === selectedPhoto.id);
    }, [selectedPhoto, filteredPhotos]);

    const handleNextPhoto = () => {
        const nextIndex = selectedPhotoIndex + 1;
        if (nextIndex < filteredPhotos.length) {
            setSelectedPhoto(filteredPhotos[nextIndex]);
        }
    };

    const handlePreviousPhoto = () => {
        const prevIndex = selectedPhotoIndex - 1;
        if (prevIndex >= 0) {
            setSelectedPhoto(filteredPhotos[prevIndex]);
        }
    };

    const hasNext = selectedPhotoIndex < filteredPhotos.length - 1;
    const hasPrevious = selectedPhotoIndex > 0;

    return {
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        viewMode,
        setViewMode,
        selectedPhoto,
        setSelectedPhoto,
        filteredPhotos,
        handleNextPhoto,
        handlePreviousPhoto,
        hasNext,
        hasPrevious
    };
};