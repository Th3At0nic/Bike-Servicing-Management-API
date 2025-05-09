import catchAsync from "../../utils/catchAsync";
import { ServiceRecordServices } from "./serviceRecord.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const createService = catchAsync(async (req, res) => {
  const result = await ServiceRecordServices.createServiceIntoDB(req.body);
  const message = "Service record created successfully";
  sendResponse(res, StatusCodes.CREATED, true, message, result);
});

const getAllServices = catchAsync(async (req, res) => {
  const result = await ServiceRecordServices.getAllServicesFromDB();
  const message = "Service record fetched successfully";
  sendResponse(res, StatusCodes.OK, true, message, result);
});

const getPendingOrOverdueServices = catchAsync(async (_, res) => {
  const result =
    await ServiceRecordServices.getPendingOrOverdueServicesFromDB();

  const message = "Overdue or pending services fetched successfully";
  sendResponse(res, StatusCodes.OK, true, message, result);
});

const getOneService = catchAsync(async (req, res) => {
  const result = await ServiceRecordServices.getOneServiceFromDB(req.params.id);
  const message = "Service record fetched successfully";
  sendResponse(res, StatusCodes.OK, true, message, result);
});

const completeServiceRecord = catchAsync(async (req, res) => {
  const result = await ServiceRecordServices.completeServiceRecordIntoDB(
    req.params.id,
    req.body
  );
  const message = "Service marked as completed";
  sendResponse(res, StatusCodes.OK, true, message, result);
});

export const ServiceControllers = {
  createOne: createService,
  getAll: getAllServices,
  getOne: getOneService,
  completeServiceRecord,
  getPendingOrOverdueServices,
};
