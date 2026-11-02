import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  DoorOpen,
  BedDouble,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Search,
  Filter,
  DollarSign,
  Calendar,
  Users,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Plus,
  LogOut,
  MapPin,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { formatPrice } from '../utils/currency';
import { formatDisplayDate, getTodayDateString } from '../utils/dates';

export default function DashboardPage({
  roomUnits,
  setRoomUnits,
  currency,
  onShowToast,
  onNavigateToBooking
}) {
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'vacant' | 'occupied' | 'maintenance'
  const [destinationFilter, setDestinationFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickCheckInUnit, setQuickCheckInUnit] = useState(null);
  const [quickGuestName, setQuickGuestName] = useState('');
  const [quickNights, setQuickNights] = useState(3);

  // Metrics Calculations
  const totalUnits = roomUnits.length;
  const occupiedUnits = roomUnits.filter((u) => u.status === 'occupied').length;
  const vacantUnits = roomUnits.filter((u) => u.status === 'vacant').length;
  const maintenanceUnits = roomUnits.filter((u) => u.status === 'maintenance').length;

  const occupancyRate = totalUnits > 0 ? ((occupiedUnits / totalUnits) * 100).toFixed(1) : 0;
  const vacancyRate = totalUnits > 0 ? ((vacantUnits / totalUnits) * 100).toFixed(1) : 0;

  const totalRevenue = useMemo(() => {
    return roomUnits.reduce((acc, u) => {
      if (u.status === 'occupied' && u.bookingDetails) {
        return acc + (u.bookingDetails.total || u.price * (u.bookingDetails.nights || 1));
      }
      return acc;
    }, 0);
  }, [roomUnits]);

  // Breakdown by Destination
  const destinationBreakdown = useMemo(() => {
    const map = {};
    roomUnits.forEach((u) => {
      if (!map[u.city]) {
        map[u.city] = { total: 0, occupied: 0, vacant: 0 };
      }
      map[u.city].total += 1;
      if (u.status === 'occupied') map[u.city].occupied += 1;
      if (u.status === 'vacant') map[u.city].vacant += 1;
    });
    return map;
  }, [roomUnits]);

  // Filtered Room Units
  const filteredUnits = useMemo(() => {
    return roomUnits.filter((u) => {
      // Status filter
      if (statusFilter !== 'all' && u.status !== statusFilter) return false;

      // Destination filter
      if (destinationFilter !== 'All' && u.city !== destinationFilter) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesUnit = u.unitNumber.toLowerCase().includes(q);
        const matchesTitle = u.title.toLowerCase().includes(q);
        const matchesCity = u.city.toLowerCase().includes(q);
        const matchesGuest =
          u.bookingDetails && u.bookingDetails.guestName.toLowerCase().includes(q);
        const matchesRef =
          u.bookingDetails && u.bookingDetails.bookingRef.toLowerCase().includes(q);

        if (!matchesUnit && !matchesTitle && !matchesCity && !matchesGuest && !matchesRef) {
          return false;
        }
      }

      return true;
    });
  }, [roomUnits, statusFilter, destinationFilter, searchQuery]);

  // Action: Check-out guest (Frees up unit -> Vacant)
  const handleCheckOut = (unitId) => {
    setRoomUnits((prev) =>
      prev.map((u) => {
        if (u.id === unitId) {
          return {
            ...u,
            status: 'vacant',
            bookingDetails: null
          };
        }
        return u;
      })
    );

    if (onShowToast) {
      onShowToast({
        title: 'Guest Checked Out',
        message: `${unitId} has been vacated and is now Available for new reservations.`,
        type: 'success'
      });
    }
  };

  // Action: Toggle Maintenance
  const handleToggleMaintenance = (unitId) => {
    setRoomUnits((prev) =>
      prev.map((u) => {
        if (u.id === unitId) {
          const nextStatus = u.status === 'maintenance' ? 'vacant' : 'maintenance';
          return {
            ...u,
            status: nextStatus,
            bookingDetails: nextStatus === 'maintenance' ? null : u.bookingDetails
          };
        }
        return u;
      })
    );
  };

  // Action: Quick Reserve from Dashboard
  const handleConfirmQuickCheckIn = (e) => {
    e.preventDefault();
    if (!quickCheckInUnit || !quickGuestName.trim()) return;

    const checkInDate = getTodayDateString(0);
    const checkOutDate = getTodayDateString(quickNights);
    const cost = quickCheckInUnit.price * quickNights;
    const taxes = Math.round(cost * 0.12);
    const total = cost + taxes;
    const bookingRef = `TR-${Math.floor(10000 + Math.random() * 90000)}-${quickCheckInUnit.city.slice(0, 2).toUpperCase()}`;

    setRoomUnits((prev) =>
      prev.map((u) => {
        if (u.id === quickCheckInUnit.id) {
          return {
            ...u,
            status: 'occupied',
            bookingDetails: {
              bookingRef,
              guestName: quickGuestName.trim(),
              checkIn: checkInDate,
              checkOut: checkOutDate,
              nights: quickNights,
              total,
              phone: '+1 (555) VIP-ROOM'
            }
          };
        }
        return u;
      })
    );

    if (onShowToast) {
      onShowToast({
        title: 'Suite Reserved Successfully',
        message: `${quickCheckInUnit.unitNumber} assigned to ${quickGuestName} (Ref ${bookingRef}).`,
        type: 'success'
      });
    }

    setQuickCheckInUnit(null);
    setQuickGuestName('');
    setQuickNights(3);
  };

  return (
    <div className="dashboard-page-root animate-fade-in">
      {/* Dashboard Top Header */}
      <section className="dashboard-hero-header">
        <div className="container">
          <div className="dashboard-header-flex">
            <div>
              <div className="hero-pill-badge">
                <LayoutDashboard size={14} className="gold-icon" />
                <span>HOTEL INVENTORY & VACANCY MANAGEMENT SYSTEM</span>
              </div>
              <h1 className="dashboard-title">
                Occupancy & <span className="gold-gradient-text">Vacancy Live Dashboard</span>
              </h1>
              <p className="dashboard-subtitle">
                Real-time tracking of booked suites, available vacancies, guest check-ins, and hotel revenue across TR GROUPS global residences.
              </p>
            </div>

            <div className="dashboard-header-actions">
              <button
                className="btn-gold"
                onClick={onNavigateToBooking}
              >
                <Plus size={16} />
                <span>Book New Residence</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container dashboard-main-content">
        {/* KPI Metric Cards */}
        <div className="dashboard-metrics-grid">
          {/* Card 1: Total Rooms */}
          <div className="metric-card glass-panel">
            <div className="metric-card-header">
              <span className="metric-card-label">Total Suite Units</span>
              <div className="metric-card-icon-box bg-gold-subtle">
                <BedDouble size={20} className="gold-icon" />
              </div>
            </div>
            <div className="metric-card-main-val">{totalUnits}</div>
            <div className="metric-card-subtext">
              Across 6 international locations
            </div>
          </div>

          {/* Card 2: Available Vacancies (CRUCIAL FOR USER) */}
          <div className="metric-card glass-panel metric-card-vacant">
            <div className="metric-card-header">
              <span className="metric-card-label">Available Vacancies</span>
              <div className="metric-card-icon-box bg-emerald-subtle">
                <DoorOpen size={20} className="emerald-icon" />
              </div>
            </div>
            <div className="metric-card-main-val text-emerald">
              {vacantUnits} <span className="val-sub">Vacant</span>
            </div>
            <div className="metric-card-subtext">
              <strong>{vacancyRate}%</strong> of inventory ready for booking
            </div>
          </div>

          {/* Card 3: Currently Booked / Occupied (CRUCIAL FOR USER) */}
          <div className="metric-card glass-panel metric-card-occupied">
            <div className="metric-card-header">
              <span className="metric-card-label">Currently Booked</span>
              <div className="metric-card-icon-box bg-rose-subtle">
                <Users size={20} className="rose-icon" />
              </div>
            </div>
            <div className="metric-card-main-val text-rose">
              {occupiedUnits} <span className="val-sub">Occupied</span>
            </div>
            <div className="metric-card-subtext">
              <strong>{occupancyRate}%</strong> current hotel occupancy
            </div>
          </div>

          {/* Card 4: Live Total Revenue */}
          <div className="metric-card glass-panel">
            <div className="metric-card-header">
              <span className="metric-card-label">Active Stays Revenue</span>
              <div className="metric-card-icon-box bg-gold-subtle">
                <DollarSign size={20} className="gold-icon" />
              </div>
            </div>
            <div className="metric-card-main-val gold-gradient-text">
              {formatPrice(totalRevenue, currency)}
            </div>
            <div className="metric-card-subtext">
              From {occupiedUnits} active guest stays
            </div>
          </div>
        </div>

        {/* Vacancy Distribution Progress Bars */}
        <div className="destinations-occupancy-card glass-panel">
          <div className="card-header-row">
            <div>
              <h3>Vacancies & Occupancy by Destination</h3>
              <p>Live inventory breakdown across each luxury property horizon</p>
            </div>
            <div className="live-pulse-badge">
              <span className="pulse-dot"></span>
              <span>LIVE PMS SYNC</span>
            </div>
          </div>

          <div className="dest-progress-grid">
            {Object.keys(destinationBreakdown).map((city) => {
              const data = destinationBreakdown[city];
              const pct = data.total > 0 ? Math.round((data.occupied / data.total) * 100) : 0;
              return (
                <div key={city} className="dest-progress-item">
                  <div className="dest-progress-label-row">
                    <strong>{city}</strong>
                    <span className="dest-progress-stat">
                      <span className="text-emerald">{data.vacant} Vacant</span> /{' '}
                      <span className="text-rose">{data.occupied} Booked</span> ({pct}%)
                    </span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter and Search Bar for Table */}
        <div className="table-controls-bar glass-panel">
          {/* Status Tabs */}
          <div className="status-filter-tabs">
            <button
              className={`status-tab ${statusFilter === 'all' ? 'active' : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              All Suites ({totalUnits})
            </button>

            <button
              className={`status-tab status-tab-vacant ${statusFilter === 'vacant' ? 'active' : ''}`}
              onClick={() => setStatusFilter('vacant')}
            >
              <DoorOpen size={15} />
              <span>Vacant / Available ({vacantUnits})</span>
            </button>

            <button
              className={`status-tab status-tab-occupied ${statusFilter === 'occupied' ? 'active' : ''}`}
              onClick={() => setStatusFilter('occupied')}
            >
              <Users size={15} />
              <span>Booked ({occupiedUnits})</span>
            </button>

            <button
              className={`status-tab ${statusFilter === 'maintenance' ? 'active' : ''}`}
              onClick={() => setStatusFilter('maintenance')}
            >
              <AlertTriangle size={15} />
              <span>Turn-Down ({maintenanceUnits})</span>
            </button>
          </div>

          {/* Search & Location Select */}
          <div className="table-search-group">
            <div className="table-search-box">
              <Search size={15} className="search-icon-muted" />
              <input
                type="text"
                placeholder="Search unit #, guest name, ref..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="table-search-input"
              />
            </div>

            <select
              value={destinationFilter}
              onChange={(e) => setDestinationFilter(e.target.value)}
              className="table-dest-select"
            >
              <option value="All">All Locations</option>
              <option value="Tokyo">Tokyo</option>
              <option value="Maldives">Maldives</option>
              <option value="Amalfi Coast">Amalfi Coast</option>
              <option value="New York">New York</option>
              <option value="Bali">Bali</option>
              <option value="Swiss Alps">Swiss Alps</option>
            </select>
          </div>
        </div>

        {/* Main Room Units Inventory Table */}
        <div className="table-wrapper glass-panel">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Suite & Unit Number</th>
                <th>Location & Floor</th>
                <th>Status</th>
                <th>Guest & Reservation Details</th>
                <th>Nightly Rate</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUnits.length === 0 ? (
                <tr>
                  <td colSpan="6" className="table-empty-td">
                    <div className="table-empty-state">
                      <Search size={32} className="gold-icon" />
                      <h4>No Room Units Found</h4>
                      <p>Try clearing your status or location filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUnits.map((unit) => {
                  const isOccupied = unit.status === 'occupied';
                  const isVacant = unit.status === 'vacant';
                  const isMaintenance = unit.status === 'maintenance';

                  return (
                    <tr key={unit.id} className={`table-row-${unit.status}`}>
                      {/* Unit & Title */}
                      <td>
                        <div className="unit-name-cell">
                          <span className="unit-badge-pill">{unit.unitNumber}</span>
                          <div className="unit-title-meta">
                            <strong>{unit.title}</strong>
                            <span className="unit-category">{unit.category}</span>
                          </div>
                        </div>
                      </td>

                      {/* Location & Floor */}
                      <td>
                        <div className="unit-location-cell">
                          <div className="loc-row">
                            <MapPin size={13} className="gold-icon" />
                            <span>{unit.destination}</span>
                          </div>
                          <span className="unit-floor-text">{unit.floor}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td>
                        {isOccupied && (
                          <span className="badge badge-rose">
                            <Users size={12} />
                            Occupied / Booked
                          </span>
                        )}
                        {isVacant && (
                          <span className="badge badge-emerald">
                            <CheckCircle2 size={12} />
                            Vacant (Ready)
                          </span>
                        )}
                        {isMaintenance && (
                          <span className="badge badge-gold">
                            <AlertTriangle size={12} />
                            Turn-Down / Clean
                          </span>
                        )}
                      </td>

                      {/* Guest & Reservation */}
                      <td>
                        {isOccupied && unit.bookingDetails ? (
                          <div className="table-booking-info">
                            <strong className="guest-name-text">
                              {unit.bookingDetails.guestName}
                            </strong>
                            <div className="dates-range-sub">
                              <Calendar size={12} className="gold-icon" />
                              <span>
                                {formatDisplayDate(unit.bookingDetails.checkIn)} →{' '}
                                {formatDisplayDate(unit.bookingDetails.checkOut)} ({unit.bookingDetails.nights}n)
                              </span>
                            </div>
                            <span className="booking-ref-tag">
                              Ref: {unit.bookingDetails.bookingRef}
                            </span>
                          </div>
                        ) : isVacant ? (
                          <div className="vacant-ready-text">
                            <span className="text-emerald">● Cleaned & Inspected</span>
                            <span className="sub-ready">Available for Instant Reservation</span>
                          </div>
                        ) : (
                          <span className="text-subtle">Under Maintenance / Linen Change</span>
                        )}
                      </td>

                      {/* Rate */}
                      <td>
                        <strong className="gold-gradient-text table-rate">
                          {formatPrice(unit.price, currency)}
                        </strong>
                        <span className="table-rate-unit"> / night</span>
                      </td>

                      {/* Actions */}
                      <td style={{ textAlign: 'right' }}>
                        <div className="table-actions-cell">
                          {isOccupied && (
                            <button
                              className="btn-ghost checkout-btn"
                              onClick={() => handleCheckOut(unit.id)}
                              title="Check Out Guest (Frees up Room)"
                            >
                              <LogOut size={14} />
                              <span>Check Out</span>
                            </button>
                          )}

                          {isVacant && (
                            <button
                              className="btn-gold quick-reserve-btn"
                              onClick={() => setQuickCheckInUnit(unit)}
                              title="Quickly assign a guest reservation"
                            >
                              <Plus size={14} />
                              <span>Quick Book</span>
                            </button>
                          )}

                          <button
                            className="btn-ghost toggle-maint-btn"
                            onClick={() => handleToggleMaintenance(unit.id)}
                            title={isMaintenance ? 'Mark as Vacant' : 'Mark for Cleaning'}
                          >
                            <RotateCcw size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Check-in Modal */}
      {quickCheckInUnit && (
        <div className="modal-backdrop" onClick={() => setQuickCheckInUnit(null)}>
          <div
            className="modal-container quick-checkin-modal glass-panel animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="quick-checkin-header">
              <span className="badge badge-emerald">Quick PMS Reservation</span>
              <h3>Check-In Guest to {quickCheckInUnit.unitNumber}</h3>
              <p>{quickCheckInUnit.title} • {quickCheckInUnit.destination}</p>
            </div>

            <form onSubmit={handleConfirmQuickCheckIn} className="quick-checkin-form">
              <div className="form-group">
                <label>Guest Full Name <span className="req">*</span></label>
                <input
                  type="text"
                  placeholder="e.g. Duke William Montgomery"
                  value={quickGuestName}
                  onChange={(e) => setQuickGuestName(e.target.value)}
                  className="booking-input"
                  required
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label>Duration of Stay (Nights)</label>
                <div className="stepper-controls" style={{ justifyContent: 'flex-start' }}>
                  <button
                    type="button"
                    className="stepper-btn"
                    disabled={quickNights <= 1}
                    onClick={() => setQuickNights(quickNights - 1)}
                  >
                    -
                  </button>
                  <span className="stepper-val" style={{ fontSize: '1.2rem', padding: '0 1rem' }}>
                    {quickNights} {quickNights === 1 ? 'Night' : 'Nights'}
                  </span>
                  <button
                    type="button"
                    className="stepper-btn"
                    disabled={quickNights >= 14}
                    onClick={() => setQuickNights(quickNights + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="quick-checkin-pricing-preview glass-panel">
                <div className="preview-row">
                  <span>Nightly Rate:</span>
                  <strong>{formatPrice(quickCheckInUnit.price, currency)}</strong>
                </div>
                <div className="preview-row">
                  <span>Total Due (incl. tax):</span>
                  <strong className="gold-gradient-text" style={{ fontSize: '1.25rem' }}>
                    {formatPrice(Math.round(quickCheckInUnit.price * quickNights * 1.12), currency)}
                  </strong>
                </div>
              </div>

              <div className="quick-checkin-actions">
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => setQuickCheckInUnit(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-gold">
                  <CheckCircle2 size={16} />
                  <span>Confirm Check-In & Mark Occupied</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
