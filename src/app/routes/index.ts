import { Router } from "express";
import { CustomerRoutes } from "../modules/customer/customer.route";

const router = Router();

const apiPrefix = "/api";

const moduleRoutes = [
  {
    path: `${apiPrefix}/customers`,
    route: CustomerRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

moduleRoutes.forEach((moduleRoute) => {
  router.use(moduleRoute.path, moduleRoute.route);
});

export default router;
