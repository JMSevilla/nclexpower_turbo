import { WebApi } from "./api/web/web-api";
import { PreloadedGlobalsApi } from "./api/preloaded/preloaded-globals-api";

export class Api {
  constructor(
    readonly web: WebApi,
    readonly preloadedGlobals: PreloadedGlobalsApi
  ) {}
}
