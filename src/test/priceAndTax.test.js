import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDuration, getStatusBadgeVariant } from '../lib/formatters';
import { TAX_RATE, PLATFORM_FEE } from '../lib/constants';

describe('Pricing, Tax & Formatter Calculations', () => {
  it('formats currency correctly in INR format', () => {
    const formatted = formatCurrency(1499);
    // Should format with rupee symbol or INR currency conventions
    expect(formatted).toContain('1,499');
  });

  it('handles string amounts and fallback numbers in formatCurrency', () => {
    expect(formatCurrency('299')).toContain('299');
    expect(formatCurrency(null)).toContain('0');
  });

  it('correctly calculates 5% GST tax and platform fee', () => {
    const basePrice = 1000;
    const tax = Math.round(basePrice * TAX_RATE);
    const total = basePrice + tax + PLATFORM_FEE;

    expect(TAX_RATE).toBe(0.05);
    expect(PLATFORM_FEE).toBe(49);
    expect(tax).toBe(50);
    expect(total).toBe(1099);
  });

  it('formats duration in hours and minutes cleanly', () => {
    expect(formatDuration(45)).toBe('45 min');
    expect(formatDuration(60)).toBe('1 hr');
    expect(formatDuration(90)).toBe('1 hr 30 min');
    expect(formatDuration(120)).toBe('2 hr');
    expect(formatDuration(null)).toBe('45 mins');
  });

  it('returns appropriate badge variants for booking statuses', () => {
    expect(getStatusBadgeVariant('confirmed').variant).toBe('success');
    expect(getStatusBadgeVariant('completed').variant).toBe('success');
    expect(getStatusBadgeVariant('pending').variant).toBe('warning');
    expect(getStatusBadgeVariant('in_progress').variant).toBe('warning');
    expect(getStatusBadgeVariant('cancelled').variant).toBe('danger');
    expect(getStatusBadgeVariant('unknown').variant).toBe('neutral');
  });
});
