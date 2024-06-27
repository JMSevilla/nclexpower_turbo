import { useMutation, useQuery, UseQueryResult } from "react-query";
import { MutOpt, ApiServiceErr } from "./types";
import { useApi, useApiCallback } from "../../hooks";
import { CalcItemSelectResponseItem, ItemSelectTypes } from "../../types";

export const useAppMutation = <Response, TVariables = unknown>(
  mutationFn: (variables: TVariables) => Promise<Response>,
  opt?: MutOpt<Response, TVariables>
) => useMutation<Response, ApiServiceErr, TVariables>(mutationFn, opt);

export const useLoadPreProcessQuery = (
  queryKey: string[]
): UseQueryResult<any, unknown> => {
  const loadPTestHimemCb = useApi((api) => api.calc.initializeLoadPTestHimem());
  const loadPreTrackItemCb = useApi((api) =>
    api.calc.initializeLoadPrepareTrackItem()
  );

  return useQuery<ApiServiceErr>(
    queryKey,
    async () => {
      loadPTestHimemCb.execute();
      loadPreTrackItemCb.execute();
    },
    { staleTime: Infinity }
  );
};

export const useSelectQuestionsQuery = (
  queryKey: string[],
  data: ItemSelectTypes
): UseQueryResult<CalcItemSelectResponseItem[] | undefined, any> => {
  const selectQuestionCb = useApiCallback(
    async (api, args: ItemSelectTypes) => await api.calc.ItemSelect(args)
  );

  return useQuery<CalcItemSelectResponseItem[] | undefined, ApiServiceErr>(
    queryKey,
    async () => {
      const result = await selectQuestionCb.execute({ ...data });
      return result.data;
    },
    { staleTime: Infinity }
  );
};
