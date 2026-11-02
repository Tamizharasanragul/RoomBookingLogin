import React, { useState } from 'react';
import {
  X,
  Check,
  CreditCard,
  User,
  Sparkles,
  Calendar,
  ShieldCheck,
  Tag,
  ArrowRight,
  ArrowLeft,
  Printer,
  Download,
  Share2,
  Lock,
  QrCode
} from 'lucide-react';
import { LUXURY_ADDONS } from '../data/rooms';
import { calculateNights, formatDisplayDate } from '../utils/dates';
import { formatPrice } from '../utils/currency';

export default function BookingModal({
  room,
  currency,
  checkInDate,
  checkOutDate,
  guests,
  onClose,
  onBookingSuccess
}) {
  const [step, setStep] = useState(1); // 1: Addons & Dates, 2: Guest Details, 3: Payment, 4: Confirmation

  // Step 1: Dates & Add-ons
  const [currentCheckIn, setCurrentCheckIn] = useState(checkInDate);
  const [currentCheckOut, setCurrentCheckOut] = useState(checkOutDate);
  const [selectedAddons, setSelectedAddons] = useState([]);

  // Step 2: Guest Info
  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [errors, setErrors] = useState({});

  // Step 3: Payment & Coupon
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: ''
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Step 4: Confirmed Booking Data
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const nights = calculateNights(currentCheckIn, currentCheckOut);

  // Toggle Addon
  const toggleAddon = (addonId) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  // Pricing calculations
  const roomSubtotal = room.price * nights;

  const addonsTotal = selectedAddons.reduce((acc, addonId) => {
    const addon = LUXURY_ADDONS.find((a) => a.id === addonId);
    if (!addon) return acc;
    if (addon.type === 'per_day') {
      return acc + addon.price * nights;
    }
    return acc + addon.price;
  }, 0);

  const subtotalBeforeDiscount = roomSubtotal + addonsTotal;
  const discountAmount = Math.round((subtotalBeforeDiscount * appliedDiscountPercent) / 100);
  const taxableSubtotal = subtotalBeforeDiscount - discountAmount;
  const taxesAndFees = Math.round(taxableSubtotal * 0.12);
  const grandTotal = taxableSubtotal + taxesAndFees;

  // Apply Coupon
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const code = couponCode.trim().toUpperCase();

    if (code === 'LUXURY2026') {
      setAppliedDiscountPercent(20);
      setCouponSuccess('Promo code LUXURY2026 applied! You saved 20%.');
    } else if (code === 'SUMMER15') {
      setAppliedDiscountPercent(15);
      setCouponSuccess('Promo code SUMMER15 applied! You saved 15%.');
    } else {
      setCouponError('Invalid promo code. Try "LUXURY2026" or "SUMMER15".');
      setAppliedDiscountPercent(0);
    }
  };

  // Fill Test Card Shortcut
  const handleFillTestCard = () => {
    setPaymentData({
      cardNumber: '4242 •••• •••• 4242',
      cardHolder: `${guestInfo.firstName || 'ALEX'} ${guestInfo.lastName || 'STERLING'}`.toUpperCase(),
      expiry: '08/29',
      cvv: '888'
    });
  };

  // Validate Guest Info
  const handleProceedToPayment = () => {
    const newErrors = {};
    if (!guestInfo.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!guestInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!guestInfo.email.trim() || !guestInfo.email.includes('@')) {
      newErrors.email = 'Valid email is required';
    }
    if (!guestInfo.phone.trim()) newErrors.phone = 'Phone number is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep(3);
  };

  // Submit Final Booking
  const handleConfirmReservation = () => {
    if (!paymentData.cardNumber || !paymentData.expiry || !paymentData.cvv) {
      setErrors({ payment: 'Please fill in payment card details' });
      return;
    }

    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      const bookingRef = `AUR-${Math.floor(10000 + Math.random() * 90000)}-${room.city.slice(0, 2).toUpperCase()}`;
      const newBooking = {
        bookingId: bookingRef,
        createdAt: new Date().toISOString(),
        room: {
          id: room.id,
          title: room.title,
          category: room.category,
          destination: room.destination,
          image: room.image,
          price: room.price
        },
        checkIn: currentCheckIn,
        checkOut: currentCheckOut,
        nights,
        guests,
        addons: selectedAddons.map((id) => LUXURY_ADDONS.find((a) => a.id === id)),
        guestInfo,
        pricing: {
          roomSubtotal,
          addonsTotal,
          discountAmount,
          taxesAndFees,
          grandTotal,
          currency
        },
        status: 'Confirmed'
      };

      setConfirmedBooking(newBooking);
      setStep(4);
      onBookingSuccess(newBooking);
    }, 1200);
  };

  return (
    <div className="modal-backdrop" onClick={step === 4 ? onClose : undefined}>
      <div
        className="modal-container booking-modal glass-panel animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="booking-modal-header">
          <div>
            <span className="badge badge-gold">Reservation Concierge</span>
            <h2 className="booking-modal-title">
              {step === 4 ? 'Reservation Confirmed!' : `Reserving: ${room.title}`}
            </h2>
          </div>
          <button className="modal-close-icon-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        {step < 4 && (
          <div className="booking-stepper-bar">
            <div className={`step-step-node ${step >= 1 ? 'completed' : ''} ${step === 1 ? 'active' : ''}`}>
              <div className="step-circle">{step > 1 ? <Check size={14} /> : '1'}</div>
              <span>Dates & Perks</span>
            </div>
            <div className={`step-connector ${step >= 2 ? 'filled' : ''}`}></div>

            <div className={`step-step-node ${step >= 2 ? 'completed' : ''} ${step === 2 ? 'active' : ''}`}>
              <div className="step-circle">{step > 2 ? <Check size={14} /> : '2'}</div>
              <span>Guest Details</span>
            </div>
            <div className={`step-connector ${step >= 3 ? 'filled' : ''}`}></div>

            <div className={`step-step-node ${step >= 3 ? 'completed' : ''} ${step === 3 ? 'active' : ''}`}>
              <div className="step-circle">{step > 3 ? <Check size={14} /> : '3'}</div>
              <span>Payment</span>
            </div>
          </div>
        )}

        {/* Content By Step */}
        <div className="booking-modal-body">
          {/* STEP 1: DATES & ADD-ONS */}
          {step === 1 && (
            <div className="booking-step-content animate-fade-in">
              <div className="booking-dates-summary-box glass-panel">
                <div className="dates-col">
                  <label htmlFor="b-checkin">Check-in Date</label>
                  <input
                    id="b-checkin"
                    type="date"
                    value={currentCheckIn}
                    onChange={(e) => setCurrentCheckIn(e.target.value)}
                    className="booking-date-input"
                  />
                  <span className="dates-preview-text">{formatDisplayDate(currentCheckIn)}</span>
                </div>

                <div className="nights-pill-center">
                  <span className="nights-count">{nights}</span>
                  <span className="nights-label">{nights === 1 ? 'Night' : 'Nights'}</span>
                </div>

                <div className="dates-col">
                  <label htmlFor="b-checkout">Check-out Date</label>
                  <input
                    id="b-checkout"
                    type="date"
                    value={currentCheckOut}
                    min={currentCheckIn}
                    onChange={(e) => setCurrentCheckOut(e.target.value)}
                    className="booking-date-input"
                  />
                  <span className="dates-preview-text">{formatDisplayDate(currentCheckOut)}</span>
                </div>
              </div>

              {/* Luxury Add-ons Section */}
              <div className="booking-addons-section">
                <div className="section-title-with-badge">
                  <h3>Enhance Your Stay with Bespoke Luxuries</h3>
                  <span className="badge badge-gold">Optional Upgrades</span>
                </div>

                <div className="addons-list">
                  {LUXURY_ADDONS.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.id);
                    const formattedAddonPrice = formatPrice(addon.price, currency);
                    return (
                      <div
                        key={addon.id}
                        className={`addon-card glass-panel ${isSelected ? 'selected' : ''}`}
                        onClick={() => toggleAddon(addon.id)}
                      >
                        <div className="addon-checkbox-box">
                          <div className={`custom-checkbox ${isSelected ? 'checked' : ''}`}>
                            {isSelected && <Check size={14} />}
                          </div>
                        </div>

                        <div className="addon-info">
                          <h4 className="addon-title">{addon.title}</h4>
                          <p className="addon-desc">{addon.description}</p>
                        </div>

                        <div className="addon-price-col">
                          <span className="addon-price gold-gradient-text">
                            +{formattedAddonPrice}
                          </span>
                          <span className="addon-type-note">
                            {addon.type === 'per_day' ? '/ day' : 'one-time'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: GUEST INFORMATION */}
          {step === 2 && (
            <div className="booking-step-content animate-fade-in">
              <div className="guest-form-grid">
                <div className="form-group">
                  <label htmlFor="first-name">
                    First Name <span className="req">*</span>
                  </label>
                  <input
                    id="first-name"
                    type="text"
                    placeholder="e.g. Alexander"
                    value={guestInfo.firstName}
                    onChange={(e) => setGuestInfo({ ...guestInfo, firstName: e.target.value })}
                    className={`booking-input ${errors.firstName ? 'input-error' : ''}`}
                  />
                  {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="last-name">
                    Last Name <span className="req">*</span>
                  </label>
                  <input
                    id="last-name"
                    type="text"
                    placeholder="e.g. Wright"
                    value={guestInfo.lastName}
                    onChange={(e) => setGuestInfo({ ...guestInfo, lastName: e.target.value })}
                    className={`booking-input ${errors.lastName ? 'input-error' : ''}`}
                  />
                  {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="guest-email">
                    Email Address <span className="req">*</span>
                  </label>
                  <input
                    id="guest-email"
                    type="email"
                    placeholder="alexander@luxury.com"
                    value={guestInfo.email}
                    onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                    className={`booking-input ${errors.email ? 'input-error' : ''}`}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="guest-phone">
                    Phone / Mobile <span className="req">*</span>
                  </label>
                  <input
                    id="guest-phone"
                    type="tel"
                    placeholder="+1 (555) 234-5678"
                    value={guestInfo.phone}
                    onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                    className={`booking-input ${errors.phone ? 'input-error' : ''}`}
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '1.25rem' }}>
                <label htmlFor="special-requests">
                  Special Concierge Requests & Preferences
                </label>
                <textarea
                  id="special-requests"
                  rows="3"
                  placeholder="e.g. Honeymoon setup with chilled champagne, high floor with unobstructed ocean panorama, feather-free pillows..."
                  value={guestInfo.specialRequests}
                  onChange={(e) => setGuestInfo({ ...guestInfo, specialRequests: e.target.value })}
                  className="booking-textarea"
                ></textarea>
              </div>

              <div className="guarantee-box glass-panel">
                <ShieldCheck size={20} className="gold-icon" />
                <div>
                  <strong>VIP Concierge Protection</strong>
                  <p>Your privacy and stay details are encrypted with bank-grade 256-bit SSL protocols.</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT & PROMO */}
          {step === 3 && (
            <div className="booking-step-content animate-fade-in">
              <div className="payment-layout-grid">
                {/* Left: Card Input */}
                <div className="payment-inputs-column">
                  <div className="card-simulation-preview glass-panel">
                    <div className="card-top-row">
                      <span className="card-chip-sim"></span>
                      <span className="card-brand-sim">TR GROUPS BLACK TIER</span>
                    </div>
                    <div className="card-num-sim">
                      {paymentData.cardNumber || '•••• •••• •••• ••••'}
                    </div>
                    <div className="card-footer-sim">
                      <div>
                        <div className="card-label-sim">CARDHOLDER</div>
                        <div className="card-val-sim">
                          {paymentData.cardHolder || 'GUEST NAME'}
                        </div>
                      </div>
                      <div>
                        <div className="card-label-sim">EXPIRES</div>
                        <div className="card-val-sim">{paymentData.expiry || 'MM/YY'}</div>
                      </div>
                    </div>
                  </div>

                  <div className="test-card-shortcut-row">
                    <button
                      type="button"
                      className="btn-ghost fill-test-card-btn"
                      onClick={handleFillTestCard}
                    >
                      <Sparkles size={14} className="gold-icon" />
                      <span>Fill Sample Test Card</span>
                    </button>
                  </div>

                  <div className="payment-fields-form">
                    <div className="form-group">
                      <label htmlFor="card-number">Card Number</label>
                      <input
                        id="card-number"
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        maxLength="19"
                        value={paymentData.cardNumber}
                        onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                        className="booking-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="card-holder">Cardholder Name</label>
                      <input
                        id="card-holder"
                        type="text"
                        placeholder="Name on card"
                        value={paymentData.cardHolder}
                        onChange={(e) => setPaymentData({ ...paymentData, cardHolder: e.target.value })}
                        className="booking-input"
                      />
                    </div>

                    <div className="form-row-two">
                      <div className="form-group">
                        <label htmlFor="card-expiry">Expiry Date</label>
                        <input
                          id="card-expiry"
                          type="text"
                          placeholder="MM/YY"
                          maxLength="5"
                          value={paymentData.expiry}
                          onChange={(e) => setPaymentData({ ...paymentData, expiry: e.target.value })}
                          className="booking-input"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="card-cvv">CVV</label>
                        <input
                          id="card-cvv"
                          type="password"
                          placeholder="•••"
                          maxLength="4"
                          value={paymentData.cvv}
                          onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                          className="booking-input"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Promo Code Form */}
                  <form onSubmit={handleApplyCoupon} className="coupon-form-group">
                    <div className="coupon-input-wrap">
                      <Tag size={16} className="coupon-icon" />
                      <input
                        type="text"
                        placeholder="Promo Code (e.g. LUXURY2026)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="coupon-input"
                      />
                      <button type="submit" className="btn-ghost apply-coupon-btn">
                        Apply
                      </button>
                    </div>
                    {couponSuccess && <span className="coupon-success-msg">{couponSuccess}</span>}
                    {couponError && <span className="coupon-error-msg">{couponError}</span>}
                  </form>
                </div>

                {/* Right: Detailed Ledger */}
                <div className="payment-ledger-column glass-panel">
                  <h4 className="ledger-title">Reservation Summary</h4>

                  <div className="ledger-room-snippet">
                    <img src={room.image} alt={room.title} className="ledger-room-thumb" />
                    <div>
                      <strong>{room.title}</strong>
                      <span>{room.destination}</span>
                    </div>
                  </div>

                  <div className="ledger-breakdown">
                    <div className="ledger-row">
                      <span>{formatPrice(room.price, currency)} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                      <span>{formatPrice(roomSubtotal, currency)}</span>
                    </div>

                    {addonsTotal > 0 && (
                      <div className="ledger-row">
                        <span>Selected Bespoke Luxuries ({selectedAddons.length})</span>
                        <span>+{formatPrice(addonsTotal, currency)}</span>
                      </div>
                    )}

                    {discountAmount > 0 && (
                      <div className="ledger-row discount-row">
                        <span>Promo Discount ({appliedDiscountPercent}%)</span>
                        <span>-{formatPrice(discountAmount, currency)}</span>
                      </div>
                    )}

                    <div className="ledger-row">
                      <span>Resort Hospitality Taxes & Fees (12%)</span>
                      <span>+{formatPrice(taxesAndFees, currency)}</span>
                    </div>

                    <div className="ledger-divider"></div>

                    <div className="ledger-total-row">
                      <strong>Total Due</strong>
                      <strong className="grand-total-amount gold-gradient-text">
                        {formatPrice(grandTotal, currency)}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CONFIRMATION & DIGITAL BOARDING PASS */}
          {step === 4 && confirmedBooking && (
            <div className="booking-confirmation-content animate-fade-in">
              <div className="confirmation-badge-row">
                <div className="confirmed-icon-circle">
                  <Check size={28} />
                </div>
                <h3>Your Luxury Sanctuary Awaits</h3>
                <p>
                  A confirmation email with your digital itinerary has been dispatched to{' '}
                  <strong>{confirmedBooking.guestInfo.email}</strong>.
                </p>
              </div>

              {/* Digital Boarding Pass / Voucher */}
              <div className="digital-voucher-card glass-panel" id="printable-voucher">
                <div className="voucher-header">
                  <div className="voucher-brand">
                    <Sparkles size={16} className="gold-icon" />
                    <span>TR GROUPS LUXURY HOTELS • OFFICIAL BOARDING PASS</span>
                  </div>
                  <div className="voucher-ref">
                    <span>REFERENCE ID</span>
                    <strong>{confirmedBooking.bookingId}</strong>
                  </div>
                </div>

                <div className="voucher-body">
                  <div className="voucher-room-visual">
                    <img src={confirmedBooking.room.image} alt={confirmedBooking.room.title} />
                  </div>

                  <div className="voucher-details-grid">
                    <div className="voucher-col">
                      <span className="v-label">PRIMARY GUEST</span>
                      <strong>
                        {confirmedBooking.guestInfo.firstName} {confirmedBooking.guestInfo.lastName}
                      </strong>
                    </div>

                    <div className="voucher-col">
                      <span className="v-label">SUITE CATEGORY</span>
                      <strong>{confirmedBooking.room.title}</strong>
                    </div>

                    <div className="voucher-col">
                      <span className="v-label">CHECK-IN</span>
                      <strong>{formatDisplayDate(confirmedBooking.checkIn)} (3:00 PM)</strong>
                    </div>

                    <div className="voucher-col">
                      <span className="v-label">CHECK-OUT</span>
                      <strong>{formatDisplayDate(confirmedBooking.checkOut)} (11:00 AM)</strong>
                    </div>

                    <div className="voucher-col">
                      <span className="v-label">DURATION & GUESTS</span>
                      <strong>
                        {confirmedBooking.nights} Nights • {confirmedBooking.guests.adults} Adults
                        {confirmedBooking.guests.children > 0 && `, ${confirmedBooking.guests.children} Children`}
                      </strong>
                    </div>

                    <div className="voucher-col">
                      <span className="v-label">TOTAL PAID</span>
                      <strong className="gold-gradient-text">
                        {formatPrice(confirmedBooking.pricing.grandTotal, currency)}
                      </strong>
                    </div>
                  </div>

                  <div className="voucher-qr-box">
                    <div className="qr-sim">
                      <QrCode size={72} className="qr-icon" />
                      <span className="qr-caption">Scan at Reception</span>
                    </div>
                  </div>
                </div>

                {confirmedBooking.addons.length > 0 && (
                  <div className="voucher-addons-footer">
                    <span className="v-label">INCLUDED BESPOKE AMENITIES:</span>
                    <div className="voucher-addon-tags">
                      {confirmedBooking.addons.map((addon) => (
                        <span key={addon.id} className="badge badge-gold">
                          ✓ {addon.title}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirmation Actions */}
              <div className="confirmation-actions-row">
                <button
                  className="btn-ghost"
                  onClick={() => window.print()}
                  title="Print or Save PDF"
                >
                  <Printer size={16} />
                  <span>Print Voucher</span>
                </button>

                <button
                  className="btn-gold"
                  onClick={onClose}
                >
                  <span>Complete & View My Bookings</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Stepper Controls (for Steps 1 to 3) */}
        {step < 4 && (
          <div className="booking-modal-footer">
            {step > 1 ? (
              <button className="btn-ghost" onClick={() => setStep(step - 1)}>
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
            ) : (
              <button className="btn-ghost" onClick={onClose}>
                Cancel
              </button>
            )}

            <div className="booking-footer-price-sub">
              <span>Total Payable:</span>
              <strong className="gold-gradient-text">{formatPrice(grandTotal, currency)}</strong>
            </div>

            {step === 1 && (
              <button className="btn-gold" onClick={() => setStep(2)}>
                <span>Guest Details</span>
                <ArrowRight size={16} />
              </button>
            )}

            {step === 2 && (
              <button className="btn-gold" onClick={handleProceedToPayment}>
                <span>Payment</span>
                <ArrowRight size={16} />
              </button>
            )}

            {step === 3 && (
              <button
                className="btn-gold confirm-pay-btn"
                onClick={handleConfirmReservation}
                disabled={isProcessingPayment}
              >
                {isProcessingPayment ? (
                  <span>Securing Suite...</span>
                ) : (
                  <>
                    <Lock size={15} />
                    <span>Confirm & Pay {formatPrice(grandTotal, currency)}</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
