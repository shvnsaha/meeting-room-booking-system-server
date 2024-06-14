import { Router } from 'express'
import auth from '../../middlewares/auth'
import { BookingControllers } from './booking.controller'

const router = Router()

router.get('/', auth('user'), BookingControllers.myBookings)

export const myBookingRoutes = router
