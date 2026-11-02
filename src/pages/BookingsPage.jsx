import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Heart,
  Calendar,
  MapPin,
  Trash2,
  Printer,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  QrCode,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { formatDisplayDate } from '../utils/dates';
import { formatPrice } from '../utils/currency';

export default function BookingsPage({
  bookings,
  wishlist,
  currency,
  onCancelBooking,
  onRemoveFromWishlist,
  onBookRoom
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const tabParam = searchParams.get('tab') === 'wishlist' ? 'wishlist' : 'bookings';
  const [activeTab, setActiveTab] = useState(tabParam);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl === 'wishlist' || tabFromUrl === 'bookings') {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setSearchParams({ tab: newTab });
  };

  const totalNightsBooked = bookings.reduce((sum, b) => sum + (b.nights || 0), 0);

  return (
    <div className="bookings-page-root animate-fade-in">
      {/* Header Banner */}
      <section className="bookings-page-hero">
        <div className="container">
          <div className="hero-pill-badge">
            <Briefcase size={14} className="gold-icon" />
            <span>GUEST PORTAL • TR GROUPS</span>
          </div>
          <h1 className="bookings-page-title">
            My Reservations & <span className="gold-gradient-text">Saved Suites</span>
          </h1>
          <p className="bookings-page-subtitle">
            Manage your upcoming stays, view official digital boarding passes, or reserve your saved wishlist residences.
          </p>

          {/* Quick Metrics Bar */}
          <div className="guest-metrics-bar glass-panel">
            <div className="metric-box">
              <span className="metric-val gold-gradient-text">{bookings.length}</span>
              <span className="metric-label">Confirmed Stays</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-box">
              <span className="metric-val gold-gradient-text">{totalNightsBooked}</span>
              <span className="metric-label">Upcoming Nights</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-box">
              <span className="metric-val gold-gradient-text">{wishlist.length}</span>
              <span className="metric-label">Saved in Wishlist</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tabs Container */}
      <section className="container bookings-main-section">
        {/* Navigation Tabs */}
        <div className="portal-tabs-nav">
          <button
            className={`portal-tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => handleTabChange('bookings')}
          >
            <Briefcase size={17} />
            <span>Active Reservations</span>
            <span className="tab-badge">{bookings.length}</span>
          </button>

          <button
            className={`portal-tab-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
            onClick={() => handleTabChange('wishlist')}
          >
            <Heart size={17} className={wishlist.length > 0 ? 'heart-filled' : ''} />
            <span>Saved Wishlist</span>
            <span className="tab-badge">{wishlist.length}</span>
          </button>
        </div>

        {/* Tab 1: Bookings */}
        {activeTab === 'bookings' && (
          <div className="portal-tab-content">
            {bookings.length === 0 ? (
              <div className="empty-state-box glass-panel">
                <div className="empty-icon-wrap">
                  <Briefcase size={36} className="gold-icon" />
                </div>
                <h3>No Confirmed Reservations Yet</h3>
                <p>
                  You haven't reserved any luxury residences yet. Explore our curated global suites to secure your next getaway.
                </p>
                <button className="btn-gold" onClick={() => navigate('/')}>
                  <span>Browse Available Suites</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <div className="reservations-full-grid">
                {bookings.map((booking) => (
                  <article key={booking.bookingId} className="reservation-full-card glass-panel">
                    {/* Top status bar */}
                    <div className="res-full-top">
                      <div>
                        <span className="res-ref-label">OFFICIAL RESERVATION REFERENCE</span>
                        <strong className="res-ref-id gold-gradient-text">
                          {booking.bookingId}
                        </strong>
                      </div>
                      <span className="badge badge-emerald">
                        <CheckCircle2 size={13} />
                        Confirmed & Guaranteed
                      </span>
                    </div>

                    {/* Main Content */}
                    <div className="res-full-body">
                      <img
                        src={booking.room.image}
                        alt={booking.room.title}
                        className="res-full-thumb"
                      />

                      <div className="res-full-info">
                        <h3 className="res-full-title">{booking.room.title}</h3>
                        <div className="res-full-location">
                          <MapPin size={15} className="gold-icon" />
                          <span>{booking.room.destination}</span>
                        </div>

                        {/* Dates Banner */}
                        <div className="res-full-dates-banner">
                          <div className="res-date-cell">
                            <span className="cell-label">Check-in</span>
                            <strong>{formatDisplayDate(booking.checkIn)}</strong>
                            <span className="cell-time">From 3:00 PM</span>
                          </div>
                          <span className="res-date-arrow">→</span>
                          <div className="res-date-cell">
                            <span className="cell-label">Check-out</span>
                            <strong>{formatDisplayDate(booking.checkOut)}</strong>
                            <span className="cell-time">Until 11:00 AM</span>
                          </div>
                          <div className="res-duration-cell">
                            <span className="nights-number gold-gradient-text">
                              {booking.nights}
                            </span>
                            <span className="nights-word">
                              {booking.nights === 1 ? 'Night' : 'Nights'}
                            </span>
                          </div>
                        </div>

                        {/* Guest & Extras */}
                        <div className="res-full-guest-row">
                          <div>
                            <span className="cell-label">Primary Guest</span>
                            <strong>
                              {booking.guestInfo.firstName} {booking.guestInfo.lastName}
                            </strong>
                          </div>
                          <div>
                            <span className="cell-label">Guests</span>
                            <strong>
                              {booking.guests.adults} Adults
                              {booking.guests.children > 0 && `, ${booking.guests.children} Children`}
                            </strong>
                          </div>
                        </div>

                        {booking.addons && booking.addons.length > 0 && (
                          <div className="res-full-addons">
                            <span className="cell-label">Included Bespoke Luxuries:</span>
                            <div className="res-addons-tags-row">
                              {booking.addons.map((addon) => (
                                <span key={addon.id} className="badge badge-gold">
                                  ✓ {addon.title}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* QR & Print Strip */}
                      <div className="res-full-qr-side">
                        <div className="qr-sim-box">
                          <QrCode size={80} className="qr-icon" />
                          <span className="qr-note">Scan at Reception</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="res-full-footer">
                      <div className="res-full-price-group">
                        <span className="cell-label">Total Amount Paid</span>
                        <strong className="res-full-price gold-gradient-text">
                          {formatPrice(booking.pricing.grandTotal, currency)}
                        </strong>
                      </div>

                      <div className="res-full-action-btns">
                        <button
                          className="btn-ghost"
                          onClick={() => window.print()}
                          title="Print Boarding Pass"
                        >
                          <Printer size={15} />
                          <span>Print Voucher</span>
                        </button>

                        <button
                          className="btn-ghost cancel-btn-highlight"
                          onClick={() => setBookingToCancel(booking)}
                          title="Cancel Reservation"
                        >
                          <Trash2 size={15} />
                          <span>Cancel Stay</span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Wishlist */}
        {activeTab === 'wishlist' && (
          <div className="portal-tab-content">
            {wishlist.length === 0 ? (
              <div className="empty-state-box glass-panel">
                <div className="empty-icon-wrap">
                  <Heart size={36} className="gold-icon" />
                </div>
                <h3>Your Wishlist is Empty</h3>
                <p>
                  Explore our collection and click the heart icon on any suite card to bookmark it for later.
                </p>
                <button className="btn-gold" onClick={() => navigate('/')}>
                  <span>Explore Luxury Suites</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <div className="wishlist-full-grid">
                {wishlist.map((room) => (
                  <article key={room.id} className="wishlist-full-card glass-panel">
                    <img src={room.image} alt={room.title} className="wishlist-full-thumb" />

                    <div className="wishlist-full-body">
                      <div className="wishlist-cat-row">
                        <span className="room-category-label">{room.category}</span>
                        <div className="res-location">
                          <MapPin size={13} className="gold-icon" />
                          <span>{room.destination}</span>
                        </div>
                      </div>

                      <h3 className="wishlist-full-title">{room.title}</h3>
                      <p className="wishlist-full-desc">{room.description}</p>

                      <div className="wishlist-full-footer">
                        <div className="wishlist-rate-box">
                          <span className="cell-label">Nightly Rate</span>
                          <strong className="gold-gradient-text wishlist-rate">
                            {formatPrice(room.price, currency)}
                          </strong>
                          <span className="unit-label">/ night</span>
                        </div>

                        <div className="wishlist-actions-cluster">
                          <button
                            className="btn-ghost remove-wish-btn"
                            onClick={() => onRemoveFromWishlist(room.id)}
                            title="Remove from wishlist"
                          >
                            <Trash2 size={15} />
                            <span>Remove</span>
                          </button>

                          <button
                            className="btn-gold"
                            onClick={() => onBookRoom(room)}
                          >
                            <span>Reserve This Suite</span>
                            <ArrowRight size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Cancellation Confirmation Dialog */}
        {bookingToCancel && (
          <div className="cancel-confirm-overlay">
            <div className="cancel-confirm-box glass-panel animate-fade-in">
              <ShieldAlert size={40} className="cancel-warning-icon" />
              <h3>Cancel Reservation?</h3>
              <p>
                Are you sure you want to cancel reference{' '}
                <strong>{bookingToCancel.bookingId}</strong> for{' '}
                <strong>{bookingToCancel.room.title}</strong>?
              </p>
              <div className="refund-notice-box">
                <ShieldCheck size={16} />
                <span>
                  Free cancellation guarantee: Full refund of{' '}
                  <strong>{formatPrice(bookingToCancel.pricing.grandTotal, currency)}</strong> will be credited to your card.
                </span>
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
      </section>
    </div>
  );
}
