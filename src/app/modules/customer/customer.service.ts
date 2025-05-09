import { PrismaClient } from "@prisma/client";
import throwAppError from "../../utils/throwAppError";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

const createCustomerIntoDb = async (payload: any) => {
  const existingCustomer = await prisma.customer.findUnique({
    where: { email: payload.email },
  });

  if (existingCustomer) {
    throwAppError(
      "email",
      "Customer with this email is already exists",
      StatusCodes.CONFLICT
    );
  }
  return prisma.customer.create({ data: payload });
};

const getAllCustomersFromDb = async () => {
  const allCustomers = await prisma.customer.findMany();
  if (!allCustomers.length) {
    throwAppError("", "No Customer Found", StatusCodes.NOT_FOUND);
  }
  return allCustomers;
};

const getCustomerByIdFromDB = async (customerId: string) => {
  const customer = await prisma.customer.findUnique({ where: { customerId } });
  if (!customer) {
    throwAppError(
      "customerId",
      "Customer Not Found with the id",
      StatusCodes.NOT_FOUND
    );
  }
  return customer;
};

const updateCustomerIntoDb = async (customerId: string, payload: any) => {
  const updatedCustomer = await prisma.customer.update({
    where: { customerId },
    data: payload,
  });
  if (!updatedCustomer) {
    throwAppError(
      "customerId",
      "Couldn't Update. Customer Not Found with the id or Something went wrong",
      StatusCodes.NOT_FOUND
    );
  }
  return updatedCustomer;
};

const deleteCustomerFromDb = async (customerId: string) => {
  const result = await prisma.customer.delete({ where: { customerId } });
  if (!result) {
    throwAppError(
      "customerId",
      "Couldn't Delete. Customer Not Found with the id or Something went wrong",
      StatusCodes.NOT_FOUND
    );
  }
  return result;
};

export const CustomerServices = {
  createCustomerIntoDb,
  getAllCustomersFromDb,
  getCustomerByIdFromDB,
  updateCustomerIntoDb,
  deleteCustomerFromDb,
};
