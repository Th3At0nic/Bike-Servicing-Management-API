import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { BikeValidations } from "./bike.validation";
import { BikeControllers } from "./bike.controller";

const router = express.Router();

router.post(
  "/",
  validateRequest(BikeValidations.createBikeSchema),
  BikeControllers.createBike
);

router.get("/", BikeControllers.getAllBikes);
router.get("/:id", BikeControllers.getABike);

export const BikeRoutes = router;
