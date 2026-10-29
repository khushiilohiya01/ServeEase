import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const signupSchema = z
  .object({
    full_name: z.string().trim().min(2, 'Full name must be at least 2 characters'),
    email: z.string().trim().email('Please enter a valid email address'),
    phone: z.string().trim().optional(),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirm_password: z.string().min(8, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export const addressSchema = z.object({
  label: z.string().trim().min(1, 'Label is required (e.g., Home, Office)'),
  line1: z.string().trim().min(5, 'Street address is required'),
  line2: z.string().trim().optional(),
  city: z.string().trim().min(2, 'City is required'),
  state: z.string().trim().min(2, 'State is required'),
  postal_code: z.string().trim().min(3, 'PIN code is required'),
  country: z.string().trim().default('India'),
  is_default: z.boolean().default(false),
});
