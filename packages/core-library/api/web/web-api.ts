import { AxiosError, AxiosInstance } from "axios";
import { RegisterParams } from "../../types/types";
import qs from "query-string";
import { config } from "../../config";
import { CreatePaymentIntentParams, PaymentIntentResponse, UpdatePaymentIntentParams } from "../types";
export class WebApi {
  constructor(
    private readonly axios: AxiosInstance,
    private readonly ssrAxios: AxiosInstance
  ) { }

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
}
