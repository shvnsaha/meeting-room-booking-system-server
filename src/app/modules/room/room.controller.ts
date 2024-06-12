import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { RoomServices } from './room.service'

const createRoom = catchAsync(async (req, res) => {
  const result = await RoomServices.createRoomIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room added successfully',
    data: result,
  })
})

const getSingleRoom = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await RoomServices.getSingleRoomFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room retrieved successfully',
    data: result,
  })
})

const getAllRooms = catchAsync(async (req, res) => {
  const result = await RoomServices.getAllRoomsFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rooms retrieved successfully',
    data: result,
  })
})

const deleteRoom = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await RoomServices.deleteRoomFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room deleted successfully',
    data: result,
  })
})

export const RoomControllers = {
  createRoom,
  getSingleRoom,
  getAllRooms,
  deleteRoom,
}
