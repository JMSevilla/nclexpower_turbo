import { AxiosInstance } from "axios";
import {
  AccessKeyType,
  LoginParams,
  LoginResponse,
  RefreshParams,
  RefreshTokenResponse,
  RevokeParams,
  ValidateTokenParams,
  Verify2FAParams,
} from "../types";
import { internalAccountType } from "../../types/types";

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

  public verify_2fa(params: Verify2FAParams) {
    return this.ssrAxios.post<LoginResponse>(
      `/api/security/otp/verify-2fa`,
      params
    );
  }

  public revokeToken(params: RevokeParams) {
    return this.axios.post<LoginParams>(
      `/api/v2/internal/baseInternal/revoke-token`,
      params
    );
  }

  public validateToken(params: ValidateTokenParams) {
    return this.ssrAxios.post<number>(`/api/security/validate-token`, params);
  }

  public web_create_internal_account(params: internalAccountType) {
    return this.axios.post<number>(
      "/api/v2/internal/baseInternal/internal-account-creation/",
      params
    );
  }
}
