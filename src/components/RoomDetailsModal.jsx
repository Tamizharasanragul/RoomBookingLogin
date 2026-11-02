import React, { useState } from 'react';
import {
  X,
  Star,
  Users,
  Maximize2,
  Bed,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Heart,
  Calendar,
  Sparkles,
  ArrowRight,
  Coffee,
  Wifi,
  Waves,
  Tv,
  Bath,
  Clock,
  Dumbbell,
  GlassWater
} from 'lucide-react';
import { AMENITY_DEFINITIONS } from '../data/rooms';
import { formatPrice } from '../utils/currency';

export default function RoomDetailsModal({
  room,
  currency,
  nights,
  checkInDate,
  checkOutDate,
  isWishlisted,
  onToggleWishlist,
  onClose,
  onBookNow
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'reviews' | 'policies'

  if (!room) return null;

  const subtotal = room.price * nights;
  const taxesAndFees = Math.round(subtotal * 0.12);
  const total = subtotal + taxesAndFees;

  const getAmenityIcon = (key) => {
    switch (key) {
      case 'wifi':
        return <Wifi size={16} />;
      case 'pool':
        return <Waves size={16} />;
      case 'breakfast':
        return <Coffee size={16} />;
      case 'tv':
        return <Tv size={16} />;
      case 'spa':
      case 'jacuzzi':
      case 'bathtub':
        return <Bath size={16} />;
      case 'gym':
        return <Dumbbell size={16} />;
      case 'bar':
        return <GlassWater size={16} />;
      default:
        return <Sparkles size={16} />;
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container room-details-modal glass-panel animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button className="modal-close-icon-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Modal Hero Image */}
        <div className="modal-hero-image-wrap">
          <img src={room.image} alt={room.title} className="modal-hero-image" />
          <div className="modal-hero-overlay"></div>

          <div className="modal-hero-info">
            <div className="modal-tags-row">
              <span className="badge badge-gold">
                <Sparkles size={12} />
                {room.badge || 'Luxury Collection'}
              </span>
              <span className="badge badge-emerald">Available for Selected Dates</span>
            </div>
            <h2 className="modal-suite-title">{room.title}</h2>
            <div className="modal-location-row">
              <MapPin size={16} className="gold-icon" />
              <span>{room.destination}</span>
              <span className="separator">•</span>
              <div className="rating-pill">
                <Star size={14} className="star-filled" />
                <strong>{room.rating}</strong>
                <span>({room.reviewsCount} verified stays)</span>
              </div>
            </div>
          </div>

          <button
            className={`modal-wishlist-btn ${isWishlisted ? 'active' : ''}`}
            onClick={() => onToggleWishlist(room)}
            title="Save to Wishlist"
          >
            <Heart size={20} className={isWishlisted ? 'heart-filled' : ''} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="modal-tabs-bar">
          <button
            className={`modal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Suite Overview & Amenities
          </button>
          <button
            className={`modal-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Guest Reviews ({room.reviews?.length || 0})
          </button>
          <button
            className={`modal-tab-btn ${activeTab === 'policies' ? 'active' : ''}`}
            onClick={() => setActiveTab('policies')}
          >
            Stay Policies & Guarantee
          </button>
        </div>

        {/* Modal Main Body */}
        <div className="modal-scroll-content">
          {activeTab === 'overview' && (
            <div className="overview-tab-content">
              {/* Specs Grid */}
              <div className="suite-specs-grid">
                <div className="spec-card glass-panel">
                  <Users size={20} className="gold-icon" />
                  <div className="spec-meta">
                    <span className="spec-label">Capacity</span>
                    <strong>{room.maxGuests} Guests</strong>
                  </div>
                </div>

                <div className="spec-card glass-panel">
                  <Bed size={20} className="gold-icon" />
                  <div className="spec-meta">
                    <span className="spec-label">Bedding</span>
                    <strong>{room.bedType}</strong>
                  </div>
                </div>

                <div className="spec-card glass-panel">
                  <Maximize2 size={20} className="gold-icon" />
                  <div className="spec-meta">
                    <span className="spec-label">Living Area</span>
                    <strong>{room.sizeSqFt} sq ft</strong>
                  </div>
                </div>

                <div className="spec-card glass-panel">
                  <Bath size={20} className="gold-icon" />
                  <div className="spec-meta">
                    <span className="spec-label">En-Suite Baths</span>
                    <strong>{room.bathrooms} Luxury Baths</strong>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="suite-description-block">
                <h3>About This Residence</h3>
                <p>{room.description}</p>
              </div>

              {/* Signature Highlights */}
              <div className="suite-highlights-block">
                <h3>Signature Highlights</h3>
                <div className="highlights-grid">
                  {room.highlights.map((item, idx) => (
                    <div key={idx} className="highlight-item-box">
                      <CheckCircle2 size={18} className="gold-icon" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comprehensive Amenities */}
              <div className="suite-amenities-block">
                <h3>Included Luxuries & Amenities</h3>
                <div className="amenities-badge-grid">
                  {room.amenities.map((key) => {
                    const def = AMENITY_DEFINITIONS.find((a) => a.key === key);
                    const label = def ? def.label : key;
                    return (
                      <div key={key} className="amenity-badge-item">
                        <span className="amenity-icon-box">{getAmenityIcon(key)}</span>
                        <span>{label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="reviews-tab-content">
              <div className="reviews-summary-card glass-panel">
                <div className="rating-huge-score gold-gradient-text">{room.rating}</div>
                <div className="rating-score-stars">
                  <div className="stars-row">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={18} className="star-filled" />
                    ))}
                  </div>
                  <p>Based on {room.reviewsCount} verified traveler reviews</p>
                </div>
              </div>

              <div className="reviews-list">
                {room.reviews &&
                  room.reviews.map((rev) => (
                    <div key={rev.id} className="review-card glass-panel">
                      <div className="review-header">
                        <img src={rev.avatar} alt={rev.name} className="review-avatar" />
                        <div>
                          <strong>{rev.name}</strong>
                          <span className="review-date">{rev.date} • Verified Guest</span>
                        </div>
                        <div className="review-stars-badge">
                          <Star size={13} className="star-filled" />
                          <span>{rev.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <p className="review-comment">"{rev.comment}"</p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {activeTab === 'policies' && (
            <div className="policies-tab-content">
              <div className="policy-item glass-panel">
                <Clock size={20} className="gold-icon" />
                <div>
                  <strong>Check-in & Check-out</strong>
                  <p>
                    Check-in starts at 3:00 PM. Check-out is until 11:00 AM. Guaranteed early
                    check-in and late check-out available during reservation.
                  </p>
                </div>
              </div>

              <div className="policy-item glass-panel">
                <ShieldCheck size={20} className="gold-icon" />
                <div>
                  <strong>Free Cancellation Guarantee</strong>
                  <p>
                    Full refund if cancelled up to 48 hours prior to check-in date. No questions
                    asked instant refund back to your payment method.
                  </p>
                </div>
              </div>

              <div className="policy-item glass-panel">
                <Sparkles size={20} className="gold-icon" />
                <div>
                  <strong>Valet & Concierge Services</strong>
                  <p>
                    Complimentary valet parking and 24/7 dedicated luggage escort to your suite
                    are included with every booking.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Sticky Bottom Action Bar */}
        <div className="modal-bottom-bar">
          <div className="modal-pricing-summary">
            <div className="price-tag-row">
              <span className="price-main gold-gradient-text">
                {formatPrice(room.price, currency)}
              </span>
              <span className="price-sub">/ night</span>
            </div>
            <span className="nights-calc-text">
              Total: {formatPrice(total, currency)} ({nights} {nights === 1 ? 'night' : 'nights'} incl. 12% luxury tax)
            </span>
          </div>

          <div className="modal-action-buttons">
            <button className="btn-ghost" onClick={onClose}>
              Back to Catalog
            </button>
            <button
              className="btn-gold modal-reserve-btn"
              onClick={() => {
                onClose();
                onBookNow(room);
              }}
            >
              <span>Instant Reserve</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
