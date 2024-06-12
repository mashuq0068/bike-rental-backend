import { z } from 'zod'

// Zod schema for creating a bike
export const createBikeValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    description: z.string({ required_error: 'description is required' }),
    pricePerHour: z.number({ required_error: 'price per hour is required' }),
    isAvailable: z.boolean().default(true),
    cc: z.number({ required_error: 'CC is required' }),
    year: z.number().int({ message: 'year must be an integer' }),
    model: z.string({ required_error: 'model is required' }),
    brand: z.string({ required_error: 'brand is required' }),
  }),
})

// Zod schema for updating a bike
export const updateBikeValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    pricePerHour: z.number().optional(),
    isAvailable: z.boolean().optional(),
    cc: z.number().optional(),
    year: z.number().int().optional(),
    model: z.string().optional(),
    brand: z.string().optional(),
  }),
})
