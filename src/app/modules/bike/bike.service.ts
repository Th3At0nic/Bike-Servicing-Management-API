import { notFound } from "./../../middlewares/notFound";
import { Bike, PrismaClient } from "@prisma/client";
import throwAppError from "../../utils/throwAppError";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

const createBikeIntoDB = async (payload: Bike): Promise<Bike> => {
  const { brand, model, year, customerId } = payload;

  const isCustomerExists = await prisma.customer.findFirst({
    where: { customerId },
  });

  if (!isCustomerExists) {
    throwAppError(
      "customerId",
      "Customer not found with the id",
      StatusCodes.NOT_FOUND
    );
  }

  const result = await prisma.bike.create({
    data: { brand, model, year, customerId },
  });
  return result;
};

/**
 * Fetches all bikes from the database.
 *
 */
const getAllBikesFromDB = async (): Promise<Bike[]> => {
  const result = await prisma.bike.findMany();
  if (!result) {
    throwAppError("", "No Bike Found", StatusCodes.NOT_FOUND);
  }
  return result;
};

/**
 * Fetches a single bike from the database by its ID.
 * @param bikeId - The ID of the bike to be fetched.
 *
 * @throws {NotFoundError} If the bike with the provided ID does not exist.
 *
 * @returns The bike object, or null if not found.
 */
const getABikeFromDB = async (bikeId: string): Promise<Bike | null> => {
  const result = await prisma.bike.findFirst({
    where: { bikeId },
  });
  if (!result)
    throwAppError(
      "bikeId",
      "Bike not found with the id",
      StatusCodes.NOT_FOUND
    );
  return result;
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikesFromDB,
  getABikeFromDB,
};
