import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  ChevronDown
} from 'lucide-react';

export default function ContactPage({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    channel: 'Email',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitted(true);
    if (onShowToast) {
      onShowToast({
        title: 'Message Dispatched',
        message: 'Your concierge inquiry has been delivered. A representative will respond promptly.',
        type: 'success'
      });
    }

    setFormData({
      name: '',
      email: '',
      phone: '',
      channel: 'Email',
      subject: 'General Inquiry',
      message: ''
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const FAQS = [
    {
      q: 'What are the check-in and check-out times across TR GROUPS residences?',
      a: 'Official check-in commences at 3:00 PM local time, and check-out is until 11:00 AM. Guaranteed early morning check-in and late afternoon check-out (until 4:00 PM) can be requested during booking.'
    },
    {
      q: 'What is the TR GROUPS cancellation and refund policy?',
      a: 'All direct reservations enjoy our flexible privilege policy: full 100% refund without cancellation penalties if cancelled at least 48 hours before scheduled check-in.'
    },
    {
      q: 'How do private airport chauffeur and seaplane transfers work?',
      a: 'Our VIP greeters welcome you right outside tarmac customs with luggage handling, providing chilled champagne and Wi-Fi aboard private Mercedes-Maybach vehicles or chartered seaplanes.'
    },
    {
      q: 'Can dietary preferences and private chefs be customized in-suite?',
      a: 'Yes. Upon booking, our culinary director connects with you to tailor daily menus, accommodating kosher, halal, vegan, gluten-free, or Michelin-curated degustation tasting menus.'
    }
  ];

  return (
    <div className="contact-page-root animate-fade-in">
      {/* Hero Header */}
      <section className="contact-hero">
        <div className="container">
          <div className="hero-pill-badge">
            <Sparkles size={14} className="gold-icon" />
            <span>24/7 VIP CONCIERGE DESK</span>
          </div>
          <h1 className="contact-page-title">
            Direct Concierge & <span className="gold-gradient-text">Headquarters</span>
          </h1>
          <p className="contact-page-subtitle">
            Whether inquiring about bespoke reservations, private aviation, or corporate retreats,
            our international hospitality directors are available around the clock.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="container contact-grid-section">
        <div className="contact-layout-grid">
          {/* Left: Contact Info & Desk Hours */}
          <div className="contact-info-col">
            <div className="contact-channel-card glass-panel">
              <div className="channel-item">
                <div className="channel-icon-box">
                  <Phone size={22} className="gold-icon" />
                </div>
                <div>
                  <span className="channel-label">Toll-Free International VIP Desk</span>
                  <strong>+1 (800) 890-TRGP</strong>
                  <span className="channel-note">Available 24/7 in English, French, Japanese</span>
                </div>
              </div>

              <div className="channel-divider"></div>

              <div className="channel-item">
                <div className="channel-icon-box">
                  <Mail size={22} className="gold-icon" />
                </div>
                <div>
                  <span className="channel-label">Executive Concierge Email</span>
                  <strong>concierge@trgroups.com</strong>
                  <span className="channel-note">Average response time: under 30 minutes</span>
                </div>
              </div>

              <div className="channel-divider"></div>

              <div className="channel-item">
                <div className="channel-icon-box">
                  <MapPin size={22} className="gold-icon" />
                </div>
                <div>
                  <span className="channel-label">Global Corporate Headquarters</span>
                  <strong>TR GROUPS International Hospitality Tower</strong>
                  <span className="channel-note">Tokyo • Zurich • New York • Dubai</span>
                </div>
              </div>
            </div>

            {/* Concierge Guarantee Badge */}
            <div className="concierge-badge-card glass-panel">
              <ShieldCheck size={28} className="gold-icon" />
              <div>
                <strong>The TR GROUPS Gold Standard</strong>
                <p>Every inquiry receives discrete, confidential attention from a dedicated hospitality officer.</p>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="contact-form-col glass-panel">
            <h3 className="form-card-title">Send a Direct Message</h3>
            <p className="form-card-subtitle">
              Fill in your details and our team will get in touch with you immediately.
            </p>

            <form onSubmit={handleSubmit} className="direct-contact-form">
              <div className="form-row-two">
                <div className="form-group">
                  <label>Your Name <span className="req">*</span></label>
                  <input
                    type="text"
                    placeholder="e.g. Lady Vivienne"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="booking-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address <span className="req">*</span></label>
                  <input
                    type="email"
                    placeholder="vivienne@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="booking-input"
                    required
                  />
                </div>
              </div>

              <div className="form-row-two">
                <div className="form-group">
                  <label>Phone / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 987-6543"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="booking-input"
                  />
                </div>

                <div className="form-group">
                  <label>Preferred Reply Channel</label>
                  <select
                    value={formData.channel}
                    onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                    className="luxury-select"
                  >
                    <option value="Email">Email</option>
                    <option value="Phone Call">Direct Phone Call</option>
                    <option value="WhatsApp">WhatsApp</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Inquiry Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="luxury-select"
                >
                  <option value="General Inquiry">General Residence Inquiry</option>
                  <option value="Private Jet or Yacht">Private Jet / Yacht Reservation</option>
                  <option value="Event or Wedding">Private Wedding / Executive Retreat</option>
                  <option value="Billing or Existing Booking">Existing Reservation Assistance</option>
                </select>
              </div>

              <div className="form-group">
                <label>Your Message <span className="req">*</span></label>
                <textarea
                  rows="4"
                  placeholder="Tell us about your requirements, travel dates, or special requests..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="booking-textarea"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-gold contact-submit-btn">
                <Send size={16} />
                <span>{submitted ? 'Message Dispatched' : 'Transmit Message to Concierge'}</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="container faqs-section">
        <div className="faqs-header">
          <span className="badge badge-gold">Frequently Clarified</span>
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="faqs-list">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className={`faq-item glass-panel ${isOpen ? 'open' : ''}`}
                onClick={() => setOpenFaq(isOpen ? null : idx)}
              >
                <div className="faq-question-row">
                  <strong>{faq.q}</strong>
                  <ChevronDown
                    size={18}
                    className={`faq-chevron ${isOpen ? 'rotated' : ''}`}
                  />
                </div>
                {isOpen && <p className="faq-answer-text">{faq.a}</p>}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
