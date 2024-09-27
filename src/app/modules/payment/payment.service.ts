import mongoose from "mongoose";
import { Booking } from "../booking/booking.model";
import { verifyPayment } from "./payment.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Slot } from "../slot/slot.model";

const confirmationService = async (tranId: string,slots:string) => {

  
    const verifyResponse = await verifyPayment(tranId);
  

    if (verifyResponse && verifyResponse.pay_status === 'Successful') {
      
        
        const slotsArray = slots.split(",")
        const session = await mongoose.startSession()
        try {
          session.startTransaction()
          const updateSlotIsBooked = await Slot.updateMany(
            { _id: { $in: slotsArray } },
            { $set: { isBooked: true } },
            {
              new: true,
              runValidators: true,
              session,
            },
          )
          if (!updateSlotIsBooked) {
            throw new AppError(
              httpStatus.BAD_REQUEST,
              'Failed to update isBooked Property',
            )
          }

        const booking = await Booking.findOneAndUpdate({ tranId }, {
            isPaid: true
        },
        {
            new: true,
            runValidators: true,
            session,
          });

          if (!booking) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Failed to add Booking')
              }
  
          await session.commitTransaction()
          await session.endSession()
        } catch (err) {
          await session.abortTransaction()
          await session.endSession()
          throw new AppError(httpStatus.BAD_REQUEST, 'Failed to add booking')
        }

        // return `http://localhost:5173/payment-success/tranId=${tranId}`
        return `https://meeting-room-booking-system-client-steel.vercel.app/payment-success/tranId=${tranId}`
    }

}

export const paymentServices = {
    confirmationService
}