import { Router } from "express";
import { CustomerRoutes } from "../modules/customer/customer.route";
import { BikeRoutes } from "../modules/bike/bike.route";
import { ServiceRecordRoutes } from "../modules/serviceRecord/serviceRecord.route";

const router = Router();

const moduleRoutes = [
  {
    path: `/customers`,
    route: CustomerRoutes,
  },
  {
    path: `/bikes`,
    route: BikeRoutes,
  },
  {
    path: `/services`,
    route: ServiceRecordRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

moduleRoutes.forEach((moduleRoute) => {
  router.use(moduleRoute.path, moduleRoute.route);
});

export default router;
