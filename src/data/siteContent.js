/**
 * Core content model for ServeEase
 * Stores structured data for pricing matrix, locations, room simulator jobs, and search placeholders.
 */

export const CITIES = [
  { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', popular: true, areas: ['Indiranagar', 'Koramangala', 'Whitefield', 'HSR Layout', 'Bellandur', 'Jayanagar'] },
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', popular: true, areas: ['Bandra', 'Andheri West', 'Powai', 'Worli', 'Thane', 'Juhu'] },
  { id: 'delhi', name: 'Delhi NCR', state: 'Delhi / Haryana / UP', popular: true, areas: ['South Delhi', 'DLF Phase 5', 'Cyber City', 'Noida Sector 62', 'Vasant Kunj'] },
  { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', popular: true, areas: ['Gachibowli', 'Hitec City', 'Jubilee Hills', 'Madhapur', 'Kondapur'] },
  { id: 'pune', name: 'Pune', state: 'Maharashtra', popular: true, areas: ['Koregaon Park', 'Kothrud', 'Baner', 'Viman Nagar', 'Wakad'] },
  { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', popular: true, areas: ['Adyar', 'Anna Nagar', 'OMR', 'Besant Nagar', 'T. Nagar'] },
  { id: 'kolkata', name: 'Kolkata', state: 'West Bengal', popular: false, areas: ['Salt Lake', 'New Town', 'Ballygunge', 'Alipore', 'Park Street'] },
  { id: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', popular: false, areas: ['Bodakdev', 'Satellite', 'Vastrapur', 'Prahlad Nagar', 'SG Highway'] },
];

export const SEARCH_PLACEHOLDERS = [
  'Bathroom tile deep scrubbing...',
  'Leaking kitchen tap...',
  'Deep clean before Diwali...',
  'AC not cooling...',
  'Switchboard spark repair...',
  'Wall dampness seepage coating...',
  'Chimney oil degreasing...',
  'Fan regulator replacement...',
];

export const ROOM_SIMULATOR_JOBS = [
  {
    id: 'tap',
    step: 1,
    tabLabel: '1 Kitchen',
    title: 'Kitchen Tap Leak',
    code: 'JOB 01: KITCHEN TAP LEAK',
    description: 'High-precision washer replacement seals dripping fixture permanently.',
    badge: 'Plumbing Specialty',
    issueTag: 'Continuous Drip',
    fixedTag: 'Washer Replaced • Sealed',
    actionPrompt: 'Fix Tap Leak',
    detail: 'Replaced degraded ceramic disc cartridge & silicone washer. Tested under 3.5 bar pressure.',
    serviceSlug: 'plumbing-repair',
    serviceId: 3,
  },
  {
    id: 'ceiling',
    step: 2,
    tabLabel: '2 Ceiling',
    title: 'Ceiling Fixture Repair',
    code: 'JOB 02: CEILING FIXTURE REPAIR',
    description: 'Neutral wire rewiring fixes intermittent flicker and restores balanced lumens.',
    badge: 'Electrical Specialty',
    issueTag: 'Wiring Flicker',
    fixedTag: 'Rewired • Balanced Lumens',
    actionPrompt: 'Fix Wiring Flicker',
    detail: 'Neutral line respliced with insulated screw connectors. Stable 18W warm illumination restored.',
    serviceSlug: 'electrician',
    serviceId: 10,
  },
  {
    id: 'wall',
    step: 3,
    tabLabel: '3 Wall',
    title: 'Wall Dampness Coverage',
    code: 'JOB 03: WALL DAMPNESS COVERAGE',
    description: 'Waterproof sealant and emulsion touch-up eliminate water stains seamlessly.',
    badge: 'Painting Specialty',
    issueTag: 'Wall Dampness Stain',
    fixedTag: 'Waterproof Sealant Applied',
    actionPrompt: 'Seal & Paint Wall',
    detail: 'Applied 2-coat anti-efflorescence primer followed by color-matched matte acrylic emulsion.',
    serviceSlug: 'painting-touch-ups',
    serviceId: 16,
  },
];

export const APARTMENT_SIZES = [
  { id: '1bhk', level: 1, label: '1 BHK', subtitle: '450 - 650 sq ft', rooms: '1 Bedroom • 1 Bath • Living' },
  { id: '2bhk', level: 2, label: '2 BHK', subtitle: '750 - 1,100 sq ft', rooms: '2 Bedrooms • 2 Baths • Living & Dining' },
  { id: '3bhk', level: 3, label: '3 BHK', subtitle: '1,250 - 1,750 sq ft', rooms: '3 Bedrooms • 3 Baths • Living, Dining & Balconies' },
  { id: '4bhk', level: 4, label: '4 BHK+', subtitle: '1,850 - 2,800+ sq ft', rooms: '4+ Bedrooms • Multiple Baths • Duplex / Villa' },
];

export const PRICING_SERVICES = [
  {
    id: 'cleaning',
    name: 'Full Home Deep Cleaning',
    serviceId: 1,
    inclusions: 'Intensive scrubbing, machine floor buffing, bathroom descaling, kitchen grease removal',
    rates: {
      1: { price: 1499, originalPrice: 1999, duration: '2.5 - 3 hrs', crew: '2 Certified Cleaners' },
      2: { price: 2299, originalPrice: 2899, duration: '3.5 - 4 hrs', crew: '2 Certified Cleaners' },
      3: { price: 3199, originalPrice: 3999, duration: '4.5 - 5 hrs', crew: '3 Certified Cleaners' },
      4: { price: 4299, originalPrice: 5299, duration: '5.5 - 6.5 hrs', crew: '4 Certified Cleaners' },
    },
  },
  {
    id: 'painting',
    name: 'Full Home Express Painting',
    serviceId: 5,
    inclusions: '2 coats premium anti-fungal emulsion, minor wall crack putty, complete masking protection',
    rates: {
      1: { price: 4999, originalPrice: 6200, duration: '1 - 2 Days', crew: '2 Master Painters' },
      2: { price: 7999, originalPrice: 9800, duration: '2 - 3 Days', crew: '2 Master Painters' },
      3: { price: 11999, originalPrice: 14500, duration: '3 - 4 Days', crew: '3 Master Painters' },
      4: { price: 16999, originalPrice: 20500, duration: '4 - 5 Days', crew: '4 Master Painters' },
    },
  },
  {
    id: 'electrical',
    name: 'Electrical Safety Audit & Fixes',
    serviceId: 4,
    inclusions: 'Complete distribution box MCB test, earthing audit, up to 3 switchboard replacements',
    rates: {
      1: { price: 499, originalPrice: 699, duration: '45 - 60 mins', crew: '1 Licensed Electrician' },
      2: { price: 799, originalPrice: 1099, duration: '1.5 hrs', crew: '1 Licensed Electrician' },
      3: { price: 1199, originalPrice: 1599, duration: '2 hrs', crew: '1 Licensed Electrician' },
      4: { price: 1599, originalPrice: 2099, duration: '2.5 hrs', crew: '2 Licensed Electricians' },
    },
  },
  {
    id: 'plumbing',
    name: 'Plumbing Deep Check & Descaling',
    serviceId: 3,
    inclusions: 'Tap descaling, flush tank valve tuning, water pressure check, drain unclog inspection',
    rates: {
      1: { price: 599, originalPrice: 799, duration: '1 hr', crew: '1 Certified Plumber' },
      2: { price: 899, originalPrice: 1199, duration: '1.5 hrs', crew: '1 Certified Plumber' },
      3: { price: 1299, originalPrice: 1699, duration: '2 hrs', crew: '1 Certified Plumber' },
      4: { price: 1699, originalPrice: 2199, duration: '2.5 hrs', crew: '2 Certified Plumber' },
    },
  },
  {
    id: 'ac_service',
    name: 'AC Multi-Split Jet Servicing',
    serviceId: 6,
    inclusions: 'High pressure pump coil wash, cooling tray disinfectant foam, gas pressure calibration',
    rates: {
      1: { price: 899, originalPrice: 1199, duration: '1 hr (1 AC)', crew: '1 HVAC Specialist' },
      2: { price: 1699, originalPrice: 2299, duration: '1.5 hrs (2 ACs)', crew: '1 HVAC Specialist' },
      3: { price: 2499, originalPrice: 3299, duration: '2 hrs (3 ACs)', crew: '2 HVAC Specialists' },
      4: { price: 3299, originalPrice: 4299, duration: '2.5 hrs (4 ACs)', crew: '2 HVAC Specialists' },
    },
  },
];
