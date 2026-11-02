import React from 'react';
import {
  Star,
  Users,
  Maximize2,
  Bed,
  MapPin,
  Heart,
  ArrowRight,
  Sparkles,
  Check
} from 'lucide-react';
import { formatPrice } from '../utils/currency';

export default function RoomCard({
  room,
  currency,
  nights,
  isWishlisted,
  onToggleWishlist,
  onSelectRoom,
  onBookNow
}) {
  const totalPrice = room.price * nights;

  return (
    <article className="room-card glass-panel" id={`room-${room.id}`}>
      {/* Image Container */}
      <div className="room-card-image-wrap">
        <img
          src={room.image}
          alt={room.title}
          className="room-card-image"
          loading="lazy"
        />
        <div className="room-card-image-gradient"></div>

        {/* Top Badges */}
        <div className="card-top-badges">
          {room.badge && (
            <span className="badge badge-gold">
              <Sparkles size={11} />
              {room.badge}
            </span>
          )}
          <span className="badge badge-emerald">Available</span>
        </div>

        {/* Wishlist Button */}
        <button
          className={`card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(room);
          }}
          aria-label={isWishlisted ? 'Remove from saved' : 'Save suite'}
        >
          <Heart size={18} className={isWishlisted ? 'heart-filled' : ''} />
        </button>

        {/* Location Tag */}
        <div className="card-location-tag">
          <MapPin size={13} className="gold-icon" />
          <span>{room.destination}</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="room-card-body">
        {/* Rating and Reviews */}
        <div className="room-card-rating-row">
          <span className="room-category-label">{room.category}</span>
          <div className="room-rating-box">
            <Star size={14} className="star-filled" />
            <span className="rating-score">{room.rating}</span>
            <span className="reviews-count">({room.reviewsCount})</span>
          </div>
        </div>

        <h3 className="room-card-title" onClick={() => onSelectRoom(room)}>
          {room.title}
        </h3>

        {/* Room Specs Icons */}
        <div className="room-specs-row">
          <div className="spec-item" title="Max Occupancy">
            <Users size={15} />
            <span>Up to {room.maxGuests} Guests</span>
          </div>
          <div className="spec-item" title="Bed Type">
            <Bed size={15} />
            <span>{room.bedType}</span>
          </div>
          <div className="spec-item" title="Suite Area">
            <Maximize2 size={15} />
            <span>{room.sizeSqFt} sq ft</span>
          </div>
        </div>

        {/* Key Highlights */}
        <ul className="room-highlights-preview">
          {room.highlights.slice(0, 2).map((hl, idx) => (
            <li key={idx}>
              <Check size={13} className="check-gold" />
              <span>{hl}</span>
            </li>
          ))}
        </ul>

        {/* Price & Action Row */}
        <div className="room-card-footer">
          <div className="room-price-stack">
            <div className="nightly-price-row">
              <span className="price-number gold-gradient-text">
                {formatPrice(room.price, currency)}
              </span>
              <span className="price-unit">/ night</span>
              {room.originalPrice && (
                <span className="price-original">
                  {formatPrice(room.originalPrice, currency)}
                </span>
              )}
            </div>
            {nights > 1 && (
              <span className="price-total-subtext">
                {formatPrice(totalPrice, currency)} for {nights} nights (excl. tax)
              </span>
            )}
          </div>

          <div className="card-buttons-group">
            <button
              className="btn-ghost card-details-btn"
              onClick={() => onSelectRoom(room)}
            >
              Details
            </button>
            <button
              className="btn-gold card-book-btn"
              onClick={() => onBookNow(room)}
            >
              <span>Book</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
