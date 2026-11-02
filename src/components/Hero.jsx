import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Award, Clock, ShieldCheck, ArrowRight, Compass } from 'lucide-react';

export default function Hero({ onExploreClick }) {
  return (
    <section className="hero-root">
      {/* Background with Dark/Gold Overlay */}
      <div className="hero-bg-container">
        <img
          src="/images/hero.jpg"
          alt="TR GROUPS Luxury Hotels & Suites"
          className="hero-bg-image"
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="container hero-content">
        <div className="hero-pill-badge">
          <Sparkles size={14} className="gold-icon" />
          <span>TR GROUPS PRIVATE RESIDENCES & VILLAS</span>
        </div>

        <h1 className="hero-heading">
          Where Architectural Grandeur <br />
          Meets <span className="gold-gradient-text">Timeless Luxury</span>
        </h1>

        <p className="hero-description">
          Discover a curated constellation of private overwater villas, penthouse sanctuaries,
          and cliffside retreats across six continents. Handcrafted for discerning travelers.
        </p>

        <div className="hero-actions">
          <button className="btn-gold hero-btn" onClick={onExploreClick}>
            <span>Explore Available Suites</span>
            <ArrowRight size={18} />
          </button>
          <Link to="/destinations" className="btn-outline-gold hero-btn-secondary">
            <Compass size={18} />
            <span>Discover Horizons</span>
          </Link>
        </div>

        {/* Floating Perks Banner */}
        <div className="hero-perks-strip glass-panel">
          <div className="perk-item">
            <div className="perk-icon-box">
              <Award size={20} className="gold-icon" />
            </div>
            <div className="perk-text">
              <strong>100% Five-Star Verified</strong>
              <span>Handpicked luxury standards</span>
            </div>
          </div>

          <div className="perk-divider"></div>

          <div className="perk-item">
            <div className="perk-icon-box">
              <Clock size={20} className="gold-icon" />
            </div>
            <div className="perk-text">
              <strong>24/7 Dedicated Butler</strong>
              <span>Bespoke on-demand service</span>
            </div>
          </div>

          <div className="perk-divider"></div>

          <div className="perk-item">
            <div className="perk-icon-box">
              <ShieldCheck size={20} className="gold-icon" />
            </div>
            <div className="perk-text">
              <strong>Flexible Booking</strong>
              <span>Free cancellation up to 48 hrs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
