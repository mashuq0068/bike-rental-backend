import { z } from 'zod'

// Regular expression for email validation
const emailRegex = /.+@.+\..+/

// Zod schema for creating a user
export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    email: z
      .string({ required_error: 'email is required' })
      .regex(emailRegex, { message: 'Please enter a valid email address' }),
    password: z.string({ required_error: 'password is required' }),
    phone: z.string({ required_error: 'phone number is required' }),
    address: z.string({ required_error: 'address is required' }),
    role: z.enum(['user', 'admin'], { required_error: 'role is required' }),
  }),
})

// Zod schema for updating a user
export const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z
      .string()
      .regex(emailRegex, { message: 'Please enter a valid email address' })
      .optional(),
    password: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    role: z.enum(['user', 'admin']).optional(),
  }),
})
