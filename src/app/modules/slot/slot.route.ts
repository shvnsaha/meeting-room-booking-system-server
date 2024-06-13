import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SlotValidations } from "./slot.validation";
import { SlotControllers } from "./slot.controller";


const router = Router();

router
.post('/',validateRequest(SlotValidations.createSlotValidationSchema),SlotControllers.createSlot)
.get('/',SlotControllers.getAllSlots)

export const SlotRoutes = router;