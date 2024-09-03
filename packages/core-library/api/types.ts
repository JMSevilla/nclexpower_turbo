import { CreateRegularAtom } from "../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/useAtomic";

export type AccessTokenResponse = {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiration: string;
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
  productId: string;
  pricingId: string;
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
  responseCode: number | undefined;
  is2FaEnabled: boolean;
  twoFactorCodeExpiryTime: string;
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
  email: string;
  firstname: string;
  middlename?: string | undefined;
  lastname: string;
  orderNumber: string;
  productId: string;
  amount: number;
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

export interface CreateCustomerDumpParams {
  firstname: string;
  middlename: string | null;
  lastname: string;
  email: string;
  orderNumber: string;
  productId: string;
  totalAmount: number;
  paymentIntentId: string;
}

export type DiscrepanciesResponse = {
  discrepancies: DiscrepancyItem[];
};

export type DiscrepancyItem = {
  record: DiscrepancyRecordItem;
  missingIn: string;
};

export type DiscrepancyRecordItem = {
  qid: number;
  qLNum: number;
  question: string;
  choice_1: string;
  choice_2: string;
  choice_3: string;
  choice_4: string;
  choice_5: string;
  choice_6: string;
  correct: string;
  rationale: string;
  cogLNum: number;
  cnCateg: number;
  integPLNum: number;
  contentLNum: number;
};

export type FileUploadParams = {
  file: File;
};

export type SelectEmailResponse = {
  isExpired: boolean;
  proceed: boolean;
  accountIsFound: boolean;
  remainingDays: number;
  remainingMonths: number;
  validUntil: string;
};

export type VerificationResponse = {
  responseCode: number;
  waitTimeInMinutes: number;
};

export type VerifyCodeParams = {
  code: number;
  email: string;
};

export type ResendCodeParams = {
  email: string;
};

export type ValidateTokenParams = {
  accessToken: string | undefined;
  appName: string;
};

export type RegularQuestionTypeParams = {
  questionType: string;
  description: string;
};

export type ValidateResetLinkTokenParams = {
  accountId: string;
  token: string;
};

export type ResetPasswordParams = {
  accountId: string;
  token: string;
  newPassword: string;
};

export type Verify2FAParams = {
  email: string;
  code: string;
  password: string;
  appName: string;
};

export type ReportIssueType = {
  email: string;
  categoryId: string;
  description: string;
  systemProduct: number;
};

export type GetCategoryType = {
  id: string;
  categoryName: string;
  categoryDescription: string;
  categoryType: number;
  createdAt: string;
  updatedAt: string;
};

export type MainContentAnswerCollectionDtos =  {
  answer: string,
  answerKey: boolean
}

export type  MainContentCollectionsDtos =    {
  cognitiveLevel: string,
  clientNeeds: string,
  contentArea: string,
  question: string,
  mainContentAnswerCollectionDtos: MainContentAnswerCollectionDtos[]
}

export type CreateRegularType = {
  email: string,
  contentDto: {
    type: string,
    mainType: string,
    mainContentCollectionsDtos: MainContentCollectionsDtos[]
  }
}