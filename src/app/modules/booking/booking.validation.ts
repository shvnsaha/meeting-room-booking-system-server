import { z } from 'zod'

// Define the date regex pattern for "YYYY-MM-DD"
const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/

// Define the Zod schema for TBooking
const createBookingValidationSchema = z.object({
  body: z.object({
    date: z
      .string()
      .regex(dateRegex, 'Invalid date format. Expected YYYY-MM-DD'),
    slots: z.array(z.string()),
    room: z.string(),
    user: z.string(),
  }),
})

const updateBookingValidationSchema = z.object({
  body: z.object({
    isConfirmed: z.enum(['confirmed', 'unconfirmed', 'canceled']),
  }),
})

export const BookingValidations = {
  createBookingValidationSchema,
  updateBookingValidationSchema,
}
