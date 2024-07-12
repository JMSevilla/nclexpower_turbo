import { NextApiHandler } from "next";
import { withSsrHttpClient } from "core-library";
import { errorResponse } from "../../../core/ssr/responses";
import {
  ConfirmPaymentParams,
  ConfirmPaymentResponse,
} from "core-library/api/types";

const handler: NextApiHandler = withSsrHttpClient(
  (client) => async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({
        message: "MethodNotAllowedException",
      });
    }

    try {
      const result = await client.post<ConfirmPaymentResponse>(
        `/api/v2/payment/intent/confirm-payment`,
        req.body as ConfirmPaymentParams
      );
      res.status(result.status).json(result.data);
    } catch (error) {
      errorResponse(error, res);
    }
  }
);
export default handler;
