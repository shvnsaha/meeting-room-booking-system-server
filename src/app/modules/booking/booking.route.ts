import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import auth from '../../middlewares/auth'
import { BookingValidations } from './booking.validation'
import { BookingControllers } from './booking.controller'

const router = Router()

router
  .post(
    '/',
    auth('user','admin'),
    validateRequest(BookingValidations.createBookingValidationSchema),
    BookingControllers.createBooking,
  )
  .get('/', auth('admin'), BookingControllers.getAllBookings)
  .put(
    '/:id',
    auth('admin'),
    validateRequest(BookingValidations.updateBookingValidationSchema),
    BookingControllers.updateBooking,
  )
  .delete('/:id', auth('admin'), BookingControllers.deleteBooking)

export const BookingRoutes = router
