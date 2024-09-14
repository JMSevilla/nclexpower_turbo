import { useEffect, useState } from "react";
import { GetCategoryType } from "../../../../../../../../../../../../../api/types";
import { useBusinessQueryContext } from "../../../../../../../../../../../../../contexts";

export const useSelectfieldOptions = () => {
  const [cleanedClientNeeds, setCleanedClientNeeds] =
    useState<Omit<GetCategoryType, "id">[]>();
  const [cleanedContentArea, setCleanedContentArea] =
    useState<Omit<GetCategoryType, "id">[]>();
  const [cleanedCognitiveLevel, setCleanedCognitiveLevel] =
    useState<Omit<GetCategoryType, "id">[]>();

  const { businessQueryGetRegularQuestionDDCategory } =
    useBusinessQueryContext();
  const { data: ClientNeeds } = businessQueryGetRegularQuestionDDCategory(
    ["getClientNeeds"],
    2
  );
  const { data: ContentArea } = businessQueryGetRegularQuestionDDCategory(
    ["getContentArea"],
    3
  );
  const { data: CognitiveLevel } = businessQueryGetRegularQuestionDDCategory(
    ["getCognitiveLevel"],
    4
  );

  useEffect(() => {
    /**
     * This removeId function is temporary only
     */
    const removeId = async (
      data: GetCategoryType[]
    ): Promise<Omit<GetCategoryType, "id">[]> => {
      return data.map(({ id, ...rest }) => rest);
    };

    const processData = async () => {
      if (ClientNeeds) {
        const cleanedData = await removeId(ClientNeeds);
        setCleanedClientNeeds(cleanedData);
      }
      if (ContentArea) {
        const cleanedData = await removeId(ContentArea);
        setCleanedContentArea(cleanedData);
      }
      if (CognitiveLevel) {
        const cleanedData = await removeId(CognitiveLevel);
        setCleanedCognitiveLevel(cleanedData);
      }
    };

    processData();
  }, [ClientNeeds, ContentArea, CognitiveLevel]);

  return { cleanedClientNeeds, cleanedContentArea, cleanedCognitiveLevel };
};
