import { NextApiHandler } from "next";
import { withSsrHttpClient } from "core-library";
import { errorResponse } from "core-library/api/ssr/responses";
import { ValidateResetLinkTokenParams } from "core-library/api/types";

const handler: NextApiHandler = withSsrHttpClient(
  (client) => async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({
        message: "MethodNotAllowedException",
      });
    }
    try {
      const result = await client.post<boolean>(
        `/api/v2/internal/baseInternal/validate-reset-token`,
        req.body as ValidateResetLinkTokenParams
      );
      res.status(result.status).json(result.data);
    } catch (error) {
      errorResponse(error, res);
    }
  }
);

export default handler;
