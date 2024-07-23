import { generateNestedRoutes } from "core-library/core";
import { config } from "core-library/config";

const hubBaseRoute = config.value.BASEHUB;
const hubSubRoutes = [
  "",
  "/create-category",
  "/manage-questions",
  "/create-product",
  "/create-pricing",
]; //should be from the DB.

export const authorizedRoute = generateNestedRoutes(hubBaseRoute, hubSubRoutes);
export const unauthorizeRoute = ["/login", "/"];
