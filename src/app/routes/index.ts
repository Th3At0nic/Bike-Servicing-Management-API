import express from "express";
import { CustomerRoutes } from "../modules/customer/customer.route";

const router = express.Router();

router.use("/customers", CustomerRoutes);

export default router;
