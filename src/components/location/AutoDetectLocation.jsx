import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { describeDetectedArea, detectServiceArea } from '../../lib/geolocation';

const CHECKED_KEY = 'serveease_location_checked';

function wasChecked() {
  try {
    return localStorage.getItem(CHECKED_KEY) === 'true';
  } catch {
    return true;
  }
}

function markChecked() {
  try {
    localStorage.setItem(CHECKED_KEY, 'true');
  } catch {
    // ignore
  }
}

// on a visitor's first visit, try to set their service area from their location
export function AutoDetectLocation() {
  const { setSelectedLocation } = useAuth();

  useEffect(() => {
    if (wasChecked()) return;
    let cancelled = false;

    async function detect() {
      // don't nag people who already said no to this site
      if (navigator.permissions?.query) {
        const status = await navigator.permissions.query({ name: 'geolocation' }).catch(() => null);
        if (status?.state === 'denied') {
          markChecked();
          return;
        }
      }

      try {
        const result = await detectServiceArea();
        if (cancelled) return;
        markChecked();
        if (result.covered) {
          setSelectedLocation({
            city: result.city.name,
            locality: result.locality.name,
            pincode: result.locality.pincode,
          });
          toast.success(describeDetectedArea(result), { duration: result.isApproximate ? 6000 : 4000 });
        }
      } catch {
        // denied or unavailable: keep the default area, they can still pick one
        if (!cancelled) markChecked();
      }
    }

    detect();
    return () => {
      cancelled = true;
    };
    // run once per page load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
