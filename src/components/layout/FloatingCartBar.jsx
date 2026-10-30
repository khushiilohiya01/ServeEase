import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../lib/formatters';

// pages that already show the cart or are mid-booking don't need the bar
const HIDDEN_ON = ['/cart', '/checkout', '/booking', '/login', '/signup'];

export function FloatingCartBar() {
  const { cartCount, subtotal } = useCart();
  const { pathname } = useLocation();
  const [isFooterInView, setIsFooterInView] = useState(false);

  // slide away at the bottom of the page so the footer isn't covered
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => setIsFooterInView(entry.isIntersecting), {
      rootMargin: '0px 0px -80px 0px',
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const isHidden = HIDDEN_ON.some((path) => pathname.startsWith(path));
  const isVisible = cartCount > 0 && !isHidden && !isFooterInView;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-5 left-4 right-20 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-[420px] z-40"
        >
          <Link
            to="/cart"
            className="btn-shine group flex items-center justify-between gap-3 pl-3 pr-4 py-2.5 rounded-2xl bg-[#173D32] text-white shadow-2xl shadow-[#173D32]/30 hover:bg-[#245544] transition-colors"
          >
            <span className="flex items-center gap-3 min-w-0">
              <span className="relative w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <ShoppingBag className="w-4.5 h-4.5" />
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.3 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#A9C9AC] text-[#173D32] text-[10px] font-bold flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-white/70 leading-tight">
                  {cartCount} {cartCount === 1 ? 'service' : 'services'} in cart
                </span>
                <span className="block text-sm font-bold leading-tight">{formatCurrency(subtotal)}</span>
              </span>
            </span>
            <span className="flex items-center gap-1.5 text-sm font-semibold shrink-0">
              View cart
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
