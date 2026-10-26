import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  User,
  Calendar,
  CreditCard,
  LogOut,
  ChevronDown,
  ArrowRight,
  ShoppingBag,
  LayoutDashboard,
  MapPin,
  Home,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ServicesMegaMenu } from './ServicesMegaMenu';
import { LocationModal } from '../location/LocationModal';

export function Navbar() {
  const { user, isAuthenticated, logout, openAuthModal, selectedCity, selectedLocality } = useAuth();
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const servicesTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll detection and scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? currentScrollY / docHeight : 0);
      setIsScrolled(currentScrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Reset menus on route change without effect cascade
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setServicesMenuOpen(false);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setServicesMenuOpen(false);
        setUserDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Services dropdown hover handlers with small debounce
  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesMenuOpen(true);
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesMenuOpen(false);
    }, 180);
  };

  const handleLogout = async () => {
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    await logout();
    navigate('/');
  };

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F7F2]/92 backdrop-blur-md border-b border-[#DDE3DA] shadow-xs'
            : 'bg-[#F7F7F2] border-b border-[#DDE3DA]/60'
        }`}
      >
        <div className="container-custom h-20 flex items-center justify-between relative">
          {/* 1. Left: Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus-visible:outline-[#173D32] rounded-xl py-1"
            aria-label="ServeEase Home"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#173D32] flex items-center justify-center text-[#A9C9AC] group-hover:bg-[#245544] transition-all duration-300 shadow-sm shadow-[#173D32]/10 shrink-0">
              {/* Minimal architectural house/service emblem */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transform group-hover:scale-105 transition-transform"
              >
                <path d="M3 10.5L12 3l9 7.5" />
                <path d="M5 9.5V20a1 1 0 001 1h12a1 1 0 001-1V9.5" />
                <path d="M10 21V13h4v8" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#191E1B]">
              ServeEase
            </span>
          </Link>

          {/* 2. Center: Desktop Navigation with Mega Menu */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-sm font-medium transition-all duration-150 px-3.5 py-2 rounded-xl inline-flex items-center ${
                  isActive
                    ? 'text-[#173D32] bg-[#E8EBE2]/80 font-semibold'
                    : 'text-[#66716A] hover:text-[#191E1B] hover:bg-[#E8EBE2]/40'
                }`
              }
            >
              Home
            </NavLink>

            {/* Services with Interactive Mega Menu */}
            <div
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <button
                type="button"
                onClick={() => setServicesMenuOpen((prev) => !prev)}
                onFocus={() => setServicesMenuOpen(true)}
                aria-expanded={servicesMenuOpen}
                aria-haspopup="true"
                className={`text-sm font-medium transition-all duration-150 px-3.5 py-2 rounded-xl inline-flex items-center gap-1.5 cursor-pointer ${
                  servicesMenuOpen || location.pathname.startsWith('/services')
                    ? 'text-[#173D32] bg-[#E8EBE2]/80 font-semibold'
                    : 'text-[#66716A] hover:text-[#191E1B] hover:bg-[#E8EBE2]/40'
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    servicesMenuOpen ? 'rotate-180 text-[#173D32]' : 'text-[#66716A]'
                  }`}
                />
              </button>

              {/* Mega Menu Dropdown */}
              <ServicesMegaMenu
                isOpen={servicesMenuOpen}
                onClose={() => setServicesMenuOpen(false)}
              />
            </div>

            <button
              type="button"
              onClick={() => scrollToSection('how-it-works')}
              className="text-sm font-medium text-[#66716A] hover:text-[#191E1B] hover:bg-[#E8EBE2]/40 px-3.5 py-2 rounded-xl inline-flex items-center transition-colors cursor-pointer"
            >
              How It Works
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('why-serveease')}
              className="text-sm font-medium text-[#66716A] hover:text-[#191E1B] hover:bg-[#E8EBE2]/40 px-3.5 py-2 rounded-xl inline-flex items-center transition-colors cursor-pointer"
            >
              Why ServeEase
            </button>
          </nav>

          {/* 3. Right: Location Selector + Cart + Account + CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Location Selector */}
            <button
              type="button"
              onClick={() => setIsLocationModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#DDE3DA] hover:border-[#173D32]/40 text-xs font-semibold text-[#191E1B] transition-all cursor-pointer shadow-2xs hover:shadow-xs max-w-[200px]"
              aria-label={`Current location: ${selectedLocality || 'Koramangala'}, ${selectedCity || 'Bengaluru'}. Click to change.`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#173D32] shrink-0" />
              <span className="truncate">
                {selectedLocality ? `${selectedLocality}, ${selectedCity}` : selectedCity || 'Bengaluru'}
              </span>
              <ChevronDown className="w-3 h-3 text-[#66716A] shrink-0" />
            </button>

            {/* Cart Icon Link */}
            <Link
              to="/cart"
              aria-label={`View cart with ${cartCount} items`}
              className="relative p-2.5 rounded-xl text-[#191E1B] hover:bg-[#E8EBE2]/60 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#173D32] text-white text-[10px] font-bold flex items-center justify-center shadow-xs animate-scale-in">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Account / Auth Dropdown */}
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 p-1 pl-2.5 pr-2 rounded-full border border-[#DDE3DA] hover:border-[#173D32]/40 bg-white transition-all cursor-pointer min-h-[38px] focus-visible:outline-[#173D32]"
                  aria-expanded={userDropdownOpen}
                  aria-haspopup="menu"
                  aria-label="User Account Menu"
                >
                  <div className="w-6 h-6 rounded-full bg-[#173D32] text-white flex items-center justify-center text-xs font-bold">
                    {user?.full_name?.charAt(0) || 'U'}
                  </div>
                  <span className="text-xs font-semibold text-[#191E1B] max-w-[80px] truncate">
                    {user?.full_name?.split(' ')[0]}
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 text-[#66716A] transition-transform duration-150 ${
                      userDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {userDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setUserDropdownOpen(false)}
                      aria-hidden="true"
                    />
                    <div
                      role="menu"
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#DDE3DA] py-1.5 z-30 transition-all"
                    >
                      <div className="px-4 py-3 border-b border-[#DDE3DA]/60">
                        <p className="text-xs font-bold text-[#191E1B]">{user?.full_name}</p>
                        <p className="text-[11px] text-[#66716A] truncate">{user?.email}</p>
                      </div>

                      <Link
                        to="/dashboard"
                        role="menuitem"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#191E1B] hover:bg-[#F7F7F2] font-medium"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-[#66716A]" />
                        Dashboard
                      </Link>

                      <Link
                        to="/bookings"
                        role="menuitem"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#191E1B] hover:bg-[#F7F7F2] font-medium"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#66716A]" />
                        My Bookings
                      </Link>

                      <Link
                        to="/payments"
                        role="menuitem"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#191E1B] hover:bg-[#F7F7F2] font-medium"
                      >
                        <CreditCard className="w-3.5 h-3.5 text-[#66716A]" />
                        Payment Methods
                      </Link>

                      <Link
                        to="/profile"
                        role="menuitem"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#191E1B] hover:bg-[#F7F7F2] font-medium"
                      >
                        <User className="w-3.5 h-3.5 text-[#66716A]" />
                        Profile & Addresses
                      </Link>

                      <div className="my-1 border-t border-[#DDE3DA]/60" />

                      <button
                        type="button"
                        role="menuitem"
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs text-[#B54848] hover:bg-rose-50 font-medium cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal('signin')}
                className="text-xs font-semibold text-[#191E1B] hover:text-[#173D32] px-3.5 py-2 rounded-xl hover:bg-[#E8EBE2]/50 transition-colors cursor-pointer"
              >
                Sign In
              </button>
            )}

            {/* Primary CTA */}
            <Link
              to={cartCount > 0 ? '/cart' : '/services'}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#173D32] hover:bg-[#245544] text-white text-xs font-semibold transition-all duration-200 shadow-sm hover:shadow active:scale-98"
            >
              <span>{cartCount > 0 ? 'View Cart' : 'Book a Service'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 4. Mobile Menu Trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              to="/cart"
              aria-label={`View cart with ${cartCount} items`}
              className="relative p-2 text-[#191E1B]"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#173D32] text-white text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="p-2.5 rounded-xl text-[#191E1B] hover:bg-[#E8EBE2]/60 cursor-pointer focus-visible:outline-[#173D32]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Scroll Progress Accent Bar */}
        <div
          className="h-[2px] bg-[#173D32]/80 transition-all duration-75"
          style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
        />
      </header>

      {/* Mobile Full-Height Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Panel */}
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#F7F7F2] border-l border-[#DDE3DA] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-250">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#DDE3DA]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#173D32] text-[#A9C9AC] flex items-center justify-center">
                    <Home className="w-4 h-4" />
                  </div>
                  <span className="text-lg font-bold text-[#191E1B]">
                    ServeEase
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-[#66716A] hover:bg-[#E8EBE2]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Location Badge on Mobile */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsLocationModalOpen(true);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-white border border-[#DDE3DA] text-xs font-semibold text-[#191E1B]"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <MapPin className="w-4 h-4 text-[#173D32] shrink-0" />
                    <span className="truncate">
                      Serving in {selectedLocality ? `${selectedLocality}, ${selectedCity}` : selectedCity || 'Bengaluru'}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#173D32] font-bold">Change</span>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1.5 py-2">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-[#191E1B] hover:bg-[#E8EBE2]"
                >
                  <span>Home</span>
                  <ArrowRight className="w-4 h-4 text-[#66716A]" />
                </Link>

                <Link
                  to="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-[#191E1B] hover:bg-[#E8EBE2]"
                >
                  <div className="flex items-center gap-2">
                    <span>All Services</span>
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#A9C9AC]/40 text-[#173D32]">
                      50+ Services
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#66716A]" />
                </Link>

                <button
                  type="button"
                  onClick={() => scrollToSection('how-it-works')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-[#191E1B] hover:bg-[#E8EBE2] text-left cursor-pointer"
                >
                  <span>How It Works</span>
                  <ArrowRight className="w-4 h-4 text-[#66716A]" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('why-serveease')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-[#191E1B] hover:bg-[#E8EBE2] text-left cursor-pointer"
                >
                  <span>Why ServeEase</span>
                  <ArrowRight className="w-4 h-4 text-[#66716A]" />
                </button>

                {isAuthenticated && (
                  <>
                    <div className="pt-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-[#66716A] px-4">
                      My Account
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[#191E1B] hover:bg-[#E8EBE2]"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#66716A]" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      to="/bookings"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[#191E1B] hover:bg-[#E8EBE2]"
                    >
                      <Calendar className="w-4 h-4 text-[#66716A]" />
                      <span>Bookings</span>
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[#191E1B] hover:bg-[#E8EBE2]"
                    >
                      <User className="w-4 h-4 text-[#66716A]" />
                      <span>Profile & Address</span>
                    </Link>
                  </>
                )}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#DDE3DA] space-y-3">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full py-2.5 rounded-xl bg-white border border-[#DDE3DA] text-xs font-semibold text-[#B54848] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out ({user?.full_name?.split(' ')[0]})</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('signin');
                  }}
                  className="w-full py-2.5 rounded-xl bg-white border border-[#DDE3DA] text-xs font-semibold text-[#191E1B] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <User className="w-4 h-4 text-[#173D32]" />
                  <span>Sign In / Create Account</span>
                </button>
              )}

              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-[#173D32] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Book a Service</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Global Location Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </>
  );
}
