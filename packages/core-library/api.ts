import { CalculationApi } from "./api/calc/calc-api";
import { WebApi } from "./api/web/web-api";
import { PreloadedGlobalsApi } from "./api/preloaded/preloaded-globals-api";
import { WebApiBackOffice } from "./api/web/web-api-backoffice";
import { AuthApi } from "./api/auth/auth-api";

export class Api {
  constructor(
    readonly calc: CalculationApi,
    readonly web: WebApi,
    readonly preloadedGlobals: PreloadedGlobalsApi,
    readonly webbackoffice: WebApiBackOffice,
    readonly auth: AuthApi
  ) {}
}
