import express from "express";
import { CustomerController } from "./customer.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { CustomerValidations } from "./customer.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(CustomerValidations.createCustomerSchema),
  CustomerController.createCustomer
);
router.get("/", CustomerController.getAllCustomers);
router.get("/:id", CustomerController.getCustomerById);
router.put(
  "/:id",
  validateRequest(CustomerValidations.updateCustomerSchema),
  CustomerController.updateCustomer
);
router.delete("/:id", CustomerController.deleteCustomer);

export const CustomerRoutes = router;
