import { describe, it, expect } from 'vitest';
import { loginSchema, signupSchema, addressSchema } from '../features/auth/authSchemas';

describe('Authentication & Address Schemas (Zod)', () => {
  describe('loginSchema', () => {
    it('passes with valid email and password >= 6 characters', () => {
      const validData = {
        email: 'rahul.sharma@example.com',
        password: 'demopassword',
      };
      const result = loginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('fails when email format is invalid', () => {
      const invalidData = {
        email: 'not-an-email',
        password: 'demopassword',
      };
      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toMatch(/valid email/i);
    });

    it('fails when password is under 6 characters', () => {
      const invalidData = {
        email: 'test@example.com',
        password: '123',
      };
      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toMatch(/at least 6 characters/i);
    });
  });

  describe('signupSchema', () => {
    it('passes with matching passwords >= 8 chars and valid name', () => {
      const validData = {
        full_name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        password: 'password123',
        confirm_password: 'password123',
      };
      const result = signupSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('fails when passwords do not match', () => {
      const mismatchData = {
        full_name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        password: 'password123',
        confirm_password: 'differentpassword',
      };
      const result = signupSchema.safeParse(mismatchData);
      expect(result.success).toBe(false);
      const matchIssue = result.error?.issues.find((i) => i.path.includes('confirm_password'));
      expect(matchIssue?.message).toBe('Passwords do not match');
    });

    it('fails when full name is shorter than 2 characters', () => {
      const shortName = {
        full_name: 'A',
        email: 'rahul.sharma@example.com',
        password: 'password123',
        confirm_password: 'password123',
      };
      const result = signupSchema.safeParse(shortName);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0].message).toMatch(/at least 2 characters/i);
    });
  });

  describe('addressSchema', () => {
    it('validates a complete residential address', () => {
      const validAddress = {
        label: 'Home',
        line1: 'Flat 402, Green Glen Layout',
        city: 'Bengaluru',
        state: 'Karnataka',
        postal_code: '560103',
      };
      const result = addressSchema.safeParse(validAddress);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.country).toBe('United States'); // default fallback
        expect(result.data.is_default).toBe(false);
      }
    });

    it('rejects an address missing required street line', () => {
      const invalid = {
        label: 'Home',
        line1: '123', // less than 5 chars
        city: 'Bengaluru',
        state: 'Karnataka',
        postal_code: '560103',
      };
      const result = addressSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });
});
