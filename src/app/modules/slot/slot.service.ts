import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { Room } from '../room/room.model'
import { TSlot } from './slot.interface'
import { Slot } from './slot.model'
import { minutesToTimeString, parseTimeToMinutes } from './slot.utils'
import { populate } from 'dotenv'

// type TQuery = {
//     room?: string;
//     date?: string;
//     isBooked: false
// }

const createSlotIntoDB = async (payload: TSlot) => {
  const { room, date, startTime, endTime } = payload

  const roomExists = await Room.findById(payload?.room)
  if (!roomExists || roomExists.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room Not found')
  }

  const startMinutes = parseTimeToMinutes(startTime)
  const endMinutes = parseTimeToMinutes(endTime)


  if (endMinutes < startMinutes) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Endtime should be greater than start time',
    )
  }

  // logic:
  //    const slotData = await Slot.find({room:room,date:date})
  //    slotData.forEach((slot)=>{
  //     const slotStart = parseTimeToMinutes(slot?.startTime)
  //     const slotEnd = parseTimeToMinutes(slot?.endTime)
  //     console.log(slotStart,slotEnd);
  //     if(startMinutes>=slotStart && startMinutes<slotEnd){
  //         throw new AppError(httpStatus.BAD_REQUEST,'Already a Slot in this time period')
  //     }
  //    })

  // Define the slot duration
  const slotDuration = 60 // 60 minutes per slot

  // Calculate the total duration
  const totalDuration = endMinutes - startMinutes

  // Calculate the number of slots
  const numberOfSlots = totalDuration / slotDuration
 

  // Generate slot time intervals
  const slots = []
  for (let i = 0; i < Math.floor(numberOfSlots); i++) {
    const slotStartTime = minutesToTimeString(startMinutes + i * slotDuration)
    const slotEndTime = minutesToTimeString(
      startMinutes + (i + 1) * slotDuration,
    )

    slots.push({
      room,
      date,
      startTime: slotStartTime,
      endTime: slotEndTime,
      isBooked: false,
    })
  }

  // Insert slots into the database
  const result = await Slot.insertMany(slots)
  return result
}

const getAllSlotsFromDB = async() =>{
  const result = await Slot.find({isDeleted: false}).populate('room')
  return result
}

const getAllAvailableSlotsFromDB = async (query: Record<string, unknown>) => {
  const { date, roomId } = query
  const queryObj: any = { isBooked: false }

  if (date) {
    queryObj.date = date
  }

  if (roomId) {
    queryObj.room = roomId
  }

  const result = await Slot.find(queryObj).populate('room')
  return result
}

const deleteSlotFromDB = async (id: string) => {
  const slot = await Slot.findById(id)
  if (!slot || slot?.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room not found')
  }
  const result = await Slot.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  )
  return result
}

const updateSlotIntoDB = async (id: string, payload: Partial<TSlot>) => {
  const slot = await Slot.findById(id)
  if (!slot || slot?.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Slot not found')
  }

  const { room,  startTime, endTime } = payload

  const roomExists = await Room.findById(room)
  if (!roomExists || roomExists.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room Not found')
  }

  const startMinutes = parseTimeToMinutes(startTime as string)
  const endMinutes = parseTimeToMinutes(endTime as string)


  if (endMinutes < startMinutes) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Endtime should be greater than start time',
    )
  }


  const result = await Slot.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

export const SlotServices = {
  createSlotIntoDB,
  getAllSlotsFromDB,
  getAllAvailableSlotsFromDB,
  deleteSlotFromDB,
  updateSlotIntoDB
}
