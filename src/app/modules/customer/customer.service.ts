import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createCustomerIntoDb = async (payload: any) => {
  return prisma.customer.create({ data: payload });
};

const getAllCustomersFromDb = async () => {
  return prisma.customer.findMany();
};

const getCustomerByIdFromDB = async (id: string) => {
  return prisma.customer.findUnique({ where: { id } });
};

const updateCustomerIntoDb = async (id: string, payload: any) => {
  return prisma.customer.update({ where: { id }, data: payload });
};

const deleteCustomerFromDb = async (id: string) => {
  return prisma.customer.delete({ where: { id } });
};

export const CustomerServices = {
  createCustomerIntoDb,
  getAllCustomersFromDb,
  getCustomerByIdFromDB,
  updateCustomerIntoDb,
  deleteCustomerFromDb,
};
