import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Compass, ArrowRight, Star, Thermometer, Sparkles } from 'lucide-react';
import { formatPrice } from '../utils/currency';

export const DESTINATIONS_LIST = [
  {
    id: 'tokyo',
    name: 'Tokyo, Japan',
    title: 'The Obsidian Tower',
    tagline: 'Futuristic Elegance & Sky-High Serenity',
    image: '/images/presidential_suite.jpg',
    weather: '19°C • Clear Skies',
    rating: 4.98,
    suitesCount: 12,
    startingPrice: 850,
    description:
      'Perched in the prestigious heart of Tokyo, offering panoramic views of Mount Fuji and the neon metropolis. Indulge in private cedar saunas, Japanese omakase dining, and high-speed penthouse elevators.',
    features: ['360° Skyline Observatories', 'Private Finnish Saunas', '24/7 Butler Service', 'Sub-Zero Cocktail Cellar']
  },
  {
    id: 'maldives',
    name: 'Maldives',
    title: 'Grand Azure Resort',
    tagline: 'Overwater Luxury & Azure Lagoons',
    image: '/images/ocean_villa.jpg',
    weather: '29°C • Tropical Sun',
    rating: 4.99,
    suitesCount: 18,
    startingPrice: 1200,
    description:
      'Floating effortlessly over crystal clear coral reefs. Featuring private infinity plunge pools, glass-floor observation lounges, floating champagne breakfasts, and direct ocean catamaran access.',
    features: ['Private Plunge Pools', 'Lagoon Marine Sanctuary', 'Sunset Yacht Charter', 'Floating Breakfast']
  },
  {
    id: 'amalfi',
    name: 'Amalfi Coast, Italy',
    title: 'Riviera Haven',
    tagline: 'Limestone Romance & Mediterranean Vistas',
    image: '/images/royal_cliff.jpg',
    weather: '24°C • Coastal Breeze',
    rating: 4.96,
    suitesCount: 8,
    startingPrice: 980,
    description:
      'Hand-chiseled into the dramatic cliffside overlooking the shimmering Gulf of Salerno. Features thermal hydrotherapy jacuzzis, private citrus groves, and sommelier-curated Italian wine cellars.',
    features: ['Cliffside Heated Jacuzzi', 'Mediterranean Sunset Pergola', 'Artisanal Italian Linens', 'Private Boat Transfer']
  },
  {
    id: 'new-york',
    name: 'New York, USA',
    title: 'Manhattan Reserve',
    tagline: 'Metropolitan Prestige & Executive Calm',
    image: '/images/executive_penthouse.jpg',
    weather: '16°C • Autumn Sun',
    rating: 4.92,
    suitesCount: 15,
    startingPrice: 620,
    description:
      'An urban architectural haven in the skyline with acoustic triple-glazed soundproofing, Bang & Olufsen sound architecture, and an executive workspace equipped for high-profile travelers.',
    features: ['Triple-Glazed Soundproofing', 'Bang & Olufsen Audio', 'Dedicated Work Studio', 'Tesla Model S Chauffeur']
  },
  {
    id: 'bali',
    name: 'Bali Ubud, Indonesia',
    title: 'Lumina Sanctuary',
    tagline: 'Zen Botanical Escape & Holistic Wellness',
    image: '/images/garden_bungalow.jpg',
    weather: '28°C • Warm Mist',
    rating: 4.95,
    suitesCount: 10,
    startingPrice: 450,
    description:
      'Nestled amidst emerald rice terraces and tropical flora. Rejuvenate with private garden water courtyards, open-air slate rain showers, and daily Ayurvedic healing therapies.',
    features: ['Private Zen Fountain', 'Outdoor Rain Shower', 'Daily Sound Baths & Yoga', 'Ayurvedic Chef Service']
  },
  {
    id: 'swiss-alps',
    name: 'Swiss Alps, Switzerland',
    title: 'St. Moritz Crest',
    tagline: 'Alpine Grandeur & Fireside Warmth',
    image: '/images/deluxe_king.jpg',
    weather: '8°C • Crisp Mountain Air',
    rating: 4.94,
    suitesCount: 14,
    startingPrice: 540,
    description:
      'Surrounded by soaring peaks and fragrant pines. Features natural stone fireplaces, heated oak flooring, cashmere bedding, deep thermal soaking tubs, and ski-in / ski-out valet privilege.',
    features: ['Stone Fireplace', 'Panoramic Ridge Balcony', 'Thermal Soaking Tub', 'Ski Valet & Boot Heating']
  }
];

export default function DestinationsPage({ currency, onSelectDestination }) {
  const navigate = useNavigate();

  const handleExploreDestination = (destName) => {
    if (onSelectDestination) {
      onSelectDestination(destName.split(',')[0].trim());
    }
    navigate('/');
  };

  return (
    <div className="destinations-page-root animate-fade-in">
      {/* Hero Header */}
      <section className="destinations-hero">
        <div className="container">
          <div className="hero-pill-badge">
            <Compass size={14} className="gold-icon" />
            <span>TR GROUPS GLOBAL FOOTPRINT</span>
          </div>
          <h1 className="destinations-page-title">
            Explore Our World of <span className="gold-gradient-text">Exceptional Horizons</span>
          </h1>
          <p className="destinations-page-subtitle">
            From the futuristic heights of Tokyo to the overwater serenity of the Maldives,
            each TR GROUPS destination offers a bespoke sanctuary tailored for unforgettable stays.
          </p>
        </div>
      </section>

      {/* Destinations Cards Grid */}
      <section className="container destinations-catalog-section">
        <div className="destinations-grid">
          {DESTINATIONS_LIST.map((dest) => (
            <article key={dest.id} className="destination-card glass-panel">
              <div className="dest-image-wrap">
                <img src={dest.image} alt={dest.name} className="dest-image" loading="lazy" />
                <div className="dest-image-overlay"></div>

                <div className="dest-top-badge">
                  <span className="badge badge-gold">
                    <Sparkles size={11} />
                    TR Signature Horizon
                  </span>
                </div>

                <div className="dest-weather-tag">
                  <Thermometer size={13} className="gold-icon" />
                  <span>{dest.weather}</span>
                </div>
              </div>

              <div className="dest-card-content">
                <div className="dest-location-row">
                  <div className="dest-country-tag">
                    <MapPin size={14} className="gold-icon" />
                    <strong>{dest.name}</strong>
                  </div>
                  <div className="dest-rating-pill">
                    <Star size={13} className="star-filled" />
                    <span>{dest.rating}</span>
                  </div>
                </div>

                <h3 className="dest-property-title">{dest.title}</h3>
                <p className="dest-tagline">{dest.tagline}</p>
                <p className="dest-description">{dest.description}</p>

                {/* Features List */}
                <div className="dest-features-grid">
                  {dest.features.map((feat, idx) => (
                    <div key={idx} className="dest-feature-item">
                      <span className="bullet-gold">•</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="dest-card-footer">
                  <div className="dest-price-box">
                    <span className="from-label">Suites from</span>
                    <strong className="gold-gradient-text dest-rate">
                      {formatPrice(dest.startingPrice, currency)}
                    </strong>
                    <span className="dest-unit">/ night</span>
                  </div>

                  <button
                    className="btn-gold dest-view-btn"
                    onClick={() => handleExploreDestination(dest.name)}
                  >
                    <span>View Suites</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
