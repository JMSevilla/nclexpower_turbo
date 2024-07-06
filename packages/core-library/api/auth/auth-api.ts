import { AxiosInstance } from "axios";
import {
  AccessKeyType,
  LoginParams,
  LoginResponse,
  RefreshParams,
  RefreshTokenResponse,
} from "../types";

export class AuthApi {
  constructor(
    private readonly axios: AxiosInstance,
    private readonly ssrAxios: AxiosInstance
  ) {}

  public refreshToken(params: RefreshParams) {
    return this.axios.post<RefreshTokenResponse>(
      `/api/v2/internal/baseInternal/refresh-token`,
      params
    );
  }

  public accessKeyLogin(params: AccessKeyType) {
    return this.axios.post<LoginResponse>(
      `/api/v2/internal/baseInternal/access-key-login`,
      params
    );
  }

  public login(params: LoginParams) {
    return this.axios.post<LoginResponse>(
      `/api/v2/internal/baseInternal/login`,
      params
    );
  }
}
