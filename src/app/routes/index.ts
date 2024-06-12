import { Router } from 'express'
import { RoomRoutes } from '../modules/room/room.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/rooms',
    route: RoomRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
