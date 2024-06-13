import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config";
import { User } from "../modules/user/user.model";




declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}


const auth = (...requiredRoles: string[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        console.log(token);

        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
          }
      
          // checking if the given token is valid
          const decoded = jwt.verify(
            token,
            config.jwt_access_secret as string,
          ) as JwtPayload;

          const {email,role } = decoded

          console.log(decoded);
        
    const user = await User.isUserExists(email);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized',
      );
    }

          req.user = decoded as JwtPayload;
      next();
    });
  };

  export default auth;