import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { priceBreakdown } from '../lib/pricing';
import { getServiceNumericPrice } from '../data/servicesData';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('serveease_guest_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedBhk, setSelectedBhkState] = useState(() => {
    try {
      return localStorage.getItem('serveease_selected_bhk') || '2BHK';
    } catch {
      return '2BHK';
    }
  });

  const setSelectedBhk = (bhk) => {
    setSelectedBhkState(bhk);
    try {
      localStorage.setItem('serveease_selected_bhk', bhk);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem('serveease_guest_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addToCart = (service, options = {}) => {
    if (!service) return;
    const effectiveBhk = service.pricing?.kind === 'per_bhk'
      ? (typeof options === 'string' ? options : (options.bhk || selectedBhk))
      : null;

    const quantity = typeof options === 'object' && options?.quantity
      ? options.quantity
      : (service.pricing?.kind === 'per_unit' && service.pricing?.min ? service.pricing.min : 1);

    const price = getServiceNumericPrice(service, effectiveBhk, quantity);

    setItems((prev) => {
      const existingIdx = prev.findIndex((i) => i.serviceId === service.id && i.bhk === effectiveBhk);
      if (existingIdx > -1) {
        toast.success(`'${service.name}' is already in your cart`);
        return prev;
      }
      const newItem = {
        cartItemId: `${service.id}-${effectiveBhk || 'std'}-${Date.now()}`,
        serviceId: service.id,
        name: service.name,
        category: service.category,
        image_url: service.image || service.image_url,
        description: service.description,
        pricing: service.pricing,
        isBhkEligible: service.pricing?.kind === 'per_bhk',
        bhk: effectiveBhk,
        quantity,
        price,
      };
      toast.success(`Added '${service.name}' to cart`);
      return [...prev, newItem];
    });
  };

  const addMultipleToCart = (servicesList) => {
    setItems((prev) => {
      const updated = [...prev];
      let addedCount = 0;
      servicesList.forEach(({ service, bhk = selectedBhk, quantity = 1 }) => {
        const effectiveBhk = service.pricing?.kind === 'per_bhk' ? bhk : null;
        const exists = updated.some((i) => i.serviceId === service.id && i.bhk === effectiveBhk);
        if (!exists) {
          const price = getServiceNumericPrice(service, effectiveBhk, quantity);
          updated.push({
            cartItemId: `${service.id}-${effectiveBhk || 'std'}-${Date.now()}-${Math.random()}`,
            serviceId: service.id,
            name: service.name,
            category: service.category,
            image_url: service.image || service.image_url,
            description: service.description,
            pricing: service.pricing,
            isBhkEligible: service.pricing?.kind === 'per_bhk',
            bhk: effectiveBhk,
            quantity,
            price,
          });
          addedCount += 1;
        }
      });
      if (addedCount > 0) {
        toast.success(`Added ${addedCount} services to your cart`);
      } else {
        toast('Selected services are already in your cart');
      }
      return updated;
    });
  };

  const removeFromCart = (cartItemId) => {
    setItems((prev) => {
      const found = prev.find((i) => i.cartItemId === cartItemId);
      if (found) {
        toast.success(`Removed '${found.name}' from cart`);
      }
      return prev.filter((i) => i.cartItemId !== cartItemId);
    });
  };

  const updateBhk = (cartItemId, newBhk) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId && item.pricing?.kind === 'per_bhk') {
          const newPrice = item.pricing.prices[newBhk] ?? item.price;
          return {
            ...item,
            bhk: newBhk,
            price: newPrice,
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const { subtotal, tax, platformFee, total } = priceBreakdown(
    items.reduce((sum, item) => sum + (Number(item.price) || 0), 0)
  );

  const value = {
    items,
    cartCount: items.length,
    subtotal,
    tax,
    platformFee,
    total,
    selectedBhk,
    setSelectedBhk,
    addToCart,
    addMultipleToCart,
    removeFromCart,
    updateBhk,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
