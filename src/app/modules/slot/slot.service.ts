import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Room } from "../room/room.model"
import { TSlot } from "./slot.interface"
import { Slot } from "./slot.model"
import { minutesToTimeString, parseTimeToMinutes } from "./slot.utils";

const createSlotIntoDB = async (payload: TSlot) => {
    const { room, date, startTime, endTime } = payload;

    const roomExists = await Room.findById(payload?.room);
    if(!roomExists){
        throw new AppError(httpStatus.NOT_FOUND, 'Room Not found');
    }

    else if(roomExists?.isDeleted === true){
        throw new AppError(httpStatus.NOT_FOUND, 'Room Not found');
    }

    const startMinutes = parseTimeToMinutes(startTime);
    const endMinutes = parseTimeToMinutes(endTime);

    console.log(startMinutes,endMinutes);

      // Define the slot duration
      const slotDuration = 60; // 60 minutes per slot

      // Calculate the total duration
      const totalDuration = endMinutes - startMinutes;
  
      // Calculate the number of slots
      const numberOfSlots = totalDuration / slotDuration;
  
      // Generate slot time intervals
      const slots = [];
      for (let i = 0; i < numberOfSlots; i++) {
          const slotStartTime = minutesToTimeString(startMinutes + i * slotDuration);
          const slotEndTime = minutesToTimeString(startMinutes + (i + 1) * slotDuration);
  
          slots.push({
              room,
              date,
              startTime: slotStartTime,
              endTime: slotEndTime,
              isBooked: false
          });
      }
  
      // Insert slots into the database
      const result = await Slot.insertMany(slots);
      return result
  }

  export const SlotServices = {
    createSlotIntoDB
  }