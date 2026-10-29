import { describe, it, expect } from 'vitest';
import { toDateKey, parseSlotStart, slotToDate, isSlotInPast, firstOpenSlot } from '../lib/dates';
import { TIME_SLOTS } from '../lib/constants';

describe('dates', () => {
  it('uses the local calendar day, not UTC', () => {
    // 1:00am local on Nov 5 is still Nov 4 in UTC for anyone east of UTC
    expect(toDateKey(new Date(2026, 10, 5, 1, 0))).toBe('2026-11-05');
  });

  it('parses AM/PM slot starts', () => {
    expect(parseSlotStart('08:00 AM - 10:00 AM')).toEqual({ hours: 8, minutes: 0 });
    expect(parseSlotStart('12:00 PM - 02:00 PM')).toEqual({ hours: 12, minutes: 0 });
    expect(parseSlotStart('02:00 PM - 04:00 PM')).toEqual({ hours: 14, minutes: 0 });
    expect(parseSlotStart('nonsense')).toBeNull();
  });

  it('builds the scheduled time from date + slot', () => {
    const d = slotToDate('2026-11-05', '04:00 PM - 06:00 PM');
    expect([d.getFullYear(), d.getMonth(), d.getDate(), d.getHours()]).toEqual([2026, 10, 5, 16]);
  });

  it('treats slots that already started as past', () => {
    const now = new Date(2026, 10, 5, 11, 30);
    expect(isSlotInPast('2026-11-05', '10:00 AM - 12:00 PM', now)).toBe(true);
    expect(isSlotInPast('2026-11-05', '12:00 PM - 02:00 PM', now)).toBe(false);
  });

  it('rolls over to tomorrow once the last slot has started', () => {
    const lateEvening = new Date(2026, 10, 5, 19, 0);
    expect(firstOpenSlot(TIME_SLOTS, lateEvening)).toEqual({ date: '2026-11-06', slot: TIME_SLOTS[0] });
  });
});
