
export type AccessTokenResponse = {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiration: string;
  responseCode: string;
}
export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessTokenResponse: AccessTokenResponse;
}

export interface RefreshTokenResponse {
  accessTokenResponse: AccessTokenResponse;
}

export interface LogoutParams {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshParams {
  accessToken: string;
  refreshToken: string;
}
