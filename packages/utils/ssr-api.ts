import { ServerSideApi } from "./api/ssr/ServerSide";

export class SsrApi {
  constructor(readonly secure: ServerSideApi) {}
}
