import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const http = axios.create();
export const commonsApi = axios.create({
  baseURL: "http://localhost:5281/api",
});

type RequestHandlerCallback = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>;

export const securedRequestHandler =
  (cbFn: RequestHandlerCallback) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await cbFn(req, res);
    } catch (error) {
      if (error instanceof AxiosError) {
        res
          .status(error.response?.status ?? 500)
          .json(error.response?.data ?? "Something went wrong");
        return;
      }
      res.status(500).json("Something went wrong");
    }
  };

export default http;
