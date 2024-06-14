import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { BookingServices } from "./booking.service"

const createBooking = catchAsync(async (req, res) => {
    const result = await BookingServices.createBookingIntoDB(req.user,req.body)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking created successfully',
      data: result,
    })
  })

  const getAllBookings = catchAsync(async (req, res) => {
    const result = await BookingServices.getAllBookingFromDB()
    const bookingArr = result.length
    sendResponse(res, {
      statusCode: bookingArr? httpStatus.OK: httpStatus.NOT_FOUND,
      success: bookingArr? true:false,
      message: bookingArr? 'All bookings retrieved successfully' : 'No Data Found',
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
    const myBookingArr = result.length
    sendResponse(res, {
      statusCode: myBookingArr ? httpStatus.OK : httpStatus.NOT_FOUND,
      success: myBookingArr ? true: false,
      message: myBookingArr ? 'User bookings retrieved successfully' : 'No Data Found',
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