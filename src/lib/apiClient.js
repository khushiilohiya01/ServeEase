import { INITIAL_SERVICES, INITIAL_ADDRESSES, INITIAL_BOOKINGS } from './mockData';
import { TAX_RATE, PLATFORM_FEE, CATEGORY_COMPATIBILITY_MAP } from './constants';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const ALLOW_MOCK_FALLBACK = import.meta.env.VITE_ENABLE_MOCK_FALLBACK !== 'false';

// Local mock state repository for reliable offline / portfolio demo testing
class MockDataStore {
  constructor() {
    this.services = [...INITIAL_SERVICES];

    // Persist registered users across reloads
    const storedUsers = localStorage.getItem('serveease_mock_users');
    this.users = storedUsers
      ? JSON.parse(storedUsers)
      : [
          {
            id: 1,
            full_name: 'Rahul Sharma',
            email: 'rahul.sharma@example.com',
            password: 'demopassword',
            phone: '+91 98765 43210',
            status: 'active',
            created_at: '2026-01-15T10:00:00Z',
          },
        ];

    // Load persisted bookings (defaults to demo user's initial bookings)
    const storedBookings = localStorage.getItem('serveease_mock_bookings');
    this.bookings = storedBookings ? JSON.parse(storedBookings) : [...INITIAL_BOOKINGS];

    // Load persisted addresses (defaults to demo user's initial addresses)
    const storedAddresses = localStorage.getItem('serveease_mock_addresses');
    this.addresses = storedAddresses ? JSON.parse(storedAddresses) : [...INITIAL_ADDRESSES];

    this.payments = this.bookings.map(b => b.payment).filter(Boolean);

    // Check if an authenticated user session exists
    const token = localStorage.getItem('serveease_token');
    const sessionUserId = localStorage.getItem('serveease_mock_session_user_id');
    if (token && sessionUserId) {
      const foundUser = this.users.find(u => String(u.id) === String(sessionUserId));
      if (foundUser) {
        this.user = foundUser;
        this.isAuthenticated = true;
      } else {
        this.user = null;
        this.isAuthenticated = false;
      }
    } else {
      this.user = null;
      this.isAuthenticated = false;
    }
  }

  saveUsers() {
    try {
      localStorage.setItem('serveease_mock_users', JSON.stringify(this.users));
    } catch {
      // storage unavailable fallback
    }
  }

  saveBookings() {
    try {
      localStorage.setItem('serveease_mock_bookings', JSON.stringify(this.bookings));
    } catch {
      // storage unavailable fallback
    }
  }

  saveAddresses() {
    try {
      localStorage.setItem('serveease_mock_addresses', JSON.stringify(this.addresses));
    } catch {
      // storage unavailable fallback
    }
  }

  getServices({ q, category, sort, room } = {}) {
    let list = [...this.services];
    if (category && category !== 'all') {
      const mappedCategory = CATEGORY_COMPATIBILITY_MAP[category] || category;
      list = list.filter(s => s.category === mappedCategory || s.category === category);
    }
    if (room && room !== 'all') {
      list = list.filter(s => s.rooms && s.rooms.includes(room));
    }
    if (q && q.trim()) {
      const normalizedQuery = q.trim().toLowerCase().replace(/\s+/g, ' ');
      const tokens = normalizedQuery.split(' ').filter(Boolean);

      list = list.filter(s => {
        const name = (s.name || '').toLowerCase();
        const desc = (s.description || '').toLowerCase();
        const cat = (s.category || '').toLowerCase();
        const symptoms = (s.symptoms || []).map(sym => sym.toLowerCase());
        const inclusions = (s.includes || s.inclusions || []).map(inc => inc.toLowerCase());

        // Direct substring match
        if (
          name.includes(normalizedQuery) ||
          desc.includes(normalizedQuery) ||
          cat.includes(normalizedQuery) ||
          symptoms.some(sym => sym.includes(normalizedQuery) || normalizedQuery.includes(sym)) ||
          inclusions.some(inc => inc.includes(normalizedQuery))
        ) {
          return true;
        }

        // Token match: all words in query appear across name, description, symptoms or inclusions
        return tokens.every(token =>
          name.includes(token) ||
          desc.includes(token) ||
          cat.includes(token) ||
          symptoms.some(sym => sym.includes(token)) ||
          inclusions.some(inc => inc.includes(token))
        );
      });
    }
    if (sort) {
      if (sort === 'price_asc') list.sort((a, b) => (a.base_price || 0) - (b.base_price || 0));
      else if (sort === 'price_desc') list.sort((a, b) => (b.base_price || 0) - (a.base_price || 0));
      else if (sort === 'rating_desc') list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      else if (sort === 'duration_asc') list.sort((a, b) => (a.duration_minutes || a.durationMins || 0) - (b.duration_minutes || b.durationMins || 0));
    }
    return list;
  }

