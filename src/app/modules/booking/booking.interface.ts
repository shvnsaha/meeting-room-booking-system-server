import { Types } from 'mongoose'

export type TBooking = {
  date: string
  slots: Types.ObjectId[]
  room: Types.ObjectId
  user: Types.ObjectId
  totalAmount: number
  isConfirmed: 'confirmed' | 'unconfirmed' | 'canceled'
  tranId?:string
  isPaid?:boolean
  isDeleted?: boolean
}
