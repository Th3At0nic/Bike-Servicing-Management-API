import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createCustomerIntoDb = async (payload: any) => {
  return prisma.customer.create({ data: payload });
};

const getAllCustomersFromDb = async () => {
  return prisma.customer.findMany();
};

const getCustomerByIdFromDB = async (customerId: string) => {
  return prisma.customer.findUnique({ where: { customerId } });
};

const updateCustomerIntoDb = async (customerId: string, payload: any) => {
  return prisma.customer.update({ where: { customerId }, data: payload });
};

const deleteCustomerFromDb = async (customerId: string) => {
  return prisma.customer.delete({ where: { customerId } });
};

export const CustomerServices = {
  createCustomerIntoDb,
  getAllCustomersFromDb,
  getCustomerByIdFromDB,
  updateCustomerIntoDb,
  deleteCustomerFromDb,
};
