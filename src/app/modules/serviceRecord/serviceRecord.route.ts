import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { ServiceRecordValidations } from "./serviceRecord.validation";
import { ServiceControllers } from "./serviceRecord.controller";

const router = express.Router();

router.post(
  "/",
  validateRequest(ServiceRecordValidations.createServiceRecordSchema),
  ServiceControllers.createService
);
router.get("/", ServiceControllers.getAllServices);
router.get("/:id", ServiceControllers.getOneService);
router.put("/:id/complete", ServiceControllers.completeServiceRecord);
router.get("/status", ServiceControllers.getPendingOrOverdueServices);

export const ServiceRecordRoutes = router;
