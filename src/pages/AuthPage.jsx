import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  Phone,
  Shield,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { registerUserApi, loginUserApi } from '../utils/api';

export default function AuthPage({ onLoginSuccess, onShowToast }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Mode: 'register' or 'login'
  const initialMode = searchParams.get('mode') === 'login' ? 'login' : 'register';
  const [mode, setMode] = useState(initialMode);

  // Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'guest'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrorMessage('');
  };

  // Quick fill sample data for fast testing
  const handleQuickFill = (roleType) => {
    if (mode === 'register') {
      const randNum = Math.floor(100 + Math.random() * 900);
      setFormData({
        name: roleType === 'admin' ? 'Hotel Director Sterling' : 'Alexander Wright',
        email: roleType === 'admin' ? `admin${randNum}@trgroups.com` : `guest${randNum}@luxury.com`,
        password: 'Password123!',
        phone: '+1 (555) 019-2831',
        role: roleType
      });
    } else {
      setFormData({
        name: '',
        email: 'alexander@luxury.com',
        password: 'Password123!',
        phone: '',
        role: 'guest'
      });
    }
  };

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      if (mode === 'register') {
        const result = await registerUserApi({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          role: formData.role
        });

        if (!result.success) {
          throw new Error(result.message || 'Registration failed');
        }

        setSuccessMessage(`Account registered successfully for ${result.data.name}!`);
        if (onShowToast) {
          onShowToast({
            title: 'Welcome to TR GROUPS!',
            message: `Account created for ${result.data.email}. Connected to MongoDB Atlas.`,
            type: 'success'
          });
        }

        if (onLoginSuccess) {
          onLoginSuccess(result.data);
        }

        setTimeout(() => {
          if (result.data.role === 'admin') {
            navigate('/dashboard');
          } else {
            navigate('/');
          }
        }, 1200);
      } else {
        // Mode === 'login'
        const result = await loginUserApi({
          email: formData.email,
          password: formData.password
        });

        if (!result.success) {
          throw new Error(result.message || 'Invalid credentials');
        }

        setSuccessMessage(`Welcome back, ${result.data.name}!`);
        if (onShowToast) {
          onShowToast({
            title: 'Signed In Successfully',
            message: `Logged in as ${result.data.email}`,
            type: 'success'
          });
        }

        if (onLoginSuccess) {
          onLoginSuccess(result.data);
        }

        setTimeout(() => {
          if (result.data.role === 'admin') {
            navigate('/dashboard');
          } else {
            navigate('/');
          }
        }, 1200);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Error occurred. Please check backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-root animate-fade-in">
      <div className="container auth-container">
        <div className="auth-card glass-panel">
          {/* Header */}
          <div className="auth-header">
            <div className="brand-logo-crest mini-crest" style={{ margin: '0 auto 1rem' }}>
              <span className="brand-crest-letters">TR</span>
            </div>
            <span className="badge badge-gold">TR GROUPS MEMBERSHIP</span>
            <h1 className="auth-title">
              {mode === 'register' ? 'Create Your Account' : 'Welcome Back'}
            </h1>
            <p className="auth-subtitle">
              {mode === 'register'
                ? 'Join our private circle of luxury travelers and hotel management.'
                : 'Sign in to access your reservations, privileges, and saved suites.'}
            </p>
          </div>

          {/* Mode Switch Tabs */}
          <div className="auth-mode-switch">
            <button
              type="button"
              className={`auth-mode-btn ${mode === 'register' ? 'active' : ''}`}
              onClick={() => {
                setMode('register');
                setErrorMessage('');
              }}
            >
              Register (New Account)
            </button>
            <button
              type="button"
              className={`auth-mode-btn ${mode === 'login' ? 'active' : ''}`}
              onClick={() => {
                setMode('login');
                setErrorMessage('');
              }}
            >
              Sign In (Existing User)
            </button>
          </div>

          {/* Quick Demo Fill Buttons for Testing */}
          <div className="quick-fill-row">
            <span className="quick-fill-label">Quick Test Fill:</span>
            <button
              type="button"
              className="quick-fill-chip"
              onClick={() => handleQuickFill('guest')}
            >
              <User size={13} className="gold-icon" />
              <span>Fill Guest</span>
            </button>
            {mode === 'register' && (
              <button
                type="button"
                className="quick-fill-chip"
                onClick={() => handleQuickFill('admin')}
              >
                <Shield size={13} className="gold-icon" />
                <span>Fill Admin</span>
              </button>
            )}
          </div>

          {/* Alert Messages */}
          {errorMessage && (
            <div className="auth-alert alert-error animate-fade-in">
              <AlertCircle size={18} className="alert-icon" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="auth-alert alert-success animate-fade-in">
              <CheckCircle2 size={18} className="alert-icon" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {mode === 'register' && (
              <div className="form-group">
                <label htmlFor="reg-name">
                  Full Name <span className="req">*</span>
                </label>
                <div className="auth-input-wrapper">
                  <User size={18} className="auth-field-icon" />
                  <input
                    id="reg-name"
                    name="name"
                    type="text"
                    placeholder="e.g. Alexander Sterling"
                    value={formData.name}
                    onChange={handleChange}
                    className="auth-input"
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="reg-email">
                Email Address <span className="req">*</span>
              </label>
              <div className="auth-input-wrapper">
                <Mail size={18} className="auth-field-icon" />
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  placeholder="alexander@luxury.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="auth-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reg-password">
                Password <span className="req">*</span> (min 6 characters)
              </label>
              <div className="auth-input-wrapper">
                <Lock size={18} className="auth-field-icon" />
                <input
                  id="reg-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="auth-input"
                  minLength="6"
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <>
                <div className="form-group">
                  <label htmlFor="reg-phone">Phone Number (Optional)</label>
                  <div className="auth-input-wrapper">
                    <Phone size={18} className="auth-field-icon" />
                    <input
                      id="reg-phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                      className="auth-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="reg-role">Account Type / Role</label>
                  <div className="auth-input-wrapper">
                    <Shield size={18} className="auth-field-icon" />
                    <select
                      id="reg-role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="auth-select"
                    >
                      <option value="guest">Guest / Luxury Traveler</option>
                      <option value="admin">Hotel Management / Admin</option>
                      <option value="staff">Staff / Reception Concierge</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              className="btn-gold auth-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <span>Connecting to Server & MongoDB...</span>
              ) : mode === 'register' ? (
                <>
                  <span>Create Account & Register</span>
                  <ArrowRight size={17} />
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          {/* Footer toggle note */}
          <div className="auth-footer-note">
            {mode === 'register' ? (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  className="auth-link-btn"
                  onClick={() => {
                    setMode('login');
                    setErrorMessage('');
                  }}
                >
                  Sign In here
                </button>
              </p>
            ) : (
              <p>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  className="auth-link-btn"
                  onClick={() => {
                    setMode('register');
                    setErrorMessage('');
                  }}
                >
                  Register here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
