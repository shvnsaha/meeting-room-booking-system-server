import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";
import { UserControllers } from "./user.controller";

const router = Router();

router
.post('/signup',validateRequest(UserValidations.createUserValidationSchema),UserControllers.createUser)
.post('/login',validateRequest(UserValidations.loginValidationSchema),UserControllers.loginUser)


export const UserRoutes = router;
