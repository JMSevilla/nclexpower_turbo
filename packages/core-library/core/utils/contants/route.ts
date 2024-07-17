import { generateNestedRoutes } from "core-library/core";
import { config } from "core-library/config";

const hubBaseRoute = config.value.BASEHUB;
const hubSubRoutes = ["", "/create-category"]; //should be from the DB.

export const authorizedRoute = generateNestedRoutes(hubBaseRoute, hubSubRoutes);
export const unauthorizeRoute = ["/login", "/"];

export const hasClientKeyRoute = [
  "/forgot-password",
  "/otp",
  "/change-password",
];