  getServiceById(id) {
    const service = this.services.find(s => 
      s.id === id || 
      String(s.id) === String(id) || 
      s.slug === id || 
      (s.aliases && s.aliases.includes(id))
    );
    if (!service) throw new Error('Service not found');
    return service;
  }

  getAddresses() {
    if (!this.user) return [];
    return this.addresses.filter(a => a.user_id === this.user.id);
  }

  addAddress(addressData) {
    if (!this.user) throw new Error('You must be signed in to add an address');
    const userAddresses = this.getAddresses();
    const newAddress = {
      id: Date.now(),
      user_id: this.user.id,
      ...addressData,
      is_default: userAddresses.length === 0 ? true : Boolean(addressData.is_default),
      created_at: new Date().toISOString(),
    };
    if (newAddress.is_default) {
      this.addresses = this.addresses.map(a =>
        a.user_id === this.user.id ? { ...a, is_default: false } : a
      );
    }
    this.addresses.push(newAddress);
    this.saveAddresses();
    return newAddress;
  }

  updateAddress(id, patch) {
    const idx = this.addresses.findIndex(a => a.id === Number(id) && a.user_id === this.user?.id);
    if (idx === -1) throw new Error('Address not found');
    if (patch.is_default) {
      this.addresses = this.addresses.map(a =>
        a.user_id === this.user.id ? { ...a, is_default: false } : a
      );
    }
    this.addresses[idx] = { ...this.addresses[idx], ...patch };
    this.saveAddresses();
    return this.addresses[idx];
  }

  deleteAddress(id) {
    this.addresses = this.addresses.filter(a => !(a.id === Number(id) && a.user_id === this.user?.id));
    this.saveAddresses();
    return { success: true };
  }

  createBooking({ service_id, address_id, scheduled_at, notes, custom_address, custom_total, cart_items }) {
    if (!this.user) throw new Error('You must be signed in to create a booking');
    const service = service_id
      ? this.getServiceById(service_id)
      : (cart_items?.[0] ? this.getServiceById(cart_items[0].serviceId) : this.services[0]);
    let address = this.addresses.find(a => a.id === Number(address_id) && a.user_id === this.user.id);
    if (!address && custom_address) {
      address = this.addAddress(custom_address);
    }
    if (!address) {
      const userAddresses = this.getAddresses();
      address = userAddresses[0] || this.addAddress({
        label: 'Home',
        line1: '123 Indiranagar 100ft Road',
        city: 'Bengaluru',
        state: 'Karnataka',
        postal_code: '560038',
      });
    }

    const subtotal = custom_total
      ? Math.round((custom_total - PLATFORM_FEE) / (1 + TAX_RATE))
      : service.base_price;
    const discount_amount = 0.00;
    const tax_amount = Math.round(subtotal * TAX_RATE * 100) / 100;
    const platform_fee = PLATFORM_FEE;
    const total_amount = custom_total || Math.round((subtotal + tax_amount + platform_fee - discount_amount) * 100) / 100;

    const newBooking = {
      id: Date.now(),
      user_id: this.user.id,
      service_id: service.id,
      service: cart_items && cart_items.length > 1 ? {
        ...service,
        name: `${cart_items[0].name} (+${cart_items.length - 1} more)`,
        cart_items,
      } : service,
      address_id: address.id,
      address_snapshot: { ...address },
      scheduled_at: scheduled_at || new Date().toISOString(),
      status: 'pending',
      subtotal,
      discount_amount,
      tax_amount,
      platform_fee,
      total_amount,
      notes: notes || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      payment: null,
    };
    this.bookings.unshift(newBooking);
    this.saveBookings();
    return newBooking;
  }

  getBookings(status) {
    if (!this.user) return [];
    const userBookings = this.bookings.filter(b => b.user_id === this.user.id);
    if (status && status !== 'all') {
      return userBookings.filter(b => b.status === status);
    }
    return userBookings;
  }

  getBookingById(id) {
    const booking = this.bookings.find(b => b.id === Number(id));
    if (!booking) throw new Error('Booking not found');
    return booking;
  }

  updateBookingStatus(id, { status, scheduled_at }) {
    const booking = this.getBookingById(id);
    if (status) booking.status = status;
    if (scheduled_at) booking.scheduled_at = scheduled_at;
    booking.updated_at = new Date().toISOString();
    this.saveBookings();
    return booking;
  }

