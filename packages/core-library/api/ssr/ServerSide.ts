import { AxiosInstance } from "axios";
import {
  CalcItemSelectResponseItem,
  RegularAnswer,
  ItemSessionTypes,
} from "../../types";

export class ServerSideApi {
  constructor(private readonly axios: AxiosInstance) {}
  /**
   *
   * @deprecated
   */
  public createAnswer(props: RegularAnswer) {
    return this.axios.post<number>(
      "/api/answer/regular-answer/create-answer",
      props
    );
  }
  public createQuestionSession(props: ItemSessionTypes) {
    return this.axios.post<string | null | undefined>(
      "/api/session/question/init-session",
      props
    );
  }
}
