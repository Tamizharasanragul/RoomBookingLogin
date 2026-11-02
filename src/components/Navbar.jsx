import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Moon, Sun, Heart, Briefcase, LayoutDashboard, User, LogOut } from 'lucide-react';
import { CURRENCIES } from '../utils/currency';

export default function Navbar({
  theme,
  toggleTheme,
  currency,
  setCurrency,
  wishlistCount,
  bookingsCount,
  vacantCount = 0,
  currentUser,
  onLogout
}) {
  const navigate = useNavigate();

  return (
    <header className="navbar-root">
      <div className="container nav-container">
        {/* Brand Logo: TR GROUPS */}
        <Link to="/" className="nav-brand" aria-label="TR GROUPS Home">
          <div className="brand-logo-crest">
            <span className="brand-crest-letters">TR</span>
          </div>
          <div className="brand-text">
            <span className="brand-title">TR GROUPS</span>
            <span className="brand-subtitle">HOTELS & RESORTS</span>
          </div>
        </Link>

        {/* Real Route NavLinks */}
        <nav className="nav-links" aria-label="Main Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Suites & Villas
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) => `nav-link dashboard-nav-item ${isActive ? 'active' : ''}`}
          >
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
            <span className="nav-vacancies-pill" title="Live Available Vacancies">
              {vacantCount} Vacant
            </span>
          </NavLink>

          <NavLink
            to="/destinations"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Destinations
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Perks & Services
          </NavLink>

          <NavLink
            to="/bookings"
            className={({ isActive }) => `nav-link reservations-btn ${isActive ? 'active' : ''}`}
          >
            <Briefcase size={16} />
            <span>My Bookings</span>
            {bookingsCount > 0 && (
              <span className="nav-counter-badge">{bookingsCount}</span>
            )}
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Concierge
          </NavLink>
        </nav>

        {/* Right Controls */}
        <div className="nav-actions">
          {/* User Profile or Register/Login Button */}
          {currentUser ? (
            <div className="user-nav-chip">
              <div className="user-nav-avatar">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="user-nav-info">
                <span className="user-nav-name">{currentUser.name.split(' ')[0]}</span>
                <span className="user-nav-role">{currentUser.role || 'Guest'}</span>
              </div>
              <button
                className="user-logout-btn"
                onClick={onLogout}
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <Link
              to="/register"
              className="btn-outline-gold nav-auth-btn"
              title="Register a new account or Sign In"
            >
              <User size={15} />
              <span>Register / Sign In</span>
            </Link>
          )}

          {/* Multi-Currency Dropdown */}
          <div className="currency-selector-wrapper">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="currency-dropdown"
              aria-label="Select currency"
            >
              {Object.keys(CURRENCIES).map((currKey) => (
                <option key={currKey} value={currKey}>
                  {currKey} ({CURRENCIES[currKey].symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Wishlist Link with Counter */}
          <Link
            to="/bookings?tab=wishlist"
            className="nav-icon-btn"
            title="Saved Suites Wishlist"
            aria-label="Saved Wishlist"
          >
            <Heart size={19} className={wishlistCount > 0 ? 'heart-filled' : ''} />
            {wishlistCount > 0 && (
              <span className="nav-counter-badge pulse-badge">{wishlistCount}</span>
            )}
          </Link>

          {/* Theme Toggle Button */}
          <button
            className="nav-icon-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          {/* Primary CTA */}
          <button
            className="btn-gold nav-cta-btn"
            onClick={() => {
              navigate('/');
              setTimeout(() => {
                const searchSection = document.getElementById('search-section');
                if (searchSection) {
                  searchSection.scrollIntoView({ behavior: 'smooth' });
                }
              }, 100);
            }}
          >
            Book a Suite
          </button>
        </div>
      </div>
    </header>
  );
}
