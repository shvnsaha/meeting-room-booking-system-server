import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidations } from './user.validation'
import { UserControllers } from './user.controller'
import auth from '../../middlewares/auth'

const router = Router()

router
  .post(
    '/signup',
    validateRequest(UserValidations.createUserValidationSchema),
    UserControllers.createUser,
  )
  .post(
    '/login',
    validateRequest(UserValidations.loginValidationSchema),
    UserControllers.loginUser,
  )
  .get(
    '/users',
    UserControllers.getAllUsers,
  )
  .patch('/users/:id',auth('admin'),UserControllers.updateUserRole)
  router.post(
    '/refresh-token',
    validateRequest(UserValidations.refreshTokenValidationSchema),
    UserControllers.refreshToken,
  );

export const UserRoutes = router
