import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TLogin, TUser } from './user.interface'
import { User } from './user.model'
import config from '../../config'
import { createToken } from './user.utils'
import jwt,{ JwtPayload } from 'jsonwebtoken'

const createUserIntoDB = async (payload: TUser) => {
  const isUserExists = await User.findOne({email:payload.email});
  if(isUserExists){
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Already a user using this email',
    )
  }
  const result = await User.create(payload)
  return result
}

const loginUser = async (payload: TLogin) => {
  const user = await User.isUserExists(payload?.email)

  // console.log(user);

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'There is no user using this email',
    )
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched')

  //    jwtpayload;
  const jwtPayload = {
    userId: user._id,
    email: user?.email,
    role: user?.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );


  return {
    accessToken,
    refreshToken,
    user,
  }
}



const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { email } = decoded;

  const user = await User.isUserExists(email)

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'There is no user using this email',
    )
  }
 

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

const getAllUsersFromDB = async() =>{
  const result = await User.find()
  return result
}

const updateUserRoleIntoDB = async (id: string, payload: Partial<TUser>) => {
  const user = await User.findById(id)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}



export const UserServices = {
  createUserIntoDB,
  loginUser,
  refreshToken,
  getAllUsersFromDB,
  updateUserRoleIntoDB
}
