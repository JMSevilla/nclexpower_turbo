import { CalculationApi } from "./api/calc/calc-api";
import { WebApi } from "./api/web/web-api";

export class Api {
  constructor(
    readonly calc: CalculationApi,
    readonly web: WebApi
  ) {}
}
