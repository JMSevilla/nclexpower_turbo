import { AxiosInstance } from "axios";
import { RegularAnswer } from "../../types";

export class ServerSideApi {
  constructor(private readonly axios: AxiosInstance) {}
  public ssrCreateAnswer(params: RegularAnswer) {
    return this.axios.post<number>(`/api/create-answer`, params);
  }
}
