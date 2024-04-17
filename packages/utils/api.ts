import { CalculationApi } from "./api/calc/calc-api";
import { WebApi } from "./api/web/web-api";
import { PreloadedGlobalsApi } from "./api/preloaded/preloaded-globals-api";

export class Api {
  constructor(
    readonly calc: CalculationApi,
    readonly web: WebApi,
    readonly preloadedGlobals: PreloadedGlobalsApi
  ) {}
}
