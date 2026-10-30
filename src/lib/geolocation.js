import { findLocalityByPincode, findNearestLocality } from '../data/locationsData';

// free OpenStreetMap reverse geocoder, no API key needed
const REVERSE_GEOCODE_URL = 'https://nominatim.openstreetmap.org/reverse';

// how far from one of our localities we still count as "in the service area"
const SERVICE_RADIUS_KM = 25;

// good enough to name the right neighbourhood; stop waiting once we have this
const TARGET_ACCURACY_M = 100;
const MAX_WAIT_MS = 12000;

// Watches the position for a few seconds and keeps the most accurate fix.
// The first reading on a laptop is often a rough Wi-Fi/IP guess that gets
// refined over the next few seconds, so taking the first one is what made
// detection land in the wrong area.
export function getCurrentCoords() {
  return new Promise((resolve, reject) => {
    if (!window.isSecureContext || !('geolocation' in navigator)) {
      const err = new Error('Geolocation is not available');
      err.code = 'unsupported';
      reject(err);
      return;
    }

    let best = null;
    let watchId = null;
    let timer = null;

    const finish = () => {
      clearTimeout(timer);
      navigator.geolocation.clearWatch(watchId);
      resolve(best);
    };

    watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        if (!best || accuracy < best.accuracy) {
          best = { lat: latitude, lng: longitude, accuracy };
        }
        if (accuracy <= TARGET_ACCURACY_M) finish();
      },
      (err) => {
        // keep waiting for a better fix unless the user said no or we have nothing at all
        if (err.code === 1 || !best) {
          clearTimeout(timer);
          navigator.geolocation.clearWatch(watchId);
          if (best) resolve(best);
          else reject(err);
        }
      },
      { enableHighAccuracy: true, timeout: MAX_WAIT_MS, maximumAge: 0 }
    );

    timer = setTimeout(() => {
      if (best) finish();
    }, MAX_WAIT_MS);
  });
}

export async function reverseGeocode({ lat, lng }) {
  const params = new URLSearchParams({
    format: 'jsonv2',
    lat: String(lat),
    lon: String(lng),
    addressdetails: '1',
    'accept-language': 'en',
  });
  const res = await fetch(`${REVERSE_GEOCODE_URL}?${params}`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`Reverse geocoding failed (${res.status})`);

  const { address: a = {} } = await res.json();
  const area = a.suburb || a.neighbourhood || a.quarter || a.city_district || a.village || a.town;

  return {
    line1: [a.house_number, a.building, a.road].filter(Boolean).join(', '),
    line2: [a.neighbourhood, a.suburb].filter(Boolean).filter((v, i, arr) => arr.indexOf(v) === i).join(', '),
    area,
    city: a.city || a.town || a.state_district || a.county || a.village || '',
    state: a.state || '',
    postal_code: (a.postcode || '').replace(/\s/g, ''),
  };
}

// above this the fix is probably a Wi-Fi/IP guess, so we tell the user to double-check
export const APPROXIMATE_ACCURACY_M = 1000;

// works out where the user is and whether we serve that city
export async function detectServiceArea() {
  const coords = await getCurrentCoords();
  const place = await reverseGeocode(coords).catch(() => null);
  const isApproximate = coords.accuracy > APPROXIMATE_ACCURACY_M;

  const byPincode = place?.postal_code ? findLocalityByPincode(place.postal_code) : null;
  if (byPincode) return { covered: true, ...byPincode, place, accuracy: coords.accuracy, isApproximate };

  const nearest = findNearestLocality(coords.lat, coords.lng);
  if (nearest.distanceKm > SERVICE_RADIUS_KM) {
    return { covered: false, place, accuracy: coords.accuracy, isApproximate };
  }

  // we serve this city: use the user's real neighbourhood, not just our closest listed one
  return {
    covered: true,
    city: nearest.city,
    locality: {
      name: place?.area || nearest.locality.name,
      pincode: place?.postal_code || nearest.locality.pincode,
    },
    place,
    accuracy: coords.accuracy,
    isApproximate,
  };
}

export function describeDetectedArea(result) {
  const area = `${result.locality.name}, ${result.city.name}`;
  if (!result.isApproximate) return `Location set to ${area}`;
  const km = Math.max(1, Math.round(result.accuracy / 1000));
  return `Location set to ${area}. Your device could only place you within ~${km} km, so change it if that's wrong.`;
}

export function describeGeoError(err) {
  if (err?.code === 'unsupported') {
    return 'Location detection needs a secure (https) page and a browser that supports it. Please pick your area below.';
  }
  if (err?.code === 1) {
    return 'Location access is blocked. Allow it from the icon in your browser address bar, or pick your area below.';
  }
  if (err?.code === 2) {
    return "Your device couldn't find your location. Check that location services are turned on, or pick your area below.";
  }
  if (err?.code === 3) {
    return 'Finding your location took too long. Try again, or pick your area below.';
  }
  return 'We could not detect your location. Please search by locality or pincode.';
}
