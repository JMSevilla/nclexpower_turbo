import { AxiosError, AxiosInstance } from "axios";
import { LoginParams, RegisterParams } from "../../types/types";
import { LoginResponse } from "../types";

export class WebApi {
  constructor(
    private readonly axios: AxiosInstance,
    private readonly ssrAxios: AxiosInstance
  ) { }

  public web_account_setup(params: RegisterParams) {
    return this.axios.post<number>(
      "/api/v2/internal/baseInternal/internal-account-creation",
      params);
  }
  public web_customer_login(params: LoginParams) {
    return this.axios.post<LoginResponse>(
      `/api/v2/internal/baseInternal/login`,
      params
    );
  }
}
