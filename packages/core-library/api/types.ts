export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LogoutParams {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshParams {
  accessToken: string;
  refreshToken: string;
}
