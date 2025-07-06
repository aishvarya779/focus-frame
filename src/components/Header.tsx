import React from 'react';
import { Camera } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-500 p-2 rounded-lg">
                            <Camera className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">PhotoGallery</h1>
                            <p className="text-sm text-gray-600">Professional Photography Collection</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};