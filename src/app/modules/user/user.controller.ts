import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.service'
import config from '../../config'

const createUser = catchAsync(async (req, res) => {
  const user = await UserServices.createUserIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      address: user.address,
    },
  })
})

const loginUser = catchAsync(async (req, res) => {
  const { user, accessToken,refreshToken } = await UserServices.loginUser(req.body)

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    token: accessToken,
    data: {
      _id: user._id, 
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      address: user.address,
    },
  })
})


const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await UserServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  })
})

const updateUserRole = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await UserServices.updateUserRoleIntoDB(id, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  })
})

export const UserControllers = {
  createUser,
  loginUser,
  refreshToken,
  getAllUsers,
  updateUserRole
}
