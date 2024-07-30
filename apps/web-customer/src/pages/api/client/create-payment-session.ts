import { NextApiHandler } from "next";
import { withSsrHttpClient } from "core-library";
import { errorResponse } from "core-library/api/ssr/responses";
import {
  CheckoutSessionParams,
  CheckoutSessionResponse,
} from "core-library/api/types";

const handler: NextApiHandler = withSsrHttpClient(
  (client) => async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({
        message: "MethodNotAllowedException",
      });
    }

    try {
      const result = await client.post<CheckoutSessionResponse>(
        `/api/v2/payment/intent/create-checkout-session`,
        req.body as CheckoutSessionParams
      );
      res.status(result.status).json(result.data);
    } catch (error) {
      errorResponse(error, res);
    }
  }
);

export default handler;
