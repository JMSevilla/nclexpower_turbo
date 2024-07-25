export type AccessTokenResponse = {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiration: string;
  responseCode: number | string;
};

export type AccessKeyType = {
  email: string;
  password: string;
  appName: string;
};

export interface LoginParams {
  email: string;
  password: string;
  appName: string;
}

export interface CreatePaymentIntentParams {
  amount: number;
  currency: string;
  productName: string;
  productDescription: string;
  programTitle: number;
}
export interface UpdatePaymentIntentParams {
  paymentIntentId: string;
  email: string;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
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

export interface IrtExamLogsResponse {
  id: string;
  eventLNum: string;
  lineNum: number;
  itemID: number;
  response: number;
  lineTheta: number;
  lineSEM: number;
  aDisc: number;
  bDiff: number;
  cnCateg: number;
}

export interface ThetaZeroCummResponse {
  id: string;
  seqNum: number;
  lastSumNum: number;
  lastSumDenom: number;
  lastCumulativeTheta: number;
  accountId: string;
}

export interface ThetaCalcScratchResponse {
  seqNum: number;
  qlNum: string;
  aDisc: number;
  bDiff: number;
  cGuess: number;
  response: number;
  inclusion: number;
  eventLNum: string;
}

export interface ConfirmPaymentParams {
  paymentIntentId: string | null;
  email: string | undefined;
  paymentMethodId: string | undefined;
}

export interface ConfirmPaymentResponse {
  responseCode: number;
  returnUrl: string;
}

export interface CheckoutSessionParams {
  amount: number;
  currency: string;
  productName: string;
  productDescription: string;
}

export interface CheckoutSessionResponse {
  sessionId: string;
}

export interface ReportedIssuesResponse {
  id: string;
  ticketNumber: string;
  email: string;
  categoryId: string;
  category: CategoryResponse;
  systemProduct: number;
  description: string;
  dateReported: string;
}

export interface CategoryResponse {
  id: string;
  categoryName: string;
  categoryDescription: string;
  categoryType: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomerParams {
  firstname: string;
  middlename: string | null;
  lastname: string;
  email: string;
  orderNumber: string;
  productId: string;
  totalAmount: number;
}
