import { z } from 'zod'

// Zod schema for creating a booking
export const createBookingValidationSchema = z.object({
  body: z.object({
    userId: z.string({ required_error: 'userId is required' }),
    bikeId: z.string({ required_error: 'bikeId is required' }),
    startTime: z.string({ required_error: 'startTime is required' }),
    returnTime: z.string().optional(),
    totalCost: z.number().default(0),
    isReturned: z.boolean().default(false),
  }),
})

// Zod schema for updating a booking
export const updateBookingValidationSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    bikeId: z.string().optional(),
    startTime: z.string().optional(),
    returnTime: z.string().optional(),
    totalCost: z.number().optional(),
    isReturned: z.boolean().optional(),
  }),
})
