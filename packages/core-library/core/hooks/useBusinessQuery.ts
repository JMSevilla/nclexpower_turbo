import { useMutation } from "react-query";
import { useApiCallback, useApi } from "../../hooks";
import { MutOpt, ApiServiceErr } from "./types";

const useAppMutation = <Response, TVariables = unknown>(
  mutationFn: (variables: TVariables) => Promise<Response>,
  opt?: MutOpt<Response, TVariables>
) => useMutation<Response, ApiServiceErr, TVariables>(mutationFn, opt);

export const useBusinessQuery = () => {};
