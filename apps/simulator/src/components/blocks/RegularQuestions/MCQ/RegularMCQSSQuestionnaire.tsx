import React from "react";
import { Grid, Paper } from "@mui/material";
import { RegularQuestion } from "@/core/types/ssrData";
import NearMeIcon from "@mui/icons-material/NearMe";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import { ControlledRadioGroup } from "@/components/Radio";
import { datatypes } from "@repo/utils";
import { McqSsValidationType, RowSchema } from "@/core/schema/mcq/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormSubmissionBindingHooks } from "@repo/utils/hooks/useFormSubmissionBindingHooks";
import { useAtom } from "jotai";
import { McqSsValidationAtom } from "@/core/schema/useAtomic";
import { useRegularMCQQuestionnaire } from "./hooks";
import { useApplicationContext } from "@/core/context/AppContext";
import { useRouter } from "next/router";

export const RegularMCQSSQuestionnaire: React.FC<RegularQuestion> = ({
  contents,
  itemselection,
}) => {
  const router = useRouter();
  const [mcqAtom, setMcqAtom] = useAtom(McqSsValidationAtom);
  const { throwAnswerCb } = useRegularMCQQuestionnaire();
  const { setLoader } = useApplicationContext();
  const form = useForm<McqSsValidationType>({
    mode: "all",
    resolver: zodResolver(RowSchema),
  });

  const { control } = form;
  const formState = useFormState({ control: control });

  useFormSubmissionBindingHooks({
    key: "MCQSS",
    isValid: formState.isValid,
    isDirty: formState.isDirty,
    cb: () => form.handleSubmit(handleSubmit)(),
    initDependencies: [mcqAtom],
  });

  async function handleSubmit(value: McqSsValidationType) {
    await throwAnswerCb
      .execute({
        accountId: "3FA85F64-5717-4562-B3FC-2C963F66AFA6", //Account id should replaced with actual account id
        LNum: itemselection[0].lNum,
        qType: itemselection[0].questionUI,
        answer: value.mcqss,
      })
      .then((res: any) => {
        if (res.data === 200) {
          setLoader(true);
          // create a hook for re-routing the application same page.
          router.push({
            pathname: "/next-item",
            query: {
              slug: [
                "B850483A-AC8D-4DAE-02C6-08DC5B07A84C",
                "C002B561-66AF-46FC-A4D2-D282D42BD774",
                "true",
              ],
            },
          });
        }
      });
  }

  return (
    <div className="p-2 h-full tracking-tight">
      <FormProvider {...form}>
        <Grid
          container
          rowSpacing={1}
          justifyContent={"center"}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Paper sx={{ width: "70%" }}>
            <div className="h-full w-full p-4">
              {itemselection &&
                itemselection.length > 0 &&
                itemselection.map(
                  (item: datatypes.CalcItemSelectValues, idx) => (
                    <div key={item.qId}>
                      <div>
                        {contents &&
                          contents.answerUI.length > 0 &&
                          contents.answerUI.map(
                            (answerMap: datatypes.AnswerUIItem) => (
                              <React.Fragment>
                                <div className="p-2">
                                  {answerMap.answerInstruction}
                                </div>
                              </React.Fragment>
                            )
                          )}
                      </div>

                      <div>
                        <NearMeIcon className="h-6 rotate-45 text-[#86BCEA] mr-2 pb-1" />
                        {item.question}
                      </div>

                      <div className="p-5">
                        {contents.choices?.length > 0 &&
                          contents.choices.map((choiceMap, choiceIndex) => {
                            const parsedChoice: datatypes.ParsedChoices[] =
                              JSON.parse(choiceMap.choices);
                            return (
                              <React.Fragment key={choiceIndex}>
                                <ControlledRadioGroup
                                  radio={parsedChoice}
                                  control={control}
                                  name={`mcqss`}
                                />
                              </React.Fragment>
                            );
                          })}
                      </div>
                    </div>
                  )
                )}
            </div>
          </Paper>
        </Grid>
      </FormProvider>
    </div>
  );
};
