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
router.get("/status", ServiceControllers.getPendingOrOverdueServices);

router.get("/", ServiceControllers.getAllServices);
router.put("/:id/complete", ServiceControllers.completeServiceRecord);

//this kind of dynamic route should be at the most down, because express check the routese top-down,
// so other string can be assumes as dynamic route which creates wrong controller call
router.get("/:id", ServiceControllers.getOneService);

export const ServiceRecordRoutes = router;
