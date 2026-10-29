
export const CITIES_CONFIG = [
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    defaultLocality: 'Koramangala',
    defaultPincode: '560034',
    lat: 12.9716,
    lng: 77.5946,
    languageSuggestion: 'kn', // Kannada
    localities: [
      { name: 'Koramangala', pincode: '560034', lat: 12.9352, lng: 77.6245 },
      { name: 'Indiranagar', pincode: '560038', lat: 12.9784, lng: 77.6408 },
      { name: 'HSR Layout', pincode: '560102', lat: 12.9121, lng: 77.6446 },
      { name: 'Whitefield', pincode: '560066', lat: 12.9698, lng: 77.7500 },
      { name: 'Bellandur', pincode: '560103', lat: 12.9260, lng: 77.6762 },
      { name: 'Jayanagar', pincode: '560041', lat: 12.9308, lng: 77.5838 },
      { name: 'Electronic City', pincode: '560100', lat: 12.8399, lng: 77.6770 },
      { name: 'Hebbal', pincode: '560024', lat: 13.0358, lng: 77.5970 },
      { name: 'Marathahalli', pincode: '560037', lat: 12.9591, lng: 77.6974 },
      { name: 'Malleshwaram', pincode: '560003', lat: 13.0031, lng: 77.5643 },
    ],
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    defaultLocality: 'Andheri West',
    defaultPincode: '400058',
    lat: 19.0760,
    lng: 72.8777,
    languageSuggestion: 'mr', // Marathi
    localities: [
      { name: 'Andheri West', pincode: '400058', lat: 19.1363, lng: 72.8277 },
      { name: 'Bandra West', pincode: '400050', lat: 19.0596, lng: 72.8295 },
      { name: 'Powai', pincode: '400076', lat: 19.1176, lng: 72.9060 },
      { name: 'Thane West', pincode: '400601', lat: 19.2183, lng: 72.9781 },
      { name: 'Malad West', pincode: '400064', lat: 19.1874, lng: 72.8484 },
      { name: 'Chembur', pincode: '400071', lat: 19.0522, lng: 72.8994 },
      { name: 'Borivali West', pincode: '400092', lat: 19.2307, lng: 72.8567 },
      { name: 'Dadar West', pincode: '400028', lat: 19.0178, lng: 72.8478 },
    ],
  },
  {
    id: 'delhi',
    name: 'Delhi NCR',
    state: 'Delhi / NCR',
    defaultLocality: 'South Extension',
    defaultPincode: '110049',
    lat: 28.6139,
    lng: 77.2090,
    languageSuggestion: 'hi', // Hindi
    localities: [
      { name: 'South Extension', pincode: '110049', lat: 28.5729, lng: 77.2229 },
      { name: 'Vasant Kunj', pincode: '110070', lat: 28.5293, lng: 77.1524 },
      { name: 'Saket', pincode: '110017', lat: 28.5244, lng: 77.2167 },
      { name: 'Dwarka Sector 10', pincode: '110075', lat: 28.5815, lng: 77.0594 },
      { name: 'DLF Phase 5', pincode: '122009', lat: 28.4485, lng: 77.0988 },
      { name: 'Cyber City', pincode: '122002', lat: 28.4950, lng: 77.0895 },
      { name: 'Noida Sector 62', pincode: '201309', lat: 28.6271, lng: 77.3653 },
      { name: 'Indirapuram', pincode: '201014', lat: 28.6415, lng: 77.3714 },
    ],
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    defaultLocality: 'Gachibowli',
    defaultPincode: '500032',
    lat: 17.3850,
    lng: 78.4867,
    languageSuggestion: 'te', // Telugu
    localities: [
      { name: 'Gachibowli', pincode: '500032', lat: 17.4401, lng: 78.3489 },
      { name: 'Hitec City', pincode: '500081', lat: 17.4435, lng: 78.3772 },
      { name: 'Jubilee Hills', pincode: '500033', lat: 17.4319, lng: 78.4073 },
      { name: 'Madhapur', pincode: '500081', lat: 17.4483, lng: 78.3915 },
      { name: 'Kondapur', pincode: '500084', lat: 17.4699, lng: 78.3578 },
      { name: 'Banjara Hills', pincode: '500034', lat: 17.4156, lng: 78.4350 },
      { name: 'Kukatpally', pincode: '500072', lat: 17.4849, lng: 78.4138 },
      { name: 'Begumpet', pincode: '500016', lat: 17.4447, lng: 78.4664 },
    ],
  },
  {
    id: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    defaultLocality: 'Koregaon Park',
    defaultPincode: '411001',
    lat: 18.5204,
    lng: 73.8567,
    languageSuggestion: 'mr', // Marathi
    localities: [
      { name: 'Koregaon Park', pincode: '411001', lat: 18.5362, lng: 73.8940 },
      { name: 'Kothrud', pincode: '411038', lat: 18.5074, lng: 73.8077 },
      { name: 'Baner', pincode: '411045', lat: 18.5590, lng: 73.7868 },
      { name: 'Viman Nagar', pincode: '411014', lat: 18.5679, lng: 73.9143 },
      { name: 'Wakad', pincode: '411057', lat: 18.5987, lng: 73.7688 },
      { name: 'Hinjawadi', pincode: '411057', lat: 18.5913, lng: 73.7389 },
      { name: 'Aundh', pincode: '411007', lat: 18.5580, lng: 73.8075 },
      { name: 'Magarpatta', pincode: '411028', lat: 18.5135, lng: 73.9284 },
    ],
  },
  {
    id: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    defaultLocality: 'Adyar',
    defaultPincode: '600020',
    lat: 13.0827,
    lng: 80.2707,
    languageSuggestion: 'ta', // Tamil
    localities: [
      { name: 'Adyar', pincode: '600020', lat: 13.0012, lng: 80.2565 },
      { name: 'Anna Nagar', pincode: '600040', lat: 13.0850, lng: 80.2101 },
      { name: 'OMR Thoraipakkam', pincode: '600097', lat: 12.9388, lng: 80.2312 },
      { name: 'Besant Nagar', pincode: '600090', lat: 13.0003, lng: 80.2667 },
      { name: 'T. Nagar', pincode: '600017', lat: 13.0418, lng: 80.2341 },
      { name: 'Velachery', pincode: '600042', lat: 12.9759, lng: 80.2212 },
      { name: 'Mylapore', pincode: '600004', lat: 13.0368, lng: 80.2676 },
      { name: 'Nungambakkam', pincode: '600034', lat: 13.0569, lng: 80.2425 },
    ],
  },
];

