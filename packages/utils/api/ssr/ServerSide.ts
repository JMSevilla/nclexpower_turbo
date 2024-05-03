import { AxiosInstance } from "axios";
import { CalcItemSelectResponseItem, RegularAnswer } from "../../types";

export class ServerSideApi {
  constructor(private readonly axios: AxiosInstance) {}
  public createAnswer(props: RegularAnswer) {
    return this.axios.post<CalcItemSelectResponseItem[]>(
      "/api/answer/regular-answer/create-answer",
      props
    );
  }
}
