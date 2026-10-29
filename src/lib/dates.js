// Dates are handled as local YYYY-MM-DD keys. toISOString() is UTC, which
// shifts the day for anyone not on UTC (in IST, before 5:30am it gives yesterday).

const pad = (n) => String(n).padStart(2, '0');

export function toDateKey(date = new Date()) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

// "02:00 PM - 04:00 PM" -> { hours: 14, minutes: 0 }
export function parseSlotStart(slot) {
  const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)/i.exec(slot || '');
  if (!match) return null;
  let hours = Number(match[1]) % 12;
  if (match[3].toUpperCase() === 'PM') hours += 12;
  return { hours, minutes: Number(match[2]) };
}

export function slotToDate(dateKey, slot) {
  const start = parseSlotStart(slot);
  const [y, m, d] = (dateKey || '').split('-').map(Number);
  if (!start || !y || !m || !d) return null;
  return new Date(y, m - 1, d, start.hours, start.minutes);
}

export function slotToISO(dateKey, slot) {
  const date = slotToDate(dateKey, slot);
  return date ? date.toISOString() : null;
}

export function isSlotInPast(dateKey, slot, now = new Date()) {
  const date = slotToDate(dateKey, slot);
  return !date || date <= now;
}

// Earliest slot that hasn't started yet, today or later.
export function firstOpenSlot(slots, now = new Date()) {
  for (let i = 0; i < 14; i++) {
    const date = toDateKey(addDays(now, i));
    const slot = slots.find((s) => !isSlotInPast(date, s, now));
    if (slot) return { date, slot };
  }
  return { date: toDateKey(now), slot: slots[0] };
}
