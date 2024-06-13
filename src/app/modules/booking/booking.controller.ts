import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { BookingServices } from "./booking.service"

const createBooking = catchAsync(async (req, res) => {
    const result = await BookingServices.createBookingIntoDB(req.user,req.body)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room added successfully',
      data: result,
    })
  })

  const getAllBookings = catchAsync(async (req, res) => {
    console.log(req.user);
    const result = await BookingServices.getAllBookingFromDB()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All bookings retrieved successfully',
      data: result,
    })
  })

  export const BookingControllers = {
    createBooking,
    getAllBookings
  }