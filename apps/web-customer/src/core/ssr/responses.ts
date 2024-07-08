import { AxiosError } from "axios";
import { NextApiResponse } from "next";

export const errorResponse = async (error: unknown, res: NextApiResponse) => {
  const axiosError = error as AxiosError<{
    errors: { message: string; code: string };
  }>;
  const errors = axiosError?.response?.data?.errors;

  res
    .status(axiosError.response?.status ?? 500)
    .json({
      status: axiosError.response?.status,
      statusText: axiosError.response?.statusText,
      errors,
    });
};
