import { z } from "zod"

const timeStringSchema = z.string().refine(
    (time) => {
      const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; 
      return regex.test(time);
    },
    {
      message: 'Invalid time format , expected "HH:MM" in 24 hours format',
    },
  );

const createSlotValidationSchema = z.object({
    body: z.object({
        room: z.string({
            required_error: 'Room is required',
          }),
          date: z.string({
            required_error:'Name is required'
          }),
          startTime: timeStringSchema,
          endTime: timeStringSchema,
          isBooked: z.boolean().default(false).optional()

    })
  })
  
  export const SlotValidations = {
    createSlotValidationSchema,   
  }
  