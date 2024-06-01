import { withSsrHttpClient } from "@repo/core-library";
import { NextApiHandler } from "next";
import { datatypes } from "@repo/core-library";

const handler: NextApiHandler = withSsrHttpClient(
  (client) => async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({
        message: "MethodNotAllowedException",
      });
    }

    try {
      const result = await client.post(
        "/BaseSession/question-session",
        req.body as datatypes.ItemSessionTypes
      );
      res.status(result.status).json(result.data);
    } catch (error) {
      console.log(error);
    }
  }
);
export default handler;
