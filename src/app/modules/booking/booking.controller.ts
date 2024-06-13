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
    const result = await BookingServices.getAllBookingFromDB()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All bookings retrieved successfully',
      data: result,
    })
  })

  const updateBooking = catchAsync(async(req,res)=>{
     const id = req.params.id;
     const result = await BookingServices.updateBookingIntoDB(id,req.body);
     sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Booking updated successfully',
        data: result,
      })
  })

  const deleteBooking = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await BookingServices.deleteBookingFromDB(id)
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking deleted successfully',
      data: result,
    })
  })

  const myBookings = catchAsync(async (req, res) => {

    const result = await BookingServices.getMyBookings(req.user)
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking deleted successfully',
      data: result,
    })
  })

  


  export const BookingControllers = {
    createBooking,
    getAllBookings,
    updateBooking,
    deleteBooking,
    myBookings
  }