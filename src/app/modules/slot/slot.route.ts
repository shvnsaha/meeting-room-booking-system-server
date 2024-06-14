import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { SlotValidations } from './slot.validation'
import { SlotControllers } from './slot.controller'
import auth from '../../middlewares/auth'

const router = Router()

router
  .post(
    '/',
    auth('admin'),
    validateRequest(SlotValidations.createSlotValidationSchema),
    SlotControllers.createSlot,
  )
  .get('/availability', SlotControllers.getAllSlots)

export const SlotRoutes = router
