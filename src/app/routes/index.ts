import { Router } from 'express'
import { RoomRoutes } from '../modules/room/room.route'
import { UserRoutes } from '../modules/user/user.route'

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
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
