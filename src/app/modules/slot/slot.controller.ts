import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { SlotServices } from './slot.service'

const createSlot = catchAsync(async (req, res) => {
  const result = await SlotServices.createSlotIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slots created successfully',
    data: result,
  })
})


const getAllSlots = catchAsync(async (req, res) => {
  const result = await SlotServices.getAllSlotsFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slots retrieved successfully',
    data: result,
  })
})



const getAllAvailableSlots = catchAsync(async (req, res) => {
  const result = await SlotServices.getAllAvailableSlotsFromDB(req.query)
  const slotArr = result.length
  sendResponse(res, {
    statusCode: httpStatus.OK ,
    success:  true ,
    message: slotArr
      ? 'Available slots retrieved successfully'
      : 'No Data Found',
    data: result,
  })
})

const deleteSlot = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await SlotServices.deleteSlotFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slot deleted successfully',
    data: result,
  })
})

const updateSlot = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await SlotServices.updateSlotIntoDB(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slot updated successfully',
    data: result,
  })
})


export const SlotControllers = {
  createSlot,
  getAllSlots,
  getAllAvailableSlots,
  deleteSlot,
  updateSlot
}
