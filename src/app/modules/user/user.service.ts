import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TLogin, TUser } from './user.interface'
import { User } from './user.model'
import jwt from 'jsonwebtoken'
import config from '../../config'

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload)
  return result
}

const loginUser = async (payload: TLogin) => {
  const user: any = await User.isUserExists(payload?.email)

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'There is no user using this email',
    )
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched')

  //    jwtpayload;
  const jwtpayload = {
    userId: user?._id,
    email: user?.email,
    role: user?.role,
  }

  const accessToken = jwt.sign(jwtpayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  })

  return {
    accessToken,
    user,
  }
}

export const UserServices = {
  createUserIntoDB,
  loginUser,
}
