import { useEffect, useMemo, useState } from 'react';
import './App.css'
import { CategoryFilter } from './components/CategoryFilter';
import { Header } from './components/Header'
import { Lightbox } from './components/Lightbox';
import { PhotoGrid } from './components/PhotoGrid';
import { SearchBar } from './components/SearchBar';
import { ViewToggle } from './components/ViewToggle';
import { categories } from './data/photos';
import type { AnimeCharacter } from './types/Photo';

function App() {
  // const {
  //   searchTerm,
  //   setSearchTerm,
  //   selectedCategory,
  //   setSelectedCategory,
  //   viewMode,
  //   setViewMode,
  //   selectedPhoto,
  //   setSelectedPhoto,
  //   filteredPhotos,
  //   handleNextPhoto,
  //   handlePreviousPhoto,
  //   hasNext,
  //   hasPrevious
  // } = usePhotoGallery();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const [selectedPhoto, setSelectedPhoto] = useState<AnimeCharacter | null>(null);
  const [animeStars, setAnimeStars] = useState<AnimeCharacter[]>([]);
  const selectedPhotoIndex = useMemo(() => {
    if (!selectedPhoto) return -1;
    return animeStars.findIndex(photo => photo.id === selectedPhoto.id);
  }, [selectedPhoto, animeStars]);

  const fetchAnimeStar = async () => {
    try {
      const planets = await fetch('https://dragonball-api.com/api/planets?limit=20');
      const planetsData = await planets.json();
      console.log(planetsData);
      const res = await fetch('https://dragonball-api.com/api/characters?limit=58');
      const data = (await res.json()).items;
      console.log(data);
      setAnimeStars(data);
      // Optionally: console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextPhoto = () => {
    const nextIndex = selectedPhotoIndex + 1;
    if (nextIndex < animeStars.length) {
      setSelectedPhoto(animeStars[nextIndex]);
    }
  };

  const handlePreviousPhoto = () => {
    const prevIndex = selectedPhotoIndex - 1;
    if (prevIndex >= 0) {
      setSelectedPhoto(animeStars[prevIndex]);
    }
  };

  const hasNext = selectedPhotoIndex < animeStars.length - 1;
  const hasPrevious = selectedPhotoIndex > 0;


  // Fetch data with async/await in useEffect
  useEffect(() => {
    fetchAnimeStar();
  }, []);

  const filteredPhotos = useMemo(() => {
    return animeStars.filter(photo => {
      const matchesSearch =
        photo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (photo.tags && photo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      const matchesCategory =
        selectedCategory === 'All' ||
        (photo.race && photo.race === selectedCategory) ||
        (photo.affiliation && photo.affiliation === selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [animeStars, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="space-y-6 mb-8">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            <ViewToggle
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {animeStars.length} {animeStars.length === 1 ? 'photo' : 'photos'} found
          </p>
        </div>

        {/* Photo Grid */}
        {filteredPhotos.length > 0 ? (
          <PhotoGrid
            photos={filteredPhotos}
            onPhotoClick={setSelectedPhoto}
            viewMode={viewMode}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No photos found matching your criteria.</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or category filter.</p>
          </div>
        )}

        {/* Lightbox */}
        <Lightbox
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onNext={handleNextPhoto}
          onPrevious={handlePreviousPhoto}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
        />
      </main>
    </div>
  )
}

export default App
