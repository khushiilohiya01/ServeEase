import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Lock, User, Phone, ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { safeRedirect } from '../../lib/formatters';

export function AuthModal() {
  const navigate = useNavigate();
  const {
    authModalState,
    closeAuthModal,
    setAuthModalMode,
    login,
    register: registerUser,
  } = useAuth();

  const isOpen = authModalState?.isOpen;
  const mode = authModalState?.mode || 'signin';

  const [fullName, setFullName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [useMobile, setUseMobile] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeAuthModal();
      }
    };
    if (isOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeAuthModal]);

  const handleSwitchMode = (newMode) => {
    setErrorMsg('');
    setAuthModalMode(newMode);
  };

  const handleAutofill = () => {
    setErrorMsg('');
    if (mode === 'signin') {
      setIdentifier('rahul.sharma@example.com');
      setPassword('demopassword');
      setUseMobile(false);
    } else {
      setFullName('Rahul Sharma');
      setIdentifier('rahul.sharma@example.com');
      setPassword('demopassword');
      setConfirmPassword('demopassword');
      setAgreeTerms(true);
      setUseMobile(false);
    }
    toast.success('Sample credentials loaded');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'create') {
      if (!fullName.trim()) {
        setErrorMsg('Please enter your full name');
        return;
      }
      if (!agreeTerms) {
        setErrorMsg('Please agree to the Terms of Service and Privacy Policy to continue');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match');
        return;
      }
    }

    if (!identifier.trim()) {
      setErrorMsg(useMobile ? 'Please enter your mobile number' : 'Please enter your email address');
      return;
    }

    if (!password || password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long');
      return;
    }

    setIsSubmitting(true);
    try {
      const storedReturn = localStorage.getItem('serveease_auth_return_to');
      const returnPath = storedReturn ? safeRedirect(storedReturn) : null;
      if (mode === 'signin') {
        const cleanEmail = identifier.trim().toLowerCase();
        await login({ email: cleanEmail, password });
        toast.success('Signed in successfully!');
        closeAuthModal();
        if (returnPath) {
          localStorage.removeItem('serveease_auth_return_to');
          navigate(returnPath);
        } else {
          navigate('/dashboard');
        }
      } else {
        const cleanEmail = identifier.includes('@')
          ? identifier.trim().toLowerCase()
          : `${identifier.trim()}@serveease.demo`;
        const phone = useMobile ? identifier.trim() : '';
        await registerUser({
          full_name: fullName.trim(),
          email: cleanEmail,
          password,
          phone,
        });
        await login({ email: cleanEmail, password });
        toast.success(`Account created! Welcome, ${fullName.trim().split(' ')[0]}!`);
        closeAuthModal();
        if (returnPath) {
          localStorage.removeItem('serveease_auth_return_to');
          navigate(returnPath);
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please verify your details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div
        className="fixed inset-0 bg-neutral-900/50 backdrop-blur-xs transition-opacity"
        onClick={closeAuthModal}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-[440px] bg-white rounded-[26px] shadow-2xl border border-neutral-200/80 p-6 sm:p-8 z-10 my-auto animate-in fade-in zoom-in-95 slide-in-from-bottom-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#173D32] shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-bold tracking-[0.14em] text-[#66716A] uppercase">
              ServeEase Account
            </span>
          </div>
          <button
            type="button"
            onClick={closeAuthModal}
            aria-label="Close dialog"
            className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-5">
          <h2
            id="auth-modal-title"
            className="text-2xl sm:text-[26px] font-bold text-neutral-900 tracking-tight"
          >
            {mode === 'signin' ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <p className="text-xs sm:text-[13px] text-neutral-500 mt-1.5 leading-relaxed">
            {mode === 'signin'
              ? 'Track pro arrivals, review warranties, and reorder verified services.'
              : 'Join over 140,000 households enjoying worry-free home maintenance.'}
          </p>
        </div>

        <div className="bg-[#F4F3EF] p-1 rounded-full flex gap-1 mb-5" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'signin'}
            onClick={() => handleSwitchMode('signin')}
            className={`flex-1 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              mode === 'signin'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'create'}
            onClick={() => handleSwitchMode('create')}
            className={`flex-1 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              mode === 'create'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Create account
          </button>
        </div>

        {errorMsg && (
          <div
            role="alert"
            className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {mode === 'create' && (
            <div>
              <label
                htmlFor="auth-fullname"
                className="block text-xs font-semibold text-neutral-800 mb-1.5"
              >
                Full name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="auth-fullname"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full rounded-xl border border-[#DDE3DA] bg-white pl-10 pr-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-[#173D32] focus:ring-2 focus:ring-[#173D32]/15 transition-all"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="auth-identifier"
                className="block text-xs font-semibold text-neutral-800"
              >
                {useMobile ? 'Mobile number' : 'Email address'}
              </label>
              <button
                type="button"
                onClick={() => {
                  setUseMobile(!useMobile);
                  setIdentifier('');
                }}
                className="text-xs text-[#173D32] hover:underline font-semibold cursor-pointer"
              >
                {useMobile ? 'Use email address instead' : 'Use mobile number instead'}
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                {useMobile ? <Phone className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
              </div>
              <input
                id="auth-identifier"
                type={useMobile ? 'tel' : 'email'}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={useMobile ? '+91 98765 43210' : 'name@example.com'}
                className="w-full rounded-xl border border-[#DDE3DA] bg-white pl-10 pr-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-[#173D32] focus:ring-2 focus:ring-[#173D32]/15 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="auth-password"
                className="block text-xs font-semibold text-neutral-800"
              >
                Password
              </label>
              {mode === 'signin' && (
                <button
                  type="button"
                  onClick={() => toast('Enter your registered password or click autofill below.', { icon: '🔑' })}
                  className="text-xs text-[#173D32] hover:underline font-semibold cursor-pointer"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full rounded-xl border border-[#DDE3DA] bg-white pl-10 pr-10 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-[#173D32] focus:ring-2 focus:ring-[#173D32]/15 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-600 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {mode === 'create' && password && (
              <div className="mt-2 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-neutral-500">Strength:</span>
                  <span className={`font-semibold ${
                    password.length < 8
                      ? 'text-rose-600'
                      : password.length < 8
                      ? 'text-amber-600'
                      : 'text-emerald-600'
                  }`}>
                    {password.length < 8
                      ? 'Too short (min 6)'
                      : password.length < 8
                      ? 'Moderate'
                      : 'Strong'}
                  </span>
                </div>
                <div className="w-full h-1 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      password.length < 8
                        ? 'w-1/4 bg-rose-500'
                        : password.length < 8
                        ? 'w-2/3 bg-amber-500'
                        : 'w-full bg-[#173D32]'
                    }`}
                  />
                </div>
              </div>
            )}
            {mode === 'create' && !password && (
              <p className="text-[11px] text-neutral-500 mt-1">
                Password must be at least 8 characters.
              </p>
            )}
          </div>

          {mode === 'create' && (
            <div>
              <label
                htmlFor="auth-confirm-password"
                className="block text-xs font-semibold text-neutral-800 mb-1.5"
              >
                Confirm password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="auth-confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter password again"
                  className="w-full rounded-xl border border-[#DDE3DA] bg-white pl-10 pr-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-[#173D32] focus:ring-2 focus:ring-[#173D32]/15 transition-all"
                  required
                />
              </div>
            </div>
          )}

          {mode === 'signin' && (
            <div className="flex items-center gap-2 pt-0.5">
              <input
                id="auth-remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-[#173D32] border-[#DDE3DA] focus:ring-[#173D32] cursor-pointer"
              />
              <label
                htmlFor="auth-remember-me"
                className="text-xs text-neutral-600 select-none cursor-pointer"
              >
                Remember me on this browser
              </label>
            </div>
          )}

          {mode === 'create' && (
            <div className="flex items-start gap-2 pt-0.5">
              <input
                id="auth-terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 rounded text-[#173D32] border-[#DDE3DA] focus:ring-[#173D32] cursor-pointer mt-0.5"
                required
              />
              <label
                htmlFor="auth-terms"
                className="text-xs text-neutral-600 select-none cursor-pointer leading-tight"
              >
                I agree to the{' '}
                <span className="text-[#173D32] font-semibold underline">Terms of Service</span> and{' '}
                <span className="text-[#173D32] font-semibold underline">Privacy Policy</span>.
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-full bg-[#173D32] hover:bg-[#245544] active:scale-[0.98] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-all duration-150 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {isSubmitting ? (
              <span>Processing...</span>
            ) : (
              <>
                <span>{mode === 'signin' ? 'Sign in' : 'Create account'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {import.meta.env.DEV && (
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={handleAutofill}
              className="text-xs text-neutral-400 hover:text-neutral-700 underline decoration-neutral-200 transition-colors cursor-pointer"
            >
              Autofill sample credentials (dev)
            </button>
          </div>
        )}

        <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-[11px] text-neutral-500">
          <ShieldCheck className="w-3.5 h-3.5 text-[#173D32] shrink-0" />
          <span>256-bit encrypted • We never share your details</span>
        </div>
      </div>
    </div>,
    document.body
  );
}
