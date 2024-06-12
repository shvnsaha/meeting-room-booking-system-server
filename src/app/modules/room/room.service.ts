import { TRoom } from './room.interface'
import { Room } from './room.model'

const createRoomIntoDB = async (payload: TRoom) => {
  const result = await Room.create(payload)
  return result
}

const getSingleRoomFromDB = async (id: string) => {
  const result = await Room.findById(id)
  return result
}

const getAllRoomsFromDB = async () => {
  const result = await Room.find()
  return result
}

const deleteRoomFromDB = async (id: string) => {
  const result = await Room.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  )
  return result
}

export const RoomServices = {
  createRoomIntoDB,
  getSingleRoomFromDB,
  getAllRoomsFromDB,
  deleteRoomFromDB,
}
