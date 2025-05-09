import { Request, Response } from "express";
import { CustomerServices } from "./customer.service";
import sendResponse from "../../utils/sendResponse";

const createCustomer = async (req: Request, res: Response) => {
  const result = await CustomerServices.createCustomerIntoDb(req.body);
  const message = "Customer created successfully";
  sendResponse(res, 201, true, message, result);
};

const getAllCustomers = async (req: Request, res: Response) => {
  const result = await CustomerServices.getAllCustomersFromDb();
  const message = "Customers fetched successfully";
  sendResponse(res, 200, true, message, result);
};

const getCustomerById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CustomerServices.getCustomerByIdFromDB(id);
  const message = "Customer fetched successfully";
  sendResponse(res, 200, true, message, result);
};

const updateCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CustomerServices.updateCustomerIntoDb(id, req.body);
  const message = "Customer Updated successfully";
  sendResponse(res, 200, true, message, result);
};

const deleteCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;
  await CustomerServices.deleteCustomerFromDb(id);
  const message = "Customer Deleted successfully";
  sendResponse(res, 200, true, message);
};

export const CustomerController = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
