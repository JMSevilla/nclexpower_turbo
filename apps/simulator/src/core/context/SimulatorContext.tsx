import { createContext, useContext, useEffect, useState } from "react";
import { hooks, datatypes } from "@repo/core-library";

type SimulatorGlobalsValues = {
  contents: datatypes.QuestionContentsResponse;
};

type SsrSimulatorValues = {
  data: datatypes.CalcItemSelectValues[];
};

type PropertyNameTypes = "answerUI" | "choices" | "questionType";

const SimulatorGlobalsContext = createContext<SimulatorGlobalsValues>(
  undefined as any
);

export const SimulatorProvider: React.FC<
  React.PropsWithChildren<SsrSimulatorValues>
> = ({ children, data }) => {
  const [contents, setContents] = useState<datatypes.QuestionContentsResponse>({
    answerUI: [],
    choices: [],
    questionType: [],
  });
  const [itemSelect] = useState(data[0]);

  const updateContents = (propertyName: PropertyNameTypes, newData: any) => {
    setContents((prevState) => ({
      ...prevState,
      [propertyName]: newData,
    }));
  };

  const simulatorContent = hooks.useApi(async (api) => {
    const result = await api.preloadedGlobals.getAllContentsQuestion({
      LNum: itemSelect.lNum,
      qId: itemSelect.qId,
      QLNum: itemSelect.qLNum,
      tabId: itemSelect.tabId,
    });
    return result.data;
  }, []);
  useEffect(() => {
    if (simulatorContent.result) {
      const { answerUI, choices, questionType } = simulatorContent.result;
      if (answerUI?.length > 0) {
        updateContents("answerUI", answerUI);
      }
      if (choices?.length > 0) {
        updateContents("choices", choices);
      }
      if (questionType?.length > 0) {
        updateContents("questionType", questionType);
      }
    }
  }, [simulatorContent.result]);
  return (
    <SimulatorGlobalsContext.Provider
      value={{
        contents: contents,
      }}
    >
      {children}
    </SimulatorGlobalsContext.Provider>
  );
};

export const useSimulatorGlobals = () => {
  if (!SimulatorGlobalsContext) {
    throw new Error("SimulatorProvider must used.");
  }
  return useContext(SimulatorGlobalsContext);
};
