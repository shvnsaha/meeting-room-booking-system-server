import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RoomServices } from "./room.service";

const createRoom = catchAsync(async (req, res) => {
    const result = await RoomServices.createRoomIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room is created succesfully',
      data: result,
    });
  });

  export const RoomControllers = {
    createRoom
  }