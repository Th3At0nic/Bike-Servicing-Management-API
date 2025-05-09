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
  res.status(200).json({ success: true, data: result });
};

const updateCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CustomerServices.updateCustomerIntoDb(id, req.body);
  res.status(200).json({ success: true, data: result });
};

const deleteCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CustomerServices.deleteCustomerFromDb(id);
  res.status(200).json({ success: true, data: result });
};

export const CustomerController = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
