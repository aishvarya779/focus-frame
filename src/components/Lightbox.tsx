import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Heart } from 'lucide-react';
import { type Photo } from '../types/Photo';

interface LightboxProps {
    photo: Photo | null;
    onClose: () => void;
    onNext: () => void;
    onPrevious: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
}

export const Lightbox: React.FC<LightboxProps> = ({
    photo,
    onClose,
    onNext,
    onPrevious,
    hasNext,
    hasPrevious
}) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight' && hasNext) onNext();
            if (e.key === 'ArrowLeft' && hasPrevious) onPrevious();
        };

        if (photo) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [photo, onClose, onNext, onPrevious, hasNext, hasPrevious]);

    if (!photo) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
            >
                <X size={24} />
            </button>

            {/* Navigation buttons */}
            {hasPrevious && (
                <button
                    onClick={onPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>
            )}

            {hasNext && (
                <button
                    onClick={onNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
                >
                    <ChevronRight size={24} />
                </button>
            )}

            {/* Main image */}
            <div className="relative max-w-7xl max-h-[90vh] mx-4">
                <img
                    src={photo.url}
                    alt={photo.title}
                    className="max-w-full max-h-full object-contain"
                />
            </div>

            {/* Photo info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="text-white">
                            <h2 className="text-2xl font-bold mb-1">{photo.title}</h2>
                            <p className="text-gray-300 mb-2">{photo.description}</p>
                            <p className="text-sm text-gray-400">
                                by {photo.photographer} • {photo.category}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {photo.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-white"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors">
                                <Heart size={20} />
                            </button>
                            <button className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors">
                                <Download size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};