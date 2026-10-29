import { TAX_RATE, PLATFORM_FEE } from './constants';

// Everything is rounded to whole rupees, same as what we display.
export function priceBreakdown(subtotal) {
  const base = Math.max(0, Math.round(Number(subtotal) || 0));
  const tax = Math.round(base * TAX_RATE);
  const platformFee = base > 0 ? PLATFORM_FEE : 0;
  return { subtotal: base, tax, platformFee, total: base + tax + platformFee };
}
