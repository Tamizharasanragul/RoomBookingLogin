import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Award,
  Crown,
  UtensilsCrossed,
  Car,
  Waves,
  HeartHandshake,
  Clock,
  ArrowRight,
  Send
} from 'lucide-react';

export default function ServicesPage({ onShowToast }) {
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    serviceType: 'Private Butler',
    destination: 'Tokyo, Japan',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inquiryData.name || !inquiryData.email) return;

    setSubmitted(true);
    if (onShowToast) {
      onShowToast({
        title: 'Concierge Request Received',
        message: `Thank you ${inquiryData.name}. Our Head of Concierge will contact you within 2 hours.`,
        type: 'success'
      });
    }

    setInquiryData({
      name: '',
      email: '',
      serviceType: 'Private Butler',
      destination: 'Tokyo, Japan',
      notes: ''
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const VIP_SERVICES = [
    {
      icon: <Crown size={28} className="gold-icon" />,
      title: '24/7 Royal Butler & Valet',
      description:
        'Trained in the highest British and Japanese hospitality traditions. Unpacking, bespoke evening garments preparation, and personalized daily care.'
    },
    {
      icon: <Car size={28} className="gold-icon" />,
      title: 'Mercedes-Maybach & Jet Transfers',
      description:
        'Chauffeured tarmac-side airport pickups in bulletproof Mercedes-Maybach or Range Rover SV vehicles, plus chartered seaplane transfers in the Maldives.'
    },
    {
      icon: <UtensilsCrossed size={28} className="gold-icon" />,
      title: 'In-Suite Michelin Culinary Arts',
      description:
        'Private multi-course omakase or Italian Mediterranean banquets prepared right in your penthouse kitchen with grand cru sommelier pairings.'
    },
    {
      icon: <Waves size={28} className="gold-icon" />,
      title: 'Private Yacht & Sea Charters',
      description:
        'Exclusive Riva and Sunseeker yacht charters along the Amalfi coastline and Maldivian atolls, complete with onboard private chef and diving masters.'
    },
    {
      icon: <HeartHandshake size={28} className="gold-icon" />,
      title: 'Holistic Thermal Spas & Healing',
      description:
        'Private sound healing, in-suite aromatherapy, custom Ayurvedic treatments, and direct access to mineral thermal springs and volcanic hot baths.'
    },
    {
      icon: <Clock size={28} className="gold-icon" />,
      title: 'Unrestricted Flexible Privileges',
      description:
        'Guaranteed early check-in at dawn, late checkout until dusk, no-penalty cancellation up to 48 hours, and 100% bespoke room scent customization.'
    }
  ];

  return (
    <div className="services-page-root animate-fade-in">
      {/* Hero Header */}
      <section className="services-hero">
        <div className="container">
          <div className="hero-pill-badge">
            <Sparkles size={14} className="gold-icon" />
            <span>TR GROUPS BESPOKE HOSPITALITY</span>
          </div>
          <h1 className="services-page-title">
            Uncompromising Standards. <br />
            <span className="gold-gradient-text">Exceptional Privileges.</span>
          </h1>
          <p className="services-page-subtitle">
            Every stay at TR GROUPS is crafted without compromise. Discover our signature services,
            from private aviation escorts to Michelin-star dining served in the privacy of your suite.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container services-grid-section">
        <div className="services-grid">
          {VIP_SERVICES.map((serv, idx) => (
            <div key={idx} className="service-card glass-panel">
              <div className="service-icon-box">{serv.icon}</div>
              <h3 className="service-title">{serv.title}</h3>
              <p className="service-description">{serv.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Concierge Inquiry Box */}
      <section className="container concierge-inquiry-section">
        <div className="concierge-inquiry-card glass-panel">
          <div className="concierge-inquiry-header">
            <span className="badge badge-gold">Special Request Desk</span>
            <h2>Direct VIP Concierge Inquiry</h2>
            <p>
              Planning a high-profile stay, romantic proposal, or corporate retreat?
              Our Chief Concierge is at your disposal 24/7.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="concierge-form">
            <div className="form-row-two">
              <div className="form-group">
                <label>Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Lord Alexander Wright"
                  value={inquiryData.name}
                  onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                  className="booking-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Contact Email</label>
                <input
                  type="email"
                  placeholder="alexander@luxury.com"
                  value={inquiryData.email}
                  onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                  className="booking-input"
                  required
                />
              </div>
            </div>

            <div className="form-row-two">
              <div className="form-group">
                <label>Requested Service</label>
                <select
                  value={inquiryData.serviceType}
                  onChange={(e) => setInquiryData({ ...inquiryData, serviceType: e.target.value })}
                  className="luxury-select"
                >
                  <option value="Private Butler">Dedicated 24/7 Royal Butler</option>
                  <option value="Chauffeur & Aviation">Mercedes-Maybach / Jet Transfer</option>
                  <option value="Michelin Dining">In-Suite Private Michelin Chef</option>
                  <option value="Yacht Charter">Private Yacht / Sea Charter</option>
                  <option value="Spa Wellness">Ayurvedic & Thermal Spa Treatment</option>
                  <option value="Other Bespoke">Other Bespoke Requirement</option>
                </select>
              </div>

              <div className="form-group">
                <label>Destination</label>
                <select
                  value={inquiryData.destination}
                  onChange={(e) => setInquiryData({ ...inquiryData, destination: e.target.value })}
                  className="luxury-select"
                >
                  <option value="Tokyo, Japan">Tokyo • The Obsidian Tower</option>
                  <option value="Maldives">Maldives • Grand Azure Resort</option>
                  <option value="Amalfi Coast">Amalfi Coast • Riviera Haven</option>
                  <option value="New York">New York • Manhattan Reserve</option>
                  <option value="Bali">Bali Ubud • Lumina Sanctuary</option>
                  <option value="Swiss Alps">Swiss Alps • St. Moritz Crest</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Special Requests or Itinerary Details</label>
              <textarea
                rows="4"
                placeholder="Describe your desired dates, champagne preferences, dietary restrictions, or event requirements..."
                value={inquiryData.notes}
                onChange={(e) => setInquiryData({ ...inquiryData, notes: e.target.value })}
                className="booking-textarea"
              ></textarea>
            </div>

            <button type="submit" className="btn-gold concierge-submit-btn">
              <Send size={16} />
              <span>{submitted ? 'Inquiry Sent' : 'Submit VIP Concierge Request'}</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
