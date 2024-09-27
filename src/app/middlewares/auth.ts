/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import AppError from '../errors/AppError'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import { User } from '../modules/user/user.model'

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload
    } 
  }
}

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const data: any = req.headers.authorization?.split(' ')
    const token = data[1]
  

    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      )
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload

    const { email, role } = decoded

   

    const user = await User.isUserExists(email)

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      )
    }
    req.user = decoded as JwtPayload
    next()
  })
}

export default auth
