import { SsrData } from "@/core/types/ssrData";
import React from "react";
import NearMeIcon from "@mui/icons-material/NearMe";
import { Paper, Grid } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  useFieldArray,
  FormProvider,
  useFormState,
} from "react-hook-form";
import { MrsnValidationAtom } from "@/core/schema/useAtomic";
import { ControlledCheckbox } from "@/components/Checkbox";
import { MrsnValidationType, RowSchema } from "@/core/schema/mrsn/validation";
import { useAtom } from "jotai";
import { useFormSubmissionBindingHooks } from "@repo/utils/hooks/useFormSubmissionBindingHooks";

export const MRSNQuestion: React.FC<SsrData> = ({ questionaire, answer }) => {
  //   console.log(answer);
  const [mrsnAtom, setMrsnAtom] = useAtom(MrsnValidationAtom);
  const form = useForm<MrsnValidationType>({
    mode: "all",
    resolver: zodResolver(RowSchema),
    defaultValues: {
      mrsn: [
        {
          label: "vital signs",
          value: false,
          xvalue: 1,
        },
        {
          label: "lung sounds",
          value: false,
          xvalue: 2,
        },
        {
          label: "capillary refill",
          value: false,
          xvalue: 3,
        },
        {
          label: "client orientaion",
          value: false,
          xvalue: 4,
        },
        {
          label: "radial pulse characteristics",
          value: false,
          xvalue: 5,
        },
        {
          label: "characteristic of cough",
          value: false,
          xvalue: 6,
        },
      ],
    },
  });

  const { control } = form;

  const { fields } = useFieldArray({
    name: "mrsn",
    control,
  });

  const formState = useFormState({ control: control });

  useFormSubmissionBindingHooks({
    key: "MRSN",
    isValid: formState.isValid,
    isDirty: formState.isDirty,
    cb: () => form.handleSubmit(handleSubmit)(),
    initDependencies: [mrsnAtom],
  });

  async function handleSubmit(values: MrsnValidationType) {
    console.log(values);
    setMrsnAtom(values);
  }

  return (
    <div className="p-2 py-2 min-h-[100dvh]">
      <FormProvider {...form}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={6} md={6}>
            <div className="h-full w-full p-4">
              {questionaire &&
                questionaire.map((questionItem) => (
                  <div key={questionItem.qId} className="w-full">
                    <div className="w-full text-sm mb-4 pr-5 pt-4">
                      <p>{questionItem.question}</p>
                    </div>
                    <div className="w-full">
                      {questionItem.tabs &&
                        questionItem.tabs.map((tab) => (
                          <>
                            <div className="flex gap-1">
                              <div
                                key={tab.tabsId}
                                className="bg-white w-fit px-5 py-1 rounded-t-md text-sm font-semibold flex items-center mb-[-3px]"
                              >
                                <p>{tab.tabsTitle}</p>
                              </div>
                            </div>
                            <Paper
                              elevation={3}
                              className="p-5 overflow-auto flex flex-col gap-5"
                              style={{ maxHeight: "70vh" }}
                            >
                              <div
                                key={tab.tabsId}
                                className=" h-[45vh] flex w-full gap-2"
                              >
                                <p className="font-semibold min-w-[50px]">
                                  {tab.tabsId} :
                                </p>
                                <div className="leading-6 text-sm">
                                  {tab.content}
                                </div>
                              </div>
                            </Paper>
                          </>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <div className="h-full w-full p-5">
              {answer &&
                answer.map((answerItem) => (
                  <>
                    <div
                      key={answerItem.answerId}
                      className="w-full text-sm mb-4 pr-5 pt-4"
                    >
                      <p className="flex">
                        <NearMeIcon className="h-6 rotate-45 text-[#86BCEA] mr-2 pb-1" />
                        <div
                          dangerouslySetInnerHTML={{
                            __html: answerItem.answerInstruction,
                          }}
                        />
                      </p>
                    </div>
                    <Paper
                      elevation={3}
                      className="p-5 overflow-auto flex flex-col gap-5"
                    >
                      <div className="w-full h-fit text-sm">
                        {fields?.length > 0 &&
                          fields.map((choices: any, idx) => (
                            <ol className="flex items-center p-3">
                              <ControlledCheckbox
                                control={control}
                                name={`mrsn.${idx}.value`}
                                label={choices.label}
                              />
                            </ol>
                          ))}
                      </div>
                    </Paper>
                    <div className="w-full text-sm mb-4 pr-5 pt-4 flex gap-1">
                      <p>{answerItem.note === "" ? "" : "Note:"}</p>
                      <p>{answerItem.note}</p>
                    </div>
                  </>
                ))}
            </div>
          </Grid>
        </Grid>
      </FormProvider>
    </div>
  );
};
