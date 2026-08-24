import { z } from 'zod';

export const USER_STATUSES = [
  'active',
  'inactive',
  'invited',
  'suspended',
] as const;
export type UserStatus = (typeof USER_STATUSES)[number];

export const USER_ROLES = [
  'superadmin',
  'admin',
  'manager',
  'cashier',
] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  status: z.enum(USER_STATUSES),
  role: z.enum(USER_ROLES),
  createdAt: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const userListSchema = z.array(userSchema);
