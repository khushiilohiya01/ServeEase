import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDuration, getStatusBadgeVariant } from '../lib/formatters';
import { priceBreakdown } from '../lib/pricing';

describe('Pricing, Tax & Formatter Calculations', () => {
  it('formats currency correctly in INR format', () => {
    const formatted = formatCurrency(1499);
    expect(formatted).toContain('1,499');
  });

  it('handles string amounts and fallback numbers in formatCurrency', () => {
    expect(formatCurrency('299')).toContain('299');
    expect(formatCurrency(null)).toContain('0');
  });

  it('adds 5% GST and the platform fee', () => {
    expect(priceBreakdown(1000)).toEqual({ subtotal: 1000, tax: 50, platformFee: 49, total: 1099 });
    expect(priceBreakdown(899).tax).toBe(45);
  });

  it('does not charge a platform fee on a free visit', () => {
    expect(priceBreakdown(0)).toEqual({ subtotal: 0, tax: 0, platformFee: 0, total: 0 });
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
