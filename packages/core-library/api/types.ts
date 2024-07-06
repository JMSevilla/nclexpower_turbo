export type AccessTokenResponse = {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiration: string;
  responseCode: number | string;
};

export type AccessKeyType = {
  accessKey: string;
  appName: string;
};

export interface LoginParams {
  email: string;
  password: string;
  appName: string;
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
  appName: string;
}

export type CategoryFormParams = {
  categoryName: string;
  categoryDescription: string | null;
  categoryType: number;
};

export type CurrenciesResponse = {
  id: string;
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
};

export type PricingListResponse = {
  id: string;
  price: number;
  currency: string;
};

export interface ProductListResponse {
  id: string;
  productName: string;
  pricingId: string;
  categoryId: string;
  productDescription: string | null;
  programType: number;
}

export interface ProductSetStatusParams {
  productId: string;
  productStatus: number;
}
