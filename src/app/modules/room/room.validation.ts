import { z } from 'zod'

const createRoomValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
      })
      .min(1, 'Name must not be empty'),

    roomNo: z
      .number({
        required_error: 'Room number is required',
        invalid_type_error: 'Room number must be a number',
      })
      .int()
      .nonnegative('Room number must be a non-negative integer'),

    floorNo: z
      .number({
        required_error: 'Floor number is required',
        invalid_type_error: 'Floor number must be a number',
      })
      .int()
      .nonnegative('Floor number must be a non-negative integer'),

    capacity: z
      .number({
        required_error: 'Capacity is required',
        invalid_type_error: 'Capacity must be a number',
      })
      .int()
      .nonnegative('Capacity must be a non-negative integer'),

    pricePerSlot: z
      .number({
        required_error: 'Price per slot is required',
        invalid_type_error: 'Price per slot must be a number',
      })
      .positive('Price per slot must be a positive number'),

    amenities: z
      .array(
        z.string({
          required_error: 'Each amenity must be a string',
          invalid_type_error: 'Amenities must be an array of strings',
        }),
      )
      .min(1, 'There must be at least one amenity'),

    // isDeleted: z.boolean({
    //     required_error: "isDeleted is required",
    //     invalid_type_error: "isDeleted must be a boolean"
    // }).default(false),
  }),
})

export const RoomValidations = {
  createRoomValidationSchema,
}