  createCheckoutSession(bookingId, paymentMethod = 'card') {
    const booking = this.getBookingById(bookingId);
    return {
      session_id: `cs_test_${Date.now()}`,
      booking_id: booking.id,
      amount: booking.total_amount,
      currency: 'INR',
      provider: 'online_payment',
      client_secret: `pi_test_${Date.now()}_secret_${Math.random().toString(36).substring(7)}`,
      payment_method: paymentMethod,
    };
  }

  confirmPayment(bookingId, paymentDetails) {
    const booking = this.getBookingById(bookingId);
    const newPayment = {
      id: Date.now(),
      booking_id: booking.id,
      provider: paymentDetails.provider || 'online_payment',
      provider_order_id: paymentDetails.order_id || `ord_${Date.now()}`,
      provider_payment_id: paymentDetails.payment_id || `pay_${Date.now()}`,
      amount: booking.total_amount,
      currency: 'INR',
      status: 'succeeded',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.payments.unshift(newPayment);
    booking.payment = newPayment;
    booking.status = 'confirmed';
    booking.updated_at = new Date().toISOString();
    this.saveBookings();
    return { booking, payment: newPayment };
  }

  getPayments() {
    if (!this.user) return [];
    const userBookingIds = new Set(
      this.bookings.filter(b => b.user_id === this.user.id).map(b => b.id)
    );
    return this.payments.filter(p => userBookingIds.has(p.booking_id));
  }

  getPaymentById(id) {
    const payment = this.payments.find(p => p.id === Number(id));
    if (!payment) throw new Error('Payment record not found');
    return payment;
  }
}

export const mockStore = new MockDataStore();

// Normalized custom API error
export class ApiError extends Error {
  constructor(message, status = 500, errors = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

// Token storage helpers
let authToken = localStorage.getItem('serveease_token') || null;

export function setAuthToken(token) {
  authToken = token;
  if (token) {
    localStorage.setItem('serveease_token', token);
  } else {
    localStorage.removeItem('serveease_token');
  }
}

export function getAuthToken() {
  return authToken;
}

// Centralized request dispatcher
export async function apiRequest(endpoint, options = {}) {
  // If no external API base URL is configured, operate directly with the client data store
  if (!BASE_URL) {
    return handleMockFallback(endpoint, options);
  }

  const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...(options.headers || {}),
  };

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    if (!res.ok) {
      let errorData;
      try {
        errorData = await res.json();
      } catch {
        errorData = { message: `Request failed with status ${res.status}` };
      }
      throw new ApiError(
        errorData.message || errorData.error || 'Request failed',
        res.status,
        errorData.errors || null
      );
    }

    if (res.status === 204) return null;
    return await res.json();
  } catch (err) {
    // If it's an explicit HTTP ApiError returned by the service, bubble it up
    if (err instanceof ApiError) {
      throw err;
    }

    if (ALLOW_MOCK_FALLBACK) {
      return handleMockFallback(endpoint, options);
    }

    throw new ApiError('Unable to connect to the API service. Please verify your network connection.', 503);
  }
}

// Mock dispatch router adhering strictly to Section 8 API contract
function handleMockFallback(endpoint, options = {}) {
  const method = (options.method || 'GET').toUpperCase();
  const [path, queryString] = endpoint.split('?');
  const query = new URLSearchParams(queryString || '');

  // Simulate minimal realistic latency
  // GET /services
  if (path === '/services' && method === 'GET') {
    const category = query.get('category');
    const q = query.get('q');
    const sort = query.get('sort');
    const room = query.get('room');
    return {
      data: mockStore.getServices({ category, q, sort, room }),
      isMock: true
    };
  }

  // GET /services/:id (supports string kebab-case and numeric IDs)
  const serviceDetailMatch = path.match(/^\/services\/([^/]+)$/);
  if (serviceDetailMatch && method === 'GET') {
    return {
      data: mockStore.getServiceById(serviceDetailMatch[1]),
      isMock: true
    };
  }

  // GET /auth/me
  if (path === '/auth/me' && method === 'GET') {
    if (!mockStore.isAuthenticated || !mockStore.user) {
      throw new ApiError('Unauthorized', 401);
    }
    return {
      data: mockStore.user,
      isMock: true
    };
  }

  // POST /auth/login
  if (path === '/auth/login' && method === 'POST') {
    const body = JSON.parse(options.body || '{}');
    if (!body.email || !body.password) {
      throw new ApiError('Email and password are required', 400);
    }

    const cleanEmail = String(body.email).toLowerCase().trim();
    const existing = mockStore.users.find(u => u.email.toLowerCase().trim() === cleanEmail);

    if (!existing) {
      throw new ApiError('No account found with this email. Please check your email or create an account.', 401);
    }

    if (existing.password && existing.password !== body.password) {
      throw new ApiError('Incorrect password. Please try again.', 401);
    }

    mockStore.user = existing;
    mockStore.isAuthenticated = true;
    const token = `token_${existing.id}_${Date.now()}`;
    setAuthToken(token);
    try {
      localStorage.setItem('serveease_mock_session_user_id', String(existing.id));
    } catch {
      // ignore
    }

    return {
      token,
      user: existing,
      isMock: true
    };
  }

  // POST /auth/register
  if (path === '/auth/register' && method === 'POST') {
    const body = JSON.parse(options.body || '{}');
    if (!body.email || !body.full_name || !body.password) {
      throw new ApiError('Full name, email, and password are required to register', 400);
    }

    const cleanEmail = String(body.email).toLowerCase().trim();
    const existing = mockStore.users.find(u => u.email.toLowerCase().trim() === cleanEmail);

    if (existing) {
      throw new ApiError('An account with this email already exists. Please sign in.', 400);
    }

    const newUser = {
      id: Date.now(),
      full_name: String(body.full_name).trim(),
      email: cleanEmail,
      password: body.password,
      phone: body.phone || '',
      status: 'active',
      created_at: new Date().toISOString()
    };

    mockStore.users.push(newUser);
    mockStore.saveUsers();

    // Crucial: A newly registered user is NOT logged in automatically;
    // they must sign in with their credentials to establish their session!
    return {
      user: {
        id: newUser.id,
        full_name: newUser.full_name,
        email: newUser.email,
        phone: newUser.phone,
        status: newUser.status,
      },
      message: 'Account created successfully',
      isMock: true
    };
  }

  // POST /auth/logout
  if (path === '/auth/logout' && method === 'POST') {
    mockStore.isAuthenticated = false;
    mockStore.user = null;
    setAuthToken(null);
    try {
      localStorage.removeItem('serveease_mock_session_user_id');
    } catch {
      // ignore
    }
    return { success: true, isMock: true };
  }

  // GET /addresses
  if (path === '/addresses' && method === 'GET') {
    return { data: mockStore.getAddresses(), isMock: true };
  }

  // POST /addresses
  if (path === '/addresses' && method === 'POST') {
    const body = JSON.parse(options.body || '{}');
    const created = mockStore.addAddress(body);
    return { data: created, isMock: true };
  }

  // PATCH /addresses/:id
  const addressPatchMatch = path.match(/^\/addresses\/(\d+)$/);
  if (addressPatchMatch && method === 'PATCH') {
    const body = JSON.parse(options.body || '{}');
    const updated = mockStore.updateAddress(addressPatchMatch[1], body);
    return { data: updated, isMock: true };
  }

  // DELETE /addresses/:id
  if (addressPatchMatch && method === 'DELETE') {
    mockStore.deleteAddress(addressPatchMatch[1]);
    return { success: true, isMock: true };
  }

  // POST /bookings
  if (path === '/bookings' && method === 'POST') {
    const body = JSON.parse(options.body || '{}');
    const created = mockStore.createBooking(body);
    return { data: created, isMock: true };
  }

  // GET /bookings
  if (path === '/bookings' && method === 'GET') {
    const status = query.get('status');
    return { data: mockStore.getBookings(status), isMock: true };
  }

  // GET /bookings/:id
  const bookingDetailMatch = path.match(/^\/bookings\/(\d+)$/);
  if (bookingDetailMatch && method === 'GET') {
    return { data: mockStore.getBookingById(bookingDetailMatch[1]), isMock: true };
  }

  // PATCH /bookings/:id
  if (bookingDetailMatch && method === 'PATCH') {
    const body = JSON.parse(options.body || '{}');
    const updated = mockStore.updateBookingStatus(bookingDetailMatch[1], body);
    return { data: updated, isMock: true };
  }

  // POST /payments/checkout-session
  if (path === '/payments/checkout-session' && method === 'POST') {
    const body = JSON.parse(options.body || '{}');
    const session = mockStore.createCheckoutSession(body.booking_id, body.payment_method);
    return { data: session, isMock: true };
  }

  // POST /payments/confirm (demo/sandbox webhook mock)
  if (path === '/payments/confirm' && method === 'POST') {
    const body = JSON.parse(options.body || '{}');
    const result = mockStore.confirmPayment(body.booking_id, body);
    return { data: result, isMock: true };
  }

  // GET /payments
  if (path === '/payments' && method === 'GET') {
    return { data: mockStore.getPayments(), isMock: true };
  }

  // GET /payments/:id
  const paymentDetailMatch = path.match(/^\/payments\/(\d+)$/);
  if (paymentDetailMatch && method === 'GET') {
    return { data: mockStore.getPaymentById(paymentDetailMatch[1]), isMock: true };
  }

  throw new ApiError(`Unsupported mock endpoint: ${method} ${path}`, 404);
}
