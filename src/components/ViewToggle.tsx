import React from 'react';
import { Grid, LayoutGrid } from 'lucide-react';

interface ViewToggleProps {
    viewMode: 'grid' | 'masonry';
    onViewModeChange: (mode: 'grid' | 'masonry') => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onViewModeChange }) => {
    return (
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button
                onClick={() => onViewModeChange('grid')}
                className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'grid'
                    ? 'bg-white text-blue-500 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
            >
                <Grid size={20} />
            </button>
            <button
                onClick={() => onViewModeChange('masonry')}
                className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'masonry'
                    ? 'bg-white text-blue-500 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
            >
                <LayoutGrid size={20} />
            </button>
        </div>
    );
};