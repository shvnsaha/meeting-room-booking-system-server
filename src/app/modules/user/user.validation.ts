import { z } from 'zod'

const createUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Email must be a string',
      })
      .min(2, 'Name must be at least 2 characters long')
      .max(50, 'Name cannot exceed 50 characters'),

    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email()
      .min(5, 'Email must be at least 5 characters long')
      .max(100, 'Email cannot exceed 100 characters'),

    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Email must be a string',
      })
      .min(6, 'Password must be at least 6 characters long')
      .max(50, 'Password cannot exceed 50 characters'),

    phone: z
      .string({
        required_error: 'Phone is required',
        invalid_type_error: 'Phone must be a string',
      })
      .min(6, 'Phone must be at least 6 characters long')
      .max(15, 'Phone cannot exceed 15 characters'),

    address: z
      .string({
        required_error: 'Address is required',
        invalid_type_error: 'Email must be a string',
      })
      .min(10, 'Address must be at least 10 characters long')
      .max(100, 'Address cannot exceed 100 characters'),

    role: z.enum(['user', 'admin'], {
      required_error: 'Role is required',
      invalid_type_error: "Role must be either 'user' or 'admin'",
    }),
  }),
})

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required.' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
})

export const UserValidations = {
  createUserValidationSchema,
  loginValidationSchema,
}
