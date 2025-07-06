import './App.css'
import { Header } from './components/Header'
import { usePhotoGallery } from './hooks/usePhotoGalllery'

function App() {
  const {
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
  } = usePhotoGallery();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="space-y-6 mb-8">
          {/* <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          /> */}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            <ViewToggle
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            /> */}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'} found
          </p>
        </div>

        {/* Photo Grid */}
        {/* {filteredPhotos.length > 0 ? (
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
        )} */}

        {/* Lightbox */}
        {/* <Lightbox
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onNext={handleNextPhoto}
          onPrevious={handlePreviousPhoto}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
        /> */}
      </main>
    </div>
  )
}

export default App
