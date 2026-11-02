import React from 'react';
import Hero from '../components/Hero';
import SearchFilterBar from '../components/SearchFilterBar';
import RoomCard from '../components/RoomCard';
import { ROOMS_DATA } from '../data/rooms';

export default function HomePage({
  searchDestination,
  setSearchDestination,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  guests,
  setGuests,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  priceRange,
  setPriceRange,
  selectedAmenities,
  setSelectedAmenities,
  sortBy,
  setSortBy,
  currency,
  filteredRooms,
  nights,
  wishlist,
  toggleWishlist,
  onSelectRoom,
  onBookNow,
  resetFilters
}) {
  const handleExploreClick = () => {
    const searchSection = document.getElementById('search-section');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page-root animate-fade-in">
      {/* Hero Section */}
      <Hero onExploreClick={handleExploreClick} />

      {/* Floating Interactive Search & Filter Bar */}
      <SearchFilterBar
        searchDestination={searchDestination}
        setSearchDestination={setSearchDestination}
        checkInDate={checkInDate}
        setCheckInDate={setCheckInDate}
        checkOutDate={checkOutDate}
        setCheckOutDate={setCheckOutDate}
        guests={guests}
        setGuests={setGuests}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        selectedAmenities={selectedAmenities}
        setSelectedAmenities={setSelectedAmenities}
        sortBy={sortBy}
        setSortBy={setSortBy}
        currency={currency}
        totalResults={filteredRooms.length}
        resetFilters={resetFilters}
      />

      {/* Main Suite Catalog Section */}
      <main className="container catalog-section" id="rooms-catalog">
        <div className="catalog-header-row">
          <div>
            <span className="badge badge-gold">TR GROUPS Signature Collection</span>
            <h2 className="catalog-title">
              {searchDestination === 'All Destinations'
                ? 'Curated Global Sanctuaries'
                : `Residences in ${searchDestination}`}
            </h2>
            <p className="catalog-subtitle">
              Displaying {filteredRooms.length} of {ROOMS_DATA.length} luxury residences available for{' '}
              {nights} {nights === 1 ? 'night' : 'nights'}
            </p>
          </div>

          <div className="catalog-quick-info">
            <span className="info-pill">
              Check-in: <strong>{checkInDate}</strong>
            </span>
            <span className="info-pill">
              Check-out: <strong>{checkOutDate}</strong>
            </span>
          </div>
        </div>

        {/* Suites Grid */}
        {filteredRooms.length === 0 ? (
          <div className="empty-catalog-state glass-panel animate-fade-in">
            <div className="empty-icon-wrap">
              <span style={{ fontSize: '2rem' }}>🔍</span>
            </div>
            <h3>No Suites Match Your Exact Criteria</h3>
            <p>Try widening your price range, selecting fewer amenity constraints, or changing dates.</p>
            <button className="btn-gold" onClick={resetFilters}>
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="rooms-grid">
            {filteredRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                currency={currency}
                nights={nights}
                isWishlisted={wishlist.some((item) => item.id === room.id)}
                onToggleWishlist={toggleWishlist}
                onSelectRoom={onSelectRoom}
                onBookNow={onBookNow}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
