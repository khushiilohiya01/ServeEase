import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, User, Phone, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { safeRedirect } from '../../lib/formatters';

export function SignupPage() {
  const { register: registerAuth, login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = safeRedirect(searchParams.get('redirect') || localStorage.getItem('serveease_auth_return_to'));

  const [fullName, setFullName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [useMobile, setUseMobile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAutofill = () => {
    setFullName('Rahul Sharma');
    setIdentifier('rahul.sharma@example.com');
    setPassword('demopassword');
    setConfirmPassword('demopassword');
    setAgreeTerms(true);
    setUseMobile(false);
    setServerError('');
    toast.success('Sample credentials loaded');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!fullName.trim()) {
      setServerError('Please enter your full name');
      return;
    }

    if (!agreeTerms) {
      setServerError('Please agree to the Terms of Service and Privacy Policy to continue');
      return;
    }

    if (!identifier.trim()) {
      setServerError(useMobile ? 'Please enter your mobile number' : 'Please enter your email address');
      return;
    }

    if (!password || password.length < 8) {
      setServerError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setServerError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    try {
      const cleanEmail = identifier.includes('@')
        ? identifier.trim().toLowerCase()
        : `${identifier.trim()}@serveease.demo`;
      const phone = useMobile ? identifier.trim() : '';
      await registerAuth({
        full_name: fullName.trim(),
        email: cleanEmail,
        password,
        phone,
      });
      await login({ email: cleanEmail, password });
      toast.success(`Welcome to ServeEase, ${fullName.trim().split(' ')[0]}!`);
      localStorage.removeItem('serveease_auth_return_to');
      navigate(redirectUrl, { replace: true });
    } catch (err) {
      setServerError(err.message || 'Registration failed. Please check your information.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-custom py-12 sm:py-20 flex justify-center">
      <div className="relative w-full max-w-[440px] bg-white rounded-[28px] shadow-xl border border-neutral-200/90 p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-teal-700 shrink-0" aria-hidden="true" />
          <span className="text-[11px] font-bold tracking-[0.14em] text-neutral-500 uppercase">
            ServeEase Account
          </span>
        </div>

        <div className="mb-5">
          <h1 className="text-2xl sm:text-[26px] font-bold text-neutral-900 tracking-tight">
            Create your account
          </h1>
          <p className="text-xs sm:text-[13px] text-neutral-500 mt-1.5 leading-relaxed">
            Join over 140,000 households enjoying worry-free home maintenance.
          </p>
        </div>

        <div className="bg-[#F4F3EF] p-1 rounded-full flex gap-1 mb-5" role="tablist">
          <Link
            to={`/login${redirectUrl !== '/dashboard' ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`}
            role="tab"
            aria-selected="false"
            className="flex-1 py-2 rounded-full text-xs sm:text-sm font-semibold text-neutral-600 hover:text-neutral-900 text-center transition-colors"
          >
            Sign in
          </Link>
          <button
            type="button"
            role="tab"
            aria-selected="true"
            className="flex-1 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white text-neutral-900 shadow-xs"
          >
            Create account
          </button>
        </div>

        {serverError && (
          <div
            role="alert"
            className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="signup-fullname"
              className="block text-xs font-semibold text-neutral-800 mb-1.5"
            >
              Full name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="signup-fullname"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="signup-identifier"
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
                className="text-xs text-teal-700 hover:underline font-medium cursor-pointer"
              >
                {useMobile ? 'Use email address instead' : 'Use mobile number instead'}
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                {useMobile ? <Phone className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
              </div>
              <input
                id="signup-identifier"
                type={useMobile ? 'tel' : 'email'}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={useMobile ? '+91 98765 43210' : 'name@example.com'}
                className="w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="signup-password"
              className="block text-xs font-semibold text-neutral-800 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-10 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15 transition-all"
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
            {password && (
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
                        : 'w-full bg-emerald-600'
                    }`}
                  />
                </div>
              </div>
            )}
            {!password && (
              <p className="text-[11px] text-neutral-500 mt-1">
                Must be at least 8 characters.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="signup-confirm-password"
              className="block text-xs font-semibold text-neutral-800 mb-1.5"
            >
              Confirm password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="signup-confirm-password"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter password again"
                className="w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15 transition-all"
                required
              />
            </div>
          </div>

          <div className="flex items-start gap-2 pt-0.5">
            <input
              id="signup-terms"
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 rounded text-teal-700 border-neutral-300 focus:ring-teal-700 cursor-pointer mt-0.5"
              required
            />
            <label
              htmlFor="signup-terms"
              className="text-xs text-neutral-600 select-none cursor-pointer leading-tight"
            >
              I agree to the{' '}
              <span className="text-teal-700 font-medium underline">Terms of Service</span> and{' '}
              <span className="text-teal-700 font-medium underline">Privacy Policy</span>.
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-full bg-teal-700 hover:bg-teal-800 active:scale-[0.98] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-all duration-150 cursor-pointer disabled:opacity-70 mt-2"
          >
            {isSubmitting ? (
              <span>Creating account...</span>
            ) : (
              <>
                <span>Create account</span>
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
          <ShieldCheck className="w-3.5 h-3.5 text-teal-700 shrink-0" />
          <span>256-bit encrypted • We never share your details</span>
        </div>
      </div>
    </div>
  );
}
