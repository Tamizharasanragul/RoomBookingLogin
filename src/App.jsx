import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RoomDetailsModal from './components/RoomDetailsModal';
import BookingModal from './components/BookingModal';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import DestinationsPage from './pages/DestinationsPage';
import ServicesPage from './pages/ServicesPage';
import BookingsPage from './pages/BookingsPage';
import ContactPage from './pages/ContactPage';
import AuthPage from './pages/AuthPage';

import { ROOMS_DATA } from './data/rooms';
import { INITIAL_ROOM_UNITS } from './data/inventory';
import { getTodayDateString, calculateNights } from './utils/dates';
import './App.css';

export default function App() {
  const navigate = useNavigate();

  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('tr_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('tr_theme') || 'dark';
  });

  // Currency state
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('tr_currency') || 'USD';
  });

  // Live Room Inventory Units State (Track vacancies & bookings)
  const [roomUnits, setRoomUnits] = useState(() => {
    try {
      const saved = localStorage.getItem('tr_room_units');
      return saved ? JSON.parse(saved) : INITIAL_ROOM_UNITS;
    } catch {
      return INITIAL_ROOM_UNITS;
    }
  });

  // Search & Filter state
  const [searchDestination, setSearchDestination] = useState('All Destinations');
  const [checkInDate, setCheckInDate] = useState(() => getTodayDateString(1));
  const [checkOutDate, setCheckOutDate] = useState(() => getTodayDateString(4));
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [selectedCategory, setSelectedCategory] = useState('All Rooms');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState(1500);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState('recommended');

  // Wishlist and Bookings state (persisted in localStorage)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('tr_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('tr_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals state
  const [detailsRoom, setDetailsRoom] = useState(null);
  const [bookingRoom, setBookingRoom] = useState(null);

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  // Sync theme to root html element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('tr_theme', theme);
  }, [theme]);

  // Sync currency to localStorage
  useEffect(() => {
    localStorage.setItem('tr_currency', currency);
  }, [currency]);

  // Sync roomUnits to localStorage
  useEffect(() => {
    localStorage.setItem('tr_room_units', JSON.stringify(roomUnits));
  }, [roomUnits]);

  // Sync wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('tr_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync bookings to localStorage
  useEffect(() => {
    localStorage.setItem('tr_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Auth Handlers
  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('tr_auth_user', JSON.stringify(userData));
    if (userData.token) {
      localStorage.setItem('tr_auth_token', userData.token);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('tr_auth_user');
    localStorage.removeItem('tr_auth_token');
    showToast({
      title: 'Signed Out',
      message: 'You have been logged out safely.',
      type: 'info'
    });
    navigate('/');
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Toast helper
  const showToast = ({ title, message, type = 'success' }) => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Wishlist actions
  const toggleWishlist = (room) => {
    const exists = wishlist.some((item) => item.id === room.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== room.id));
      showToast({
        title: 'Removed from Saved',
        message: `${room.title} was removed from your wishlist.`,
        type: 'info'
      });
    } else {
      setWishlist((prev) => [...prev, room]);
      showToast({
        title: 'Saved to Wishlist',
        message: `${room.title} has been bookmarked.`,
        type: 'success'
      });
    }
  };

  const removeFromWishlist = (roomId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== roomId));
    showToast({
      title: 'Removed from Saved',
      message: 'Suite removed from your wishlist.',
      type: 'info'
    });
  };

  // Booking handlers - Synchronizes both Bookings and Room Units Inventory!
  const handleBookingSuccess = (newBooking) => {
    setBookings((prev) => [newBooking, ...prev]);

    // Find and occupy a vacant unit of this room type in the live dashboard
    setRoomUnits((prevUnits) => {
      let assigned = false;
      return prevUnits.map((unit) => {
        if (!assigned && unit.roomId === newBooking.room.id && unit.status === 'vacant') {
          assigned = true;
          return {
            ...unit,
            status: 'occupied',
            bookingDetails: {
              bookingRef: newBooking.bookingId,
              guestName: `${newBooking.guestInfo.firstName} ${newBooking.guestInfo.lastName}`,
              checkIn: newBooking.checkIn,
              checkOut: newBooking.checkOut,
              nights: newBooking.nights,
              total: newBooking.pricing.grandTotal,
              phone: newBooking.guestInfo.phone
            }
          };
        }
        return unit;
      });
    });

    showToast({
      title: 'Reservation Confirmed!',
      message: `Suite ${newBooking.room.title} has been secured with Ref ${newBooking.bookingId}.`,
      type: 'success'
    });
  };

  const handleCancelBooking = (bookingId) => {
    setBookings((prev) => prev.filter((b) => b.bookingId !== bookingId));

    // Restore unit back to vacant in inventory
    setRoomUnits((prevUnits) =>
      prevUnits.map((unit) => {
        if (unit.bookingDetails && unit.bookingDetails.bookingRef === bookingId) {
          return {
            ...unit,
            status: 'vacant',
            bookingDetails: null
          };
        }
        return unit;
      })
    );

    showToast({
      title: 'Reservation Cancelled',
      message: `Reservation ${bookingId} has been cancelled and full refund processed. Room is now Vacant.`,
      type: 'info'
    });
  };

  // Reset Filters
  const resetFilters = () => {
    setSearchDestination('All Destinations');
    setSelectedCategory('All Rooms');
    setSearchQuery('');
    setPriceRange(1500);
    setSelectedAmenities([]);
    setSortBy('recommended');
    showToast({
      title: 'Filters Reset',
      message: 'Showing all curated luxury suites.',
      type: 'info'
    });
  };

  // Filtered & Sorted Rooms for Home Catalog
  const filteredRooms = useMemo(() => {
    const totalGuests = guests.adults + guests.children;

    return ROOMS_DATA.filter((room) => {
      // Destination filter
      if (searchDestination !== 'All Destinations') {
        const destMatch =
          room.city.toLowerCase() === searchDestination.toLowerCase() ||
          room.destination.toLowerCase().includes(searchDestination.toLowerCase());
        if (!destMatch) return false;
      }

      // Category filter
      if (selectedCategory !== 'All Rooms') {
        if (room.category !== selectedCategory) return false;
      }

      // Keyword query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = room.title.toLowerCase().includes(q);
        const matchesDesc = room.description.toLowerCase().includes(q);
        const matchesCity = room.city.toLowerCase().includes(q);
        const matchesHighlights = room.highlights.some((h) => h.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesCity && !matchesHighlights) {
          return false;
        }
      }

      // Price filter
      if (room.price > priceRange) {
        return false;
      }

      // Guest capacity filter
      if (room.maxGuests < totalGuests) {
        return false;
      }

      // Amenities filter
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every((amenity) =>
          room.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // recommended order
    });
  }, [
    searchDestination,
    selectedCategory,
    searchQuery,
    priceRange,
    guests,
    selectedAmenities,
    sortBy
  ]);

  const nights = calculateNights(checkInDate, checkOutDate);
  const vacantCount = roomUnits.filter((u) => u.status === 'vacant').length;

  return (
    <div className="app-root">
      {/* Toast Notification Layer */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Top Navigation Bar with Live Vacancies Badge & Auth */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        currency={currency}
        setCurrency={setCurrency}
        wishlistCount={wishlist.length}
        bookingsCount={bookings.length}
        vacantCount={vacantCount}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Multi-Page Route Switcher */}
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              searchDestination={searchDestination}
              setSearchDestination={setSearchDestination}
              checkInDate={checkInDate}
              setCheckInDate={setCheckInDate}
              checkOutDate={checkOutDate}
              setCheckOutDate={setCheckOutDate}
              guests={guests}
              setGuests={setGuests}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedAmenities={selectedAmenities}
              setSelectedAmenities={setSelectedAmenities}
              sortBy={sortBy}
              setSortBy={setSortBy}
              currency={currency}
              filteredRooms={filteredRooms}
              nights={nights}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              onSelectRoom={(r) => setDetailsRoom(r)}
              onBookNow={(r) => setBookingRoom(r)}
              resetFilters={resetFilters}
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            <DashboardPage
              roomUnits={roomUnits}
              setRoomUnits={setRoomUnits}
              currency={currency}
              onShowToast={showToast}
              onNavigateToBooking={() => navigate('/')}
            />
          }
        />

        <Route
          path="/register"
          element={
            <AuthPage
              onLoginSuccess={handleLoginSuccess}
              onShowToast={showToast}
            />
          }
        />

        <Route
          path="/login"
          element={
            <AuthPage
              onLoginSuccess={handleLoginSuccess}
              onShowToast={showToast}
            />
          }
        />

        <Route
          path="/destinations"
          element={
            <DestinationsPage
              currency={currency}
              onSelectDestination={(destName) => {
                setSearchDestination(destName);
              }}
            />
          }
        />

        <Route
          path="/services"
          element={<ServicesPage onShowToast={showToast} />}
        />

        <Route
          path="/bookings"
          element={
            <BookingsPage
              bookings={bookings}
              wishlist={wishlist}
              currency={currency}
              onCancelBooking={handleCancelBooking}
              onRemoveFromWishlist={removeFromWishlist}
              onBookRoom={(room) => setBookingRoom(room)}
            />
          }
        />

        <Route
          path="/contact"
          element={<ContactPage onShowToast={showToast} />}
        />
      </Routes>

      {/* Room Details Modal */}
      {detailsRoom && (
        <RoomDetailsModal
          room={detailsRoom}
          currency={currency}
          nights={nights}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          isWishlisted={wishlist.some((item) => item.id === detailsRoom.id)}
          onToggleWishlist={toggleWishlist}
          onClose={() => setDetailsRoom(null)}
          onBookNow={(room) => {
            setDetailsRoom(null);
            setBookingRoom(room);
          }}
        />
      )}

      {/* Interactive Booking Modal */}
      {bookingRoom && (
        <BookingModal
          room={bookingRoom}
          currency={currency}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          guests={guests}
          onClose={() => setBookingRoom(null)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* Footer */}
      <Footer onShowToast={showToast} />
    </div>
  );
}
