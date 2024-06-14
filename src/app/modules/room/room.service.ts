import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TRoom } from './room.interface'
import { Room } from './room.model'

const createRoomIntoDB = async (payload: TRoom) => {
  const result = await Room.create(payload)
  return result
}

const getSingleRoomFromDB = async (id: string) => {
  const result = await Room.findById(id).select('-__v -createdAt -updatedAt')
  if (!result || result.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room not found')
  }
  return result
}

const getAllRoomsFromDB = async () => {
  const result = await Room.find({ isDeleted: false })
  return result
}

const deleteRoomFromDB = async (id: string) => {
  const room = await Room.findById(id)
  if (!room || room?.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room not found')
  }
  const result = await Room.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  )
  return result
}

const updateRoomIntoDB = async (id: string, payload: Partial<TRoom>) => {
  const room = await Room.findById(id)
  if (!room || room?.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room not found')
  }
  const result = await Room.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

export const RoomServices = {
  createRoomIntoDB,
  getSingleRoomFromDB,
  getAllRoomsFromDB,
  deleteRoomFromDB,
  updateRoomIntoDB,
}
