import { AxiosError, AxiosInstance } from "axios";
import { RegisterParams } from "../../types/types";
import qs from "query-string";
import { config } from "../../config";
import {
  CheckoutSessionParams,
  CheckoutSessionResponse,
  ConfirmPaymentParams,
  ConfirmPaymentResponse,
  CreatePaymentIntentParams,
  PaymentIntentResponse,
  UpdatePaymentIntentParams,
} from "../types";
export class WebApi {
  constructor(
    private readonly axios: AxiosInstance,
    private readonly ssrAxios: AxiosInstance
  ) {}

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
}
