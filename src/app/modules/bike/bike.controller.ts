import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BikeServices } from "./bike.service";

const createBike = catchAsync(async (req, res) => {
  const result = await BikeServices.createBikeIntoDB(req.body);
  const message = "Bike added successfully";
  sendResponse(res, StatusCodes.CREATED, true, message, result);
});

const getAllBikes = catchAsync(async (req, res) => {
  const result = await BikeServices.getAllBikesFromDB();
  const message = "Bike fetched successfully";
  sendResponse(res, StatusCodes.OK, true, message, result);
});

const getABike = catchAsync(async (req, res) => {
  const result = await BikeServices.getABikeFromDB(req.params.id);
  const message = "Bike fetched successfully";
  sendResponse(res, StatusCodes.OK, true, message, result);
});

export const BikeControllers = {
  createBike,
  getAllBikes,
  getABike,
};
