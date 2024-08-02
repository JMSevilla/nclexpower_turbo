import { generateNestedRoutes } from "../routeUtils";
import { config } from "core-library/config";

const hubBaseRoute = config.value.BASEHUB;
const hubSubRoutes = [
  "",
  "/create-category",
  "/manage-questions",
  "/create-product",
  "/create-pricing",
  "/internal-application-settings",
]; //should be from the DB.

export const authorizedRoute = generateNestedRoutes(hubBaseRoute, hubSubRoutes);
export const unauthorizeRoute = ["/login", "/"];

export const hasClientKeyRoute = [
  "/account/forgot-password",
  "/account/change-password",
  "/account/verification/otp",
];
