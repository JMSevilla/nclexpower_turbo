import { NextApiHandler } from "next";
import { withSsrHttpClient } from "core-library";
import { errorResponse } from "../../../core/ssr/responses";
import {
  CreatePaymentIntentParams,
  PaymentIntentResponse,
} from "core-library/api/types";

const handler: NextApiHandler = withSsrHttpClient(
  (client) => async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({
        message: "MethodNotAllowedException",
      });
    }

    try {
      const result = await client.post<PaymentIntentResponse>(
        `/api/v2/payment/intent/proceed`,
        req.body as CreatePaymentIntentParams
      );
      res.status(result.status).json(result.data);
    } catch (error) {
      errorResponse(error, res);
    }
  }
);

export default handler;
