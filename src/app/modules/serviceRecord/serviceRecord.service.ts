import { ServiceRecord, PrismaClient, ServiceStatus } from "@prisma/client";
import throwAppError from "../../utils/throwAppError";
import { StatusCodes } from "http-status-codes";
import { toPrismaEnum } from "../../utils/mapToPrismaEnum";

const prisma = new PrismaClient();

/**
 * Creates a new service record in the database.
 * @param payload - The service record to be created, containing the bike ID,
 *                  service date, description, and status.
 *
 * @returns The newly created service record.
 */

const createServiceIntoDB = async (
  payload: ServiceRecord
): Promise<ServiceRecord> => {
  const { bikeId, serviceDate, description, status } = payload;
  //   console.log({ bikeId, serviceDate, description, status });

  const normalizedStatus = toPrismaEnum(ServiceStatus, status);

  const result = await prisma.serviceRecord.create({
    data: {
      bikeId,
      serviceDate,
      description,
      status: normalizedStatus,
    },
  });

  if (!result) {
    throwAppError(
      "",
      "Service Creation failed, try again.",
      StatusCodes.BAD_REQUEST
    );
  }

  return result;
};

/**
 * Fetches all service records from the database.
 *
 * @returns An array of service records.
 */
const getAllServicesFromDB = async (): Promise<ServiceRecord[]> => {
  const result = await prisma.serviceRecord.findMany();

  if (!result) {
    throwAppError("", "No Service Found", StatusCodes.NOT_FOUND);
  }
  return result;
};

/**
 * Fetches all service records from the database that are either pending,
 * in progress, or overdue (i.e. service date is older than one week ago).
 *
 * @returns An array of service records.
 */
const getPendingOrOverdueServicesFromDB = async (): Promise<
  ServiceRecord[]
> => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const result = await prisma.serviceRecord.findMany({
    where: {
      AND: [
        {
          OR: [
            { status: { in: ["PENDING", "IN_PROGRESS"] } },
            { serviceDate: { lt: oneWeekAgo } },
          ],
        },
        {
          status: { not: "DONE" },
        },
      ],
    },
  });

  if (!result) {
    throwAppError("", "No Data Found", StatusCodes.NOT_FOUND);
  }

  return result;
};

/**
 * Fetches a single service record from the database by its ID.
 *
 * @param serviceId - The ID of the service record to be fetched.
 *
 * @throws not found error If the service record with the provided ID does not exist.
 *
 * @returns The service record object, or null if not found.
 */
const getOneServiceFromDB = async (
  serviceId: string
): Promise<ServiceRecord | null> => {
  const result = await prisma.serviceRecord.findFirst({
    where: { serviceId },
  });
  if (!result) {
    throwAppError(
      "serviceId",
      "Service not found with the id",
      StatusCodes.NOT_FOUND
    );
  }

  return result;
};

/**
 * Updates a service record's status to DONE and completion date.
 *
 * @param serviceId - The ID of the service record to be updated.
 * @param payload - An object with the completion date to be updated.
 *                  If not provided, the current date is used.
 *
 * @throws not found error If the service record with the provided ID does not exist.
 * @throws error If the completion date is earlier than the service date.
 *
 * @returns The updated service record object, or null if not found.
 */
const completeServiceRecordIntoDB = async (
  serviceId: string,
  payload: Partial<Pick<ServiceRecord, "completionDate">>
): Promise<ServiceRecord | null> => {
  const isServiceRecordExists = await prisma.serviceRecord.findFirst({
    where: { serviceId },
  });
  if (!isServiceRecordExists) {
    throwAppError(
      "serviceId",
      "No Service Record Found with the id",
      StatusCodes.NOT_FOUND
    );
  }

  const completionDate = payload?.completionDate ?? new Date();

  if (completionDate < isServiceRecordExists!.serviceDate!) {
    throwAppError(
      "completionDate",
      "Completion date cannot be earlier than the service date.",
      StatusCodes.BAD_REQUEST
    );
  }

  const result = await prisma.serviceRecord.update({
    where: { serviceId },
    data: {
      status: ServiceStatus.DONE,
      completionDate,
    },
  });

  if (!result) {
    throwAppError(
      "serviceId",
      "Couldn't Update the Service Record. Something went wrong. Try again",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  return result;
};

export const ServiceRecordServices = {
  createServiceIntoDB,
  getAllServicesFromDB,
  getOneServiceFromDB,
  completeServiceRecordIntoDB,
  getPendingOrOverdueServicesFromDB,
};
