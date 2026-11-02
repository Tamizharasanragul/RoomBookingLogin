import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Users,
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { CATEGORIES, DESTINATIONS, AMENITY_DEFINITIONS } from '../data/rooms';
import { calculateNights } from '../utils/dates';
import { formatPrice } from '../utils/currency';

export default function SearchFilterBar({
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
  totalResults,
  resetFilters
}) {
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);

  const nights = calculateNights(checkInDate, checkOutDate);

  const toggleAmenity = (key) => {
    if (selectedAmenities.includes(key)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== key));
    } else {
      setSelectedAmenities([...selectedAmenities, key]);
    }
  };

  const hasActiveFilters =
    searchDestination !== 'All Destinations' ||
    selectedCategory !== 'All Rooms' ||
    searchQuery.trim() !== '' ||
    priceRange < 1500 ||
    selectedAmenities.length > 0 ||
    sortBy !== 'recommended';

  return (
    <div id="search-section" className="search-section-root">
      <div className="container">
        {/* Floating Search Bar */}
        <div className="main-search-bar glass-panel">
          <div className="search-field destination-field">
            <div className="search-field-icon">
              <MapPin size={18} className="gold-icon" />
            </div>
            <div className="search-field-content">
              <label htmlFor="destination-select">Destination</label>
              <select
                id="destination-select"
                value={searchDestination}
                onChange={(e) => setSearchDestination(e.target.value)}
                className="search-select"
              >
                {DESTINATIONS.map((dest) => (
                  <option key={dest} value={dest}>
                    {dest}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="search-divider"></div>

          <div className="search-field date-field">
            <div className="search-field-icon">
              <Calendar size={18} className="gold-icon" />
            </div>
            <div className="search-field-content">
              <label htmlFor="checkin-input">Check-in</label>
              <input
                id="checkin-input"
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="search-input-date"
              />
            </div>
          </div>

          <div className="search-divider"></div>

          <div className="search-field date-field">
            <div className="search-field-icon">
              <Calendar size={18} className="gold-icon" />
            </div>
            <div className="search-field-content">
              <label htmlFor="checkout-input">
                Check-out <span className="nights-badge">{nights} {nights === 1 ? 'night' : 'nights'}</span>
              </label>
              <input
                id="checkout-input"
                type="date"
                value={checkOutDate}
                min={checkInDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="search-input-date"
              />
            </div>
          </div>

          <div className="search-divider"></div>

          {/* Guests Popover Field */}
          <div className="search-field guests-field" style={{ position: 'relative' }}>
            <div className="search-field-icon">
              <Users size={18} className="gold-icon" />
            </div>
            <div
              className="search-field-content clickable"
              onClick={() => setShowGuestDropdown(!showGuestDropdown)}
            >
              <label>Guests</label>
              <div className="guest-summary-text">
                {guests.adults} {guests.adults === 1 ? 'Adult' : 'Adults'}
                {guests.children > 0 && `, ${guests.children} Children`}
              </div>
            </div>

            {showGuestDropdown && (
              <div className="guests-dropdown-card glass-panel">
                <div className="guest-counter-row">
                  <div>
                    <div className="guest-type-label">Adults</div>
                    <span className="guest-type-sub">Ages 13 or above</span>
                  </div>
                  <div className="stepper-controls">
                    <button
                      className="stepper-btn"
                      disabled={guests.adults <= 1}
                      onClick={() => setGuests({ ...guests, adults: guests.adults - 1 })}
                    >
                      -
                    </button>
                    <span className="stepper-val">{guests.adults}</span>
                    <button
                      className="stepper-btn"
                      disabled={guests.adults >= 6}
                      onClick={() => setGuests({ ...guests, adults: guests.adults + 1 })}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="guest-counter-row">
                  <div>
                    <div className="guest-type-label">Children</div>
                    <span className="guest-type-sub">Ages 0 to 12</span>
                  </div>
                  <div className="stepper-controls">
                    <button
                      className="stepper-btn"
                      disabled={guests.children <= 0}
                      onClick={() => setGuests({ ...guests, children: guests.children - 1 })}
                    >
                      -
                    </button>
                    <span className="stepper-val">{guests.children}</span>
                    <button
                      className="stepper-btn"
                      disabled={guests.children >= 4}
                      onClick={() => setGuests({ ...guests, children: guests.children + 1 })}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="btn-gold close-stepper-btn"
                  onClick={() => setShowGuestDropdown(false)}
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Quick Search & Filter Trigger */}
          <div className="search-action-group">
            <button
              className={`filter-toggle-btn ${showFilterDrawer ? 'active' : ''}`}
              onClick={() => setShowFilterDrawer(!showFilterDrawer)}
              title="More Filters"
            >
              <SlidersHorizontal size={17} />
              <span>Filters</span>
              {(selectedAmenities.length > 0 || priceRange < 1500) && (
                <span className="active-dot"></span>
              )}
            </button>
          </div>
        </div>

        {/* Category Pills & Quick Search Row */}
        <div className="category-and-search-row">
          <div className="category-scroll-container">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'All Rooms' && <Sparkles size={14} />}
                <span>{category}</span>
              </button>
            ))}
          </div>

          <div className="keyword-search-box">
            <Search size={16} className="search-icon-muted" />
            <input
              type="text"
              placeholder="Search penthouse, pool, view..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="keyword-input"
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Expanded Filters Drawer */}
        {showFilterDrawer && (
          <div className="filters-drawer glass-panel animate-fade-in">
            <div className="drawer-header">
              <div className="drawer-title-group">
                <SlidersHorizontal size={18} className="gold-icon" />
                <h3>Refine Suite Selection</h3>
              </div>
              <button
                className="drawer-close-btn"
                onClick={() => setShowFilterDrawer(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="drawer-grid">
              {/* Max Price Slider */}
              <div className="filter-group">
                <div className="filter-label-row">
                  <span className="filter-group-title">Max Nightly Rate</span>
                  <span className="gold-gradient-text filter-val-display">
                    {formatPrice(priceRange, currency)} / night
                  </span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="1500"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="luxury-slider"
                />
                <div className="slider-labels">
                  <span>{formatPrice(400, currency)}</span>
                  <span>{formatPrice(1500, currency)}</span>
                </div>
              </div>

              {/* Sorting */}
              <div className="filter-group">
                <span className="filter-group-title">Sort Suites By</span>
                <div className="sort-dropdown-wrapper">
                  <ArrowUpDown size={15} className="sort-icon" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="luxury-select"
                  >
                    <option value="recommended">Curator's Recommendation</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Guest Rating</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Amenity Badges Selection */}
            <div className="filter-amenities-section">
              <span className="filter-group-title">Desired Amenities & Features</span>
              <div className="amenity-checkbox-grid">
                {AMENITY_DEFINITIONS.map((amenity) => {
                  const isChecked = selectedAmenities.includes(amenity.key);
                  return (
                    <button
                      key={amenity.key}
                      className={`amenity-chip ${isChecked ? 'selected' : ''}`}
                      onClick={() => toggleAmenity(amenity.key)}
                    >
                      <span className="amenity-chip-check">{isChecked ? '✓' : '+'}</span>
                      <span>{amenity.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drawer Actions */}
            <div className="drawer-actions-bar">
              {hasActiveFilters && (
                <button className="btn-ghost reset-btn" onClick={resetFilters}>
                  <RotateCcw size={15} />
                  <span>Reset All Filters</span>
                </button>
              )}
              <button
                className="btn-gold"
                style={{ marginLeft: 'auto' }}
                onClick={() => setShowFilterDrawer(false)}
              >
                Show {totalResults} {totalResults === 1 ? 'Suite' : 'Suites'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