export function getLocalityProof(locality = 'Koramangala') {
  let hash = 0;
  for (let i = 0; i < locality.length; i++) {
    hash = (hash << 5) - hash + locality.charCodeAt(i);
    hash |= 0;
  }
  const pros = 14 + (Math.abs(hash) % 15); // 14 to 28 pros
  const slots = [
    'Next slot today, 3–5 PM',
    'Next slot today, 4–6 PM',
    'Next slot today, 5–7 PM',
    'Next slot in 45 mins',
  ];
  const slot = slots[Math.abs(hash) % slots.length];
  return `${pros} pros active near ${locality} · ${slot}`;
}

function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function findNearestLocality(userLat, userLng) {
  let nearestCity = CITIES_CONFIG[0];
  let nearestLocality = CITIES_CONFIG[0].localities[0];
  let minDistance = Infinity;

  for (const city of CITIES_CONFIG) {
    for (const loc of city.localities) {
      if (loc.lat && loc.lng) {
        const d = calculateDistanceKm(userLat, userLng, loc.lat, loc.lng);
        if (d < minDistance) {
          minDistance = d;
          nearestCity = city;
          nearestLocality = loc;
        }
      }
    }
  }

  return {
    city: nearestCity,
    locality: nearestLocality,
    distanceKm: minDistance,
  };
}

export function findLocalityByPincode(pincode) {
  const cleanPin = (pincode || '').trim();
  for (const city of CITIES_CONFIG) {
    const matched = city.localities.find((l) => l.pincode === cleanPin);
    if (matched) {
      return {
        city,
        locality: matched,
      };
    }
  }
  return null;
}

export function searchLocalities(query) {
  const q = (query || '').toLowerCase().trim();
  if (!q) return [];

  const results = [];
  for (const city of CITIES_CONFIG) {
    for (const loc of city.localities) {
      if (
        loc.name.toLowerCase().includes(q) ||
        loc.pincode.includes(q) ||
        city.name.toLowerCase().includes(q)
      ) {
        results.push({
          city,
          locality: loc,
        });
      }
    }
  }
  return results;
}
