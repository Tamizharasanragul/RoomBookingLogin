import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Footer({ onShowToast }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    if (onShowToast) {
      onShowToast({
        title: 'VIP Membership Confirmed',
        message: 'You have been added to our exclusive private suite release list.',
        type: 'success'
      });
    }
    setNewsletterEmail('');
  };

  return (
    <footer className="footer-root">
      <div className="container">
        {/* Newsletter Banner */}
        <div className="footer-newsletter-box glass-panel">
          <div className="newsletter-text">
            <span className="badge badge-gold">TR GROUPS PRIVÉ CLUB</span>
            <h3>Receive Private Suite Releases & Curated Escapes</h3>
            <p>Subscribe for unlisted presidential retreats, seasonal culinary invitations, and 20% privilege codes.</p>
          </div>

          <form onSubmit={handleSubscribe} className="newsletter-form">
            <div className="newsletter-input-wrap">
              <Mail size={18} className="gold-icon" />
              <input
                type="email"
                placeholder="Enter your personal email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-gold newsletter-submit-btn">
              <span>{subscribed ? 'Subscribed' : 'Join TR Privé'}</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>

        {/* Main Footer Links */}
        <div className="footer-links-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-brand-logo">
              <div className="brand-logo-crest mini-crest">
                <span className="brand-crest-letters">TR</span>
              </div>
              <span className="footer-brand-text">TR GROUPS</span>
            </Link>
            <p className="footer-about-text">
              Curating exceptional architectural masterpieces and five-star hospitality across six
              continents. Designed for individuals who demand perfection in every horizon.
            </p>
            <div className="footer-cert-badges">
              <span className="badge badge-gold">
                <ShieldCheck size={13} />
                Five-Star Global Hospitality Council
              </span>
            </div>
          </div>

          {/* Destinations */}
          <div className="footer-col">
            <h4 className="footer-col-title">Signature Horizons</h4>
            <ul className="footer-links-list">
              <li><Link to="/destinations">Tokyo • The Obsidian Tower</Link></li>
              <li><Link to="/destinations">Maldives • Grand Azure Resort</Link></li>
              <li><Link to="/destinations">Amalfi Coast • Riviera Haven</Link></li>
              <li><Link to="/destinations">Manhattan • New York Reserve</Link></li>
              <li><Link to="/destinations">Bali • Lumina Sanctuary Ubud</Link></li>
              <li><Link to="/destinations">Swiss Alps • St. Moritz Crest</Link></li>
            </ul>
          </div>

          {/* Guest Services */}
          <div className="footer-col">
            <h4 className="footer-col-title">Bespoke Privileges</h4>
            <ul className="footer-links-list">
              <li><Link to="/services">24/7 Private Butler Desk</Link></li>
              <li><Link to="/services">Private Jet & Yacht Charters</Link></li>
              <li><Link to="/services">Michelin In-Suite Banquets</Link></li>
              <li><Link to="/services">Holistic Thermal Spas</Link></li>
              <li><Link to="/bookings">Manage My Bookings</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-col-title">Direct Reservations</h4>
            <div className="footer-contact-item">
              <Phone size={16} className="gold-icon" />
              <span>+1 (800) 890-TRGP (VIP Line)</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={16} className="gold-icon" />
              <span>concierge@trgroups.com</span>
            </div>
            <div className="footer-contact-item">
              <MapPin size={16} className="gold-icon" />
              <span>TR GROUPS Hospitality Tower</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} TR GROUPS International Hotels & Resorts Inc. All Rights Reserved.</p>
          <div className="footer-legal-links">
            <Link to="/contact">Privacy Policy</Link>
            <span className="sep">•</span>
            <Link to="/contact">Terms of Hospitality</Link>
            <span className="sep">•</span>
            <Link to="/contact">Best Rate Guarantee</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
