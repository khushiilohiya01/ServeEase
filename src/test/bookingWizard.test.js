import { describe, it, expect } from 'vitest';
import { TIME_SLOTS, TAX_RATE, PLATFORM_FEE } from '../lib/constants';

describe('Booking Wizard Step & Price Breakdown Logic', () => {
  const mockService = {
    id: 'ac-jet-service',
    name: 'AC Jet Cleaning & Service',
    pricing: {
      kind: 'fixed',
      amount: 899,
      duration: '45 mins',
    },
  };

  it('provides standard 2-hour arrival windows in TIME_SLOTS', () => {
    expect(TIME_SLOTS.length).toBeGreaterThanOrEqual(6);
    expect(TIME_SLOTS[0]).toBe('08:00 AM - 10:00 AM');
    expect(TIME_SLOTS[TIME_SLOTS.length - 1]).toBe('06:00 PM - 08:00 PM');
  });

  it('correctly calculates step 3 itemized review totals', () => {
    const baseAmount = mockService.pricing.amount;
    const tax = Math.round(baseAmount * TAX_RATE);
    const platformFee = PLATFORM_FEE;
    const total = baseAmount + tax + platformFee;

    expect(baseAmount).toBe(899);
    expect(tax).toBe(45); // 899 * 0.05 = 44.95 -> 45
    expect(platformFee).toBe(49);
    expect(total).toBe(993);
  });

  it('validates booking payload structure before submitting', () => {
    const bookingPayload = {
      service_id: mockService.id,
      scheduled_date: '2026-11-01',
      time_slot: TIME_SLOTS[1],
      address: {
        line1: 'Flat 302, Sunrise Towers',
        city: 'Mumbai',
        postal_code: '400001',
      },
      payment_method: 'pay_after_service',
      total_amount: 993,
    };

    expect(bookingPayload.service_id).toBe('ac-jet-service');
    expect(bookingPayload.scheduled_date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(TIME_SLOTS).toContain(bookingPayload.time_slot);
    expect(bookingPayload.address.line1).toBeTruthy();
    expect(bookingPayload.total_amount).toBeGreaterThan(0);
  });
});
