import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { RoomValidations } from './room.validation'
import { RoomControllers } from './room.controller'

const router = Router()

router
  .post(
    '/',
    validateRequest(RoomValidations.createRoomValidationSchema),
    RoomControllers.createRoom,
  )
  .get('/:id', RoomControllers.getSingleRoom)
  .get('/', RoomControllers.getAllRooms)
  .delete('/:id', RoomControllers.deleteRoom)

export const RoomRoutes = router
