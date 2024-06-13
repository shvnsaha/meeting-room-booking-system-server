import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { BookingValidations } from "./booking.validation";
import { BookingControllers } from "./booking.controller";



const router = Router();

router
.post('/',auth('admin','user'),validateRequest(BookingValidations.createBookingValidationSchema),BookingControllers.createBooking)


export const BookingRoutes = router;