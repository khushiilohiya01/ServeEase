import { describe, it, expect, beforeEach, vi } from 'vitest';

let apiRequest;

async function login() {
  await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: 'rahul.sharma@example.com', password: 'demopassword' }),
  });
}

const post = (path, body) => apiRequest(path, { method: 'POST', body: JSON.stringify(body) });

beforeEach(async () => {
  localStorage.clear();
  vi.resetModules();
  ({ apiRequest } = await import('../lib/apiClient'));
  await login();
});

describe('mock api: bookings', () => {
  it('books the service that was actually picked', async () => {
    const { data } = await post('/bookings', { service_id: 'tap-leaking', address_id: 1 });
    expect(data.service_id).toBe('tap-leaking');
  });

  it('prices from the catalogue and ignores totals sent by the client', async () => {
    const { data } = await post('/bookings', {
      service_id: 'ac-service-jet-wash',
      address_id: 1,
      custom_total: 1,
    });
    expect(data.subtotal).toBe(599);
    expect(data.tax_amount).toBe(30);
    expect(data.total_amount).toBe(599 + 30 + 49);
  });

  it('refuses to book without an address instead of inventing one', async () => {
    await expect(post('/bookings', { service_id: 'tap-leaking', address_id: 999 })).rejects.toThrow(/address/i);
  });

  it('can open the seeded bookings that use string ids', async () => {
    const { data } = await apiRequest('/bookings/SE-26K701');
    expect(data.id).toBe('SE-26K701');
  });

  it("does not return another user's booking", async () => {
    await apiRequest('/auth/logout', { method: 'POST' });
    await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'alex.rivera@example.com', password: 'demo1234' }),
    });
    await expect(apiRequest('/bookings/SE-26K701')).rejects.toThrow(/not found/i);
  });
});
