import { Router } from 'express'
import auth from '../../middlewares/auth'
import { BookingControllers } from './booking.controller'

const router = Router()

router.get('/', auth('user','admin'), BookingControllers.myBookings)

export const myBookingRoutes = router
