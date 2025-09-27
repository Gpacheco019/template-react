import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(2),
});

export type LoginSchema = z.infer<typeof loginSchema>;