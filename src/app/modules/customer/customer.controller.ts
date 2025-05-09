import { Request, Response } from "express";
import { CustomerServices } from "./customer.service";

const createCustomer = async (req: Request, res: Response) => {
  const result = await CustomerServices.createCustomerIntoDb(req.body);
  res.status(201).json({ success: true, data: result });
};

const getAllCustomers = async (req: Request, res: Response) => {
  const result = await CustomerServices.getAllCustomersFromDb();
  res.status(200).json({ success: true, data: result });
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
