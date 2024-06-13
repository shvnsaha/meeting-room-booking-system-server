import { Router } from 'express'
import { RoomRoutes } from '../modules/room/room.route'
import { UserRoutes } from '../modules/user/user.route'
import { SlotRoutes } from '../modules/slot/slot.route'
import { BookingRoutes } from '../modules/booking/booking.route'
import { myBookingRoutes } from '../modules/booking/myBooking.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/rooms',
    route: RoomRoutes,
  },
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/slots',
    route: SlotRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/my-bookings',
    route: myBookingRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
