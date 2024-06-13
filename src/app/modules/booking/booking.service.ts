import { JwtPayload } from "jsonwebtoken"
import { TBooking } from "./booking.interface"
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Room } from "../room/room.model";
import mongoose, { Types } from "mongoose";
import { Slot } from "../slot/slot.model";
import { Booking } from "./booking.model";

const createBookingIntoDB = async (jwtData:JwtPayload,payload: TBooking) => {
    const {date,slots,room,user} = payload
    const userData = await User.findById(user).select('-password');
    if(!userData){
        throw new AppError(httpStatus.NOT_FOUND, 'User Not found');
    }
    if(userData.email !== jwtData.email){
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!!!!');
    }
    const roomData = await Room.findById(room);
    if(!roomData || roomData?.isDeleted){
        throw new AppError(httpStatus.NOT_FOUND, 'Room Not found');
    }

   async function slotAvailabily(slots:Types.ObjectId[], room:Types.ObjectId, date:string) {
    for (const slot of slots) {
        const slotData = await Slot.findById(slot);
        if(!slotData || slotData?.isBooked || !slotData.room.equals(room) || slotData.date !== date){
            throw new AppError(httpStatus.NOT_FOUND, 'Slot Not found');
        }    
    }
   }
  await slotAvailabily(slots,room,date);

  const totalAmount = roomData?.pricePerSlot * slots.length;
  const booking = new Booking({
    date,
    slots,
    room,
    user,
    totalAmount,
    isConfirmed: 'unconfirmed',
    isDeleted: false
  });

    // // transaction 
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
        const updateSlotIsBooked = await Slot.updateMany(
            { _id: { $in: slots } },
            { $set: { isBooked: true } },
            {
                new: true,
                runValidators: true,
                session,
              },
          );

          if (!updateSlotIsBooked) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update isBooked Property');
          }

          await booking.save({session});
          if(!booking){
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to add Booking');
          }
          await booking.populate('slots')
          await booking.populate('room')
          await booking.populate('user',{password:0})
          await session.commitTransaction();
          await session.endSession();    
      
    }catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to add booking');
      }

    return booking;
 }

 const getAllBookingFromDB = async () => {
    const result = await Booking.find().populate('slots').populate('room').populate('user','-password')
    return result
  }

  const updateBookingIntoDB = async (id: string, payload: Partial<TBooking>) =>{
    const bookingData = await Booking.findById(id);
    if(!bookingData || bookingData?.isDeleted){
      throw new AppError(httpStatus.NOT_FOUND,'Booking data not found')
    }

    const session = await mongoose.startSession();
    try {
      session.startTransaction();
    
    if(payload.isConfirmed === 'confirmed'){
     
      const updateSlotIsBooked = await Slot.updateMany(
        { _id: { $in: bookingData.slots } },
        { $set: { isBooked: true } },
        {
            new: true,
            runValidators: true,
            session,
          },
      );

      if (!updateSlotIsBooked) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update isBooked Property');
      }
      

      const result = await Booking.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
        session,
      })
      if (!result) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Booking');
      }
      await session.commitTransaction();
      await session.endSession();

      return result
    }
    else{
      const updateSlotIsBooked = await Slot.updateMany(
        { _id: { $in: bookingData.slots } },
        { $set: { isBooked: false } },
        {
            new: true,
            runValidators: true,
            session,
          },
      );

      if (!updateSlotIsBooked) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update isBooked Property');
      }
      

      const result = await Booking.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
        session,
      })
      if (!result) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Booking');
      }

      await session.commitTransaction();
      await session.endSession();

      return result
  
    }

  
  }catch(err){
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }

}

const deleteBookingFromDB = async (id: string) => {
  const bookingData = await Booking.findById(id);
  if(!bookingData || bookingData?.isDeleted){
    throw new AppError(httpStatus.NOT_FOUND,'Booking data not found')
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const updateSlotIsBooked = await Slot.updateMany(
      { _id: { $in: bookingData.slots } },
      { $set: { isBooked: false } },
      {
          new: true,
          runValidators: true,
          session,
        },
    );

    if (!updateSlotIsBooked) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update isBooked Property');
    }
    

    const result = await Booking.findByIdAndUpdate(id, { isDeleted: true }, {
      new: true,
      session,
    })
    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Booking');
    }
    await session.commitTransaction();
    await session.endSession();

    return result
 


}catch(err){
  await session.abortTransaction();
  await session.endSession();
  throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
}

}


 export const BookingServices = {
    createBookingIntoDB,
    getAllBookingFromDB,
    updateBookingIntoDB,
    deleteBookingFromDB
 }