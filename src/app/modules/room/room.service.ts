import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TRoom } from './room.interface'
import { Room } from './room.model'

const createRoomIntoDB = async (payload: TRoom) => {
  const result = await Room.create(payload)
  return result
}

const getSingleRoomFromDB = async (id: string) => {
  const result = await Room.findById(id)
  if (!result || result.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room not found')
  }
  return result
}

const getAllRoomsFromDB = async (query: Record<string, unknown>) => {

  const sort = query?.sort as string || '-createdAt'
  const searchTerm = query?.searchTerm as string || ''
  const minPrice = Number(query.minPrice) || 0
  const maxPrice = Number(query.maxPrice)|| 10000
  const minCapacity = Number(query.minCapacity)|| 0
  const maxCapacity = Number(query.maxCapacity)|| 200

    const search = Room.find({
      $or: [
        { name: { $regex: new RegExp(searchTerm, 'i') } },
      ],
      })
    const price = search.find({
      pricePerSlot: { $gte: minPrice, $lte: maxPrice },
    })

    const capacity = price.find({
      capacity: { $gte: minCapacity, $lte: maxCapacity },
    })

     const result = await capacity.find({ isDeleted: false }).sort(sort)
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
