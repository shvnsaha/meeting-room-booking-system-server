import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";


const bookingSchema = new Schema<TBooking>({
    date: {
        type: String,
        required: true
    },
    slots: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Slot',
            required: true
        }
    ],
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    isConfirmed: {
        type: String,
        enum: {
            values:  ['confirmed', 'unconfirmed', 'canceled'],
          },
          default:'unconfirmed' 
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps:true
});

export const Booking = model<TBooking>('Booking', bookingSchema);
