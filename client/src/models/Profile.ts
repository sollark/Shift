import { z } from 'zod'

export type Profile = {
  firstName: string
  lastName: string
  ID: string
}

export const ProfileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: 'Field can not be empty' })
    .min(2, { message: 'First name must be at least 2 characters' })
    .max(24, { message: 'First name must be less than 24 characters' }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: 'Field can not be empty' })
    .min(2, { message: 'Last name must be at least 2 characters' })
    .max(24, { message: 'Last name must be less than 24 characters' }),
  ID: z
    .string()
    .trim()
    .min(1, { message: 'Field can not be empty' })
    .regex(/^[A-Z0-9]{8,18}$/, 'Invalid ID'),

  // phone: z
  //   .string()
  //   .trim()
  //   .min(1, { message: 'Field can not be empty' })
  //   .regex(REGEX.PHONE_NUMBER_IL, 'Invalid phone number'),
})
