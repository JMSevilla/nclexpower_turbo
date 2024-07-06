import { AxiosError, AxiosInstance } from "axios";
import { RegisterParams } from "../../types/types";

export class WebApi {
  constructor(
    private readonly axios: AxiosInstance,
    private readonly ssrAxios: AxiosInstance
  ) {}

  public web_account_setup(params: RegisterParams) {
    return this.axios.post<number>(
      "/api/v2/internal/baseInternal/internal-account-creation",
      params
    );
  }
}
