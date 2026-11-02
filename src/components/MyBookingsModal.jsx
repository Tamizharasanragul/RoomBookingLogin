import React, { useState } from 'react';
import {
  X,
  Briefcase,
  Heart,
  Calendar,
  MapPin,
  Trash2,
  Printer,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  QrCode
} from 'lucide-react';
import { formatDisplayDate } from '../utils/dates';
import { formatPrice } from '../utils/currency';

export default function MyBookingsModal({
  bookings,
  wishlist,
  currency,
  activeSubTab = 'bookings', // 'bookings' | 'wishlist'
  onClose,
  onCancelBooking,
  onBookWishlistRoom,
  onRemoveFromWishlist
}) {
  const [tab, setTab] = useState(activeSubTab);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container my-bookings-modal glass-panel animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bookings-modal-header">
          <div className="bookings-header-title">
            <span className="badge badge-gold">Guest Management</span>
            <h2>My Reservations & Wishlist</h2>
          </div>
          <button className="modal-close-icon-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="bookings-tabs-nav">
          <button
            className={`booking-tab-link ${tab === 'bookings' ? 'active' : ''}`}
            onClick={() => setTab('bookings')}
          >
            <Briefcase size={16} />
            <span>Active Reservations</span>
            <span className="tab-count-pill">{bookings.length}</span>
          </button>
          <button
            className={`booking-tab-link ${tab === 'wishlist' ? 'active' : ''}`}
            onClick={() => setTab('wishlist')}
          >
            <Heart size={16} />
            <span>Saved Wishlist</span>
            <span className="tab-count-pill">{wishlist.length}</span>
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="bookings-modal-scroll">
          {/* TAB 1: RESERVATIONS */}
          {tab === 'bookings' && (
            <div className="bookings-list-container">
              {bookings.length === 0 ? (
                <div className="empty-state-box glass-panel">
                  <div className="empty-icon-wrap">
                    <Briefcase size={36} className="gold-icon" />
                  </div>
                  <h3>No Active Reservations</h3>
                  <p>You haven't reserved any luxury suites yet. Explore our world-class catalog to book your next getaway.</p>
                  <button className="btn-gold" onClick={onClose}>
                    Explore Available Suites
                  </button>
                </div>
              ) : (
                <div className="reservations-cards-grid">
                  {bookings.map((booking) => (
                    <div key={booking.bookingId} className="reservation-card glass-panel">
                      <div className="reservation-card-top">
                        <div className="res-ref-group">
                          <span className="res-ref-label">RESERVATION REF</span>
                          <strong className="res-ref-id gold-gradient-text">
                            {booking.bookingId}
                          </strong>
                        </div>
                        <span className="badge badge-emerald">Confirmed & Guaranteed</span>
                      </div>

                      <div className="res-card-main-content">
                        <img
                          src={booking.room.image}
                          alt={booking.room.title}
                          className="res-card-thumb"
                        />

                        <div className="res-meta-content">
                          <h4 className="res-room-title">{booking.room.title}</h4>
                          <div className="res-location">
                            <MapPin size={14} className="gold-icon" />
                            <span>{booking.room.destination}</span>
                          </div>

                          <div className="res-dates-strip">
                            <div className="res-date-block">
                              <span className="date-label">Check-in</span>
                              <strong>{formatDisplayDate(booking.checkIn)}</strong>
                            </div>
                            <span className="date-arrow">→</span>
                            <div className="res-date-block">
                              <span className="date-label">Check-out</span>
                              <strong>{formatDisplayDate(booking.checkOut)}</strong>
                            </div>
                            <div className="res-nights-block">
                              <span>({booking.nights} nights)</span>
                            </div>
                          </div>

                          <div className="res-guest-name">
                            <span>Primary Guest: </span>
                            <strong>
                              {booking.guestInfo.firstName} {booking.guestInfo.lastName}
                            </strong>
                          </div>

                          {booking.addons && booking.addons.length > 0 && (
                            <div className="res-addons-list">
                              <span>Perks: </span>
                              {booking.addons.map((a) => (
                                <span key={a.id} className="badge badge-gold res-addon-badge">
                                  {a.title.split(' ')[0]} {a.title.split(' ')[1]}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="res-card-footer">
                        <div className="res-total-col">
                          <span>Total Paid:</span>
                          <strong className="gold-gradient-text res-price">
                            {formatPrice(booking.pricing.grandTotal, currency)}
                          </strong>
                        </div>

                        <div className="res-card-actions">
                          <button
                            className="btn-ghost"
                            onClick={() => window.print()}
                            title="Print Voucher"
                          >
                            <Printer size={15} />
                            <span>Voucher</span>
                          </button>

                          <button
                            className="btn-ghost cancel-res-btn"
                            onClick={() => setBookingToCancel(booking)}
                            title="Cancel Booking"
                          >
                            <Trash2 size={15} />
                            <span>Cancel</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WISHLIST */}
          {tab === 'wishlist' && (
            <div className="wishlist-list-container">
              {wishlist.length === 0 ? (
                <div className="empty-state-box glass-panel">
                  <div className="empty-icon-wrap">
                    <Heart size={36} className="gold-icon" />
                  </div>
                  <h3>Your Wishlist is Empty</h3>
                  <p>Click the heart icon on any suite card to bookmark your dream destinations for quick reservation.</p>
                  <button className="btn-gold" onClick={onClose}>
                    Browse Suites & Villas
                  </button>
                </div>
              ) : (
                <div className="wishlist-cards-grid">
                  {wishlist.map((room) => (
                    <div key={room.id} className="wishlist-card glass-panel">
                      <img src={room.image} alt={room.title} className="wishlist-thumb" />
                      <div className="wishlist-card-details">
                        <div className="wishlist-tag-row">
                          <span className="room-category-label">{room.category}</span>
                          <div className="res-location">
                            <MapPin size={13} className="gold-icon" />
                            <span>{room.destination}</span>
                          </div>
                        </div>

                        <h4 className="wishlist-title">{room.title}</h4>

                        <div className="wishlist-pricing-row">
                          <div className="wishlist-price">
                            <strong className="gold-gradient-text">
                              {formatPrice(room.price, currency)}
                            </strong>
                            <span> / night</span>
                          </div>

                          <div className="wishlist-action-btns">
                            <button
                              className="btn-ghost remove-wishlist-btn"
                              onClick={() => onRemoveFromWishlist(room.id)}
                              title="Remove from saved"
                            >
                              <Trash2 size={15} />
                            </button>

                            <button
                              className="btn-gold"
                              onClick={() => {
                                onClose();
                                onBookWishlistRoom(room);
                              }}
                            >
                              <span>Reserve Now</span>
                              <ArrowRight size={15} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Cancellation Confirmation Dialog */}
        {bookingToCancel && (
          <div className="cancel-confirm-overlay">
            <div className="cancel-confirm-box glass-panel animate-fade-in">
              <ShieldAlert size={36} className="cancel-warning-icon" />
              <h3>Cancel Reservation?</h3>
              <p>
                Are you sure you want to cancel reference{' '}
                <strong>{bookingToCancel.bookingId}</strong> for{' '}
                <strong>{bookingToCancel.room.title}</strong>?
              </p>
              <div className="refund-notice-box">
                <span>Free cancellation applies: </span>
                <strong>
                  Full refund of {formatPrice(bookingToCancel.pricing.grandTotal, currency)} will be
                  credited back to your card.
                </strong>
              </div>
              <div className="cancel-confirm-actions">
                <button
                  className="btn-ghost"
                  onClick={() => setBookingToCancel(null)}
                >
                  Keep Reservation
                </button>
                <button
                  className="btn-danger-confirm"
                  onClick={() => {
                    onCancelBooking(bookingToCancel.bookingId);
                    setBookingToCancel(null);
                  }}
                >
                  Confirm Cancellation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
