import { Grid, Paper } from '@mui/material';
import React from "react"
import { FormProvider, useForm, useFormState } from 'react-hook-form';
import NearMeIcon from "@mui/icons-material/NearMe";
import { ControlledRadioGroup } from '@/components/RadioGroup';
import { RegularQuestion } from '@/core/types/ssrData';
import { McqSsValidationType, RowSchema } from '@/core/schema/mcq/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormSubmissionBindingHooks } from '@repo/core-library/hooks/index'
import { datatypes } from '@repo/core-library';


interface Props extends RegularQuestion {
    mcqAtom: McqSsValidationType | undefined
    handleSubmit: (value: McqSsValidationType) => void
}

export const MCQ: React.FC<Props> = ({ itemselection, contents, handleSubmit, mcqAtom }) => {

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
                                    (item: datatypes.CalcItemSelectValues) => (
                                        <div key={item.qId}>
                                            <div>
                                                {contents &&
                                                    contents.answerUI.length > 0 &&
                                                    contents.answerUI.map(
                                                        (answerMap: datatypes.AnswerUIItem) => (
                                                            <React.Fragment key={answerMap.answeringId}>
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
}