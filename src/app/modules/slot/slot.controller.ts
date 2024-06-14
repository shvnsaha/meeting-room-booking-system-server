import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { SlotServices } from './slot.service'

const createSlot = catchAsync(async (req, res) => {
  const result = await SlotServices.createSlotIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room added successfully',
    data: result,
  })
})

const getAllSlots = catchAsync(async (req, res) => {
  const result = await SlotServices.getAllSlotsFromDB(req.query)
  const slotArr = result.length
  sendResponse(res, {
    statusCode: slotArr ? httpStatus.OK : httpStatus.NOT_FOUND,
    success: slotArr ? true : false,
    message: slotArr
      ? 'Available slots retrieved successfully'
      : 'No Data Found',
    data: result,
  })
})

export const SlotControllers = {
  createSlot,
  getAllSlots,
}
