import { NextApiHandler } from "next";
import { withSsrHttpClient } from "core-library";
import { errorResponse } from "../../../core/ssr/responses";

const handler: NextApiHandler = withSsrHttpClient(
  (client) => async (req, res) => {
    try {
      const { key } = req.query;
      const result = await client.get<string>(
        `/api/v2/payment/intent/config-get-publishable-key?${key}`
      );
      res.status(result.status).json(result.data);
    } catch (error) {
      errorResponse(error, res);
    }
  }
);

export default handler;
