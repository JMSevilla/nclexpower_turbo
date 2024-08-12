import { AxiosError, AxiosInstance } from "axios";
import { RegisterParams } from "../../types/types";
import qs from "query-string";
import { config } from "../../config";
import {
  CheckoutSessionParams,
  CheckoutSessionResponse,
  ConfirmPaymentParams,
  ConfirmPaymentResponse,
  CreateCustomerParams,
  CreatePaymentIntentParams,
  PaymentIntentResponse,
  ResendCodeParams,
  ResetPasswordParams,
  SelectEmailResponse,
  UpdatePaymentIntentParams,
  ValidateResetLinkTokenParams,
  VerificationResponse,
  VerifyCodeParams,
} from "../types";
export class WebApi {
  constructor(
    private readonly axios: AxiosInstance,
    private readonly ssrAxios: AxiosInstance
  ) {}

  /* This api should be in web-api-backoffice */
  public web_account_setup(params: RegisterParams) {
    return this.axios.post<number>(
      "/api/v2/payment/intent/config-get-publishable-key/",
      params
    );
  }

  public web_get_publishableKey() {
    return this.ssrAxios.get<string>(
      `/api/publishable/${qs.stringify({ environments: config.value.APPENV })}`
    );
  }

  public web_select_email(email: string) {
    return this.ssrAxios.post<SelectEmailResponse>(
      `/api/account-recovery/${qs.stringify({ email: email })}`
    );
  }

  public web_reset_link(params: ResendCodeParams) {
    return this.ssrAxios.post<VerificationResponse>(
      `/api/reset/send-link`,
      params
    );
  }

  public web_verification_code(email: string) {
    return this.ssrAxios.post<VerificationResponse>(
      `/api/verification/${qs.stringify({ email: email })}`
    );
  }

  public web_verify_otp_code(params: VerifyCodeParams) {
    return this.ssrAxios.post<VerificationResponse>(
      `/api/security/otp/verify`,
      params
    );
  }

  public web_validate_reset_token(params: ValidateResetLinkTokenParams) {
    return this.ssrAxios.post<boolean>(
      `/api/security/reset-link/validate-token`,
      params
    );
  }

  public web_reset_password(params: ResetPasswordParams) {
    return this.ssrAxios.post<number>(
      `/api/security/reset-link/reset-password`,
      params
    );
  }

  public web_resend_otp_code(params: ResendCodeParams) {
    return this.ssrAxios.post<VerificationResponse>(
      `/api/security/otp/resend`,
      params
    );
  }

  public web_create_payment_intent(params: CreatePaymentIntentParams) {
    return this.ssrAxios.post<PaymentIntentResponse>(
      `/api/client/secret`,
      params
    );
  }

  public web_update_payment_intent(params: UpdatePaymentIntentParams) {
    return this.axios.post<number>(
      `/api/v2/payment/intent/update-payment-intent`,
      params
    );
  }

  public web_ssr_confirm_payment(params: ConfirmPaymentParams) {
    return this.ssrAxios.post<ConfirmPaymentResponse>(
      `/api/client/confirm-payment`,
      params
    );
  }

  public web_ssr_create_checkout_session(params: CheckoutSessionParams) {
    return this.ssrAxios.post<CheckoutSessionResponse>(
      `/api/client/create-payment-session`,
      params
    );
  }

  public web_ssr_create_customer(params: CreateCustomerParams) {
    return this.ssrAxios.post<number>(`/api/customer/create`, params);
  }

  public web_get_client_secretKey(pageRoute: string) {
    return this.axios.get<string>(
      `/api/v2/internal/baseInternal/get-client-key?${qs.stringify({ pageRoute })}`
    );
  }
}
