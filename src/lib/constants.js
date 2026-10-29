export const SERVICE_CATEGORIES = [
  { id: 'all', name: 'All Services', icon: 'Sparkles', shortName: 'All' },
  { id: 'ac', name: 'AC Services', icon: 'Wind', shortName: 'AC', count: 5 },
  { id: 'appliances', name: 'Appliances', icon: 'Tv', shortName: 'Appliances', count: 6 },
  { id: 'kitchen', name: 'Kitchen Care', icon: 'Flame', shortName: 'Kitchen', count: 4 },
  { id: 'cleaning', name: 'Cleaning', icon: 'Sparkles', shortName: 'Cleaning', count: 6 },
  { id: 'electrician', name: 'Electrician', icon: 'Zap', shortName: 'Electrician', count: 7 },
  { id: 'plumber', name: 'Plumber', icon: 'Droplets', shortName: 'Plumber', count: 5 },
  { id: 'pest_control', name: 'Pest Control', icon: 'ShieldAlert', shortName: 'Pest Control', count: 5 },
  { id: 'carpenter', name: 'Carpenter', icon: 'Hammer', shortName: 'Carpenter', count: 4 },
  { id: 'painting', name: 'Painting & Walls', icon: 'Paintbrush', shortName: 'Painting', count: 4 },
  { id: 'odd_jobs', name: 'Odd Jobs & Mounts', icon: 'Wrench', shortName: 'Odd Jobs', count: 6 },
];

export const CATEGORY_COMPATIBILITY_MAP = {
  home_cleaning: 'cleaning',
  cleaning: 'cleaning',
  ac_appliances: 'ac',
  ac_heating: 'ac',
  handyman: 'odd_jobs',
  carpentry: 'carpenter',
  electrical: 'electrician',
  plumbing: 'plumber',
};

export const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating_desc', label: 'Highest Rated' },
  { value: 'duration_asc', label: 'Fastest Duration' },
];

export const TIME_SLOTS = [
  '08:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '12:00 PM - 02:00 PM',
  '02:00 PM - 04:00 PM',
  '04:00 PM - 06:00 PM',
  '06:00 PM - 08:00 PM',
];

export const BOOKING_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export const PAYMENT_STATUSES = {
  NOT_STARTED: 'not_started',
  PENDING: 'pending',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
};

export const TAX_RATE = 0.05; // 5% GST
export const PLATFORM_FEE = 49; // ₹49 platform & insurance fee

export const PAYMENT_PROMISE = 'Pay after service completion — inspect work before paying';
export const GUARANTEE_PROMISE = '30-day rework guarantee on all verified services';
