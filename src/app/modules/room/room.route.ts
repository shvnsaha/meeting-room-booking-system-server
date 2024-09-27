import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { RoomValidations } from './room.validation'
import { RoomControllers } from './room.controller'
import auth from '../../middlewares/auth'

const router = Router()

router
  .post(
    '/',
    auth('admin','user'),
    validateRequest(RoomValidations.createRoomValidationSchema),
    RoomControllers.createRoom,
  )
  .get('/:id', RoomControllers.getSingleRoom)
  .get('/', RoomControllers.getAllRooms)
  .delete('/:id', auth('admin'), RoomControllers.deleteRoom)
  .put(
    '/:id',
    auth('admin'),
    validateRequest(RoomValidations.updateRoomValidationSchema),
    RoomControllers.updateRoom,
  )

export const RoomRoutes = router
