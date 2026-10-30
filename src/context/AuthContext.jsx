import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiRequest, setAuthToken, getAuthToken } from '../lib/apiClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getAuthToken());
  const [isLoading, setIsLoading] = useState(true);

  const checkSession = useCallback(async () => {
    const existingToken = getAuthToken();
    if (!existingToken) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiRequest('/auth/me', { method: 'GET' });
      setUser(response?.data || response?.user || null);
    } catch (err) {
      console.warn('Session expired or invalid:', err.message);
      setAuthToken(null);
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isCurrent = true;
    const init = async () => {
      await Promise.resolve();
      if (isCurrent) {
        checkSession();
      }
    };
    init();
    return () => {
      isCurrent = false;
    };
  }, [checkSession]);

  const login = async ({ email, password }) => {
    const res = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const authToken = res.token || 'demo_session_token';
    const authUser = res.user || { id: 1, email, full_name: 'Customer', status: 'active' };

    setAuthToken(authToken);
    setToken(authToken);
    setUser(authUser);
    return authUser;
  };

  const register = async ({ full_name, email, password, phone }) => {
    const res = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ full_name, email, password, phone }),
    });

    return res?.user || { full_name, email };
  };

  const logout = async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } catch {
      // clear local state anyway
    } finally {
      setAuthToken(null);
      setToken(null);
      setUser(null);
    }
  };

  const updateProfile = (updatedFields) => {
    setUser((prev) => (prev ? { ...prev, ...updatedFields } : null));
  };

  const [authModalState, setAuthModalState] = useState({ isOpen: false, mode: 'signin' });
  const [selectedCity, setSelectedCityState] = useState(() => {
    return localStorage.getItem('serveease_city') || 'Bengaluru';
  });
  const [selectedLocality, setSelectedLocalityState] = useState(() => {
    return localStorage.getItem('serveease_locality') || 'Koramangala';
  });
  const [selectedPincode, setSelectedPincodeState] = useState(() => {
    return localStorage.getItem('serveease_pincode') || '560034';
  });

  const setSelectedCity = (city) => {
    setSelectedCityState(city);
    try {
      localStorage.setItem('serveease_city', city);
    } catch {
      // ignore
    }
  };

  const setSelectedLocality = (locality) => {
    setSelectedLocalityState(locality);
    try {
      localStorage.setItem('serveease_locality', locality);
    } catch {
      // ignore
    }
  };

  const setSelectedLocation = ({ city, locality, pincode }) => {
    try {
      // once an area is chosen (by hand or detected) we stop auto-detecting
      localStorage.setItem('serveease_location_checked', 'true');
    } catch {
      // ignore
    }
    if (city) {
      setSelectedCityState(city);
      try {
        localStorage.setItem('serveease_city', city);
      } catch {
        // ignore
      }
    }
    if (locality) {
      setSelectedLocalityState(locality);
      try {
        localStorage.setItem('serveease_locality', locality);
      } catch {
        // ignore
      }
    }
    if (pincode) {
      setSelectedPincodeState(pincode);
      try {
        localStorage.setItem('serveease_pincode', pincode);
      } catch {
        // ignore
      }
    }
  };

  const openAuthModal = (mode = 'signin') => {
    setAuthModalState({ isOpen: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const setAuthModalMode = (mode) => {
    setAuthModalState((prev) => ({ ...prev, mode }));
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    refreshSession: checkSession,
    authModalState,
    openAuthModal,
    closeAuthModal,
    setAuthModalMode,
    selectedCity,
    setSelectedCity,
    selectedLocality,
    setSelectedLocality,
    selectedPincode,
    setSelectedLocation,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
