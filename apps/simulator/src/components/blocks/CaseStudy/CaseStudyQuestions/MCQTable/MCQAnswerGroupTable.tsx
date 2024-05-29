import React from 'react'
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import NearMeIcon from '@mui/icons-material/NearMe';
import { AnswerProps, QuestionaireProps } from '@/core/types/ssrData';
import { ControlledCheckbox } from '@/components/Checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { mcqGSchema, MCQGValidationType } from '@/core/schema/mcqGroup/validation';
import { MCQGValidationAtom } from "@/core/schema/useAtomic";
import { useFormSubmissionBindingHooks } from '@repo/utils/hooks/useFormSubmissionBindingHooks';
import { useAtom } from 'jotai';
import { FormHelperText } from '@/components/FormHelperText';
import { ControlledTableRadioButton } from '@/components/TableRadioButton';

interface RenderButtonsProps {
    row: MCQGValidationType;
    rowIndex: number;
}

export const MCQAnswerGroupTable: React.FC<QuestionaireProps[]> = ({ table }) => {
    const [mcqGAtom, setmcqGAtom] = useAtom(MCQGValidationAtom);

    const itemHolder = table ? table.length > 0 && table.map((main: QuestionaireProps) =>
        main?.answer ? main?.answer.length > 0 && main?.answer.map((answerItem) =>
            answerItem.rows
        ) : null
    ) : null

    const rows = itemHolder.length > 0 ? itemHolder.pop()[0] : []; // To track down the child array

    const form = useForm<MCQGValidationType>({
        mode: "all",
        resolver: zodResolver(mcqGSchema),
        defaultValues: {
            mcqGroup: rows,
        },
    })
    const { control, formState, setValue } = form;
    const { fields } = useFieldArray({ control, name: "mcqGroup" })


    useFormSubmissionBindingHooks({
        key: "MCQGroup",
        isValid: formState.isValid,
        isDirty: formState.isDirty,
        cb: () => form.handleSubmit(handleSubmit)(),
        initDependencies: [mcqGAtom],
    });

    async function handleSubmit(values: MCQGValidationType) {
        console.log("VALUE : ", values);
        setmcqGAtom(values);
    }

    const RenderCheckboxes: React.FC<RenderButtonsProps> = ({ row, rowIndex }) => {
        const chKeys = Object.keys(row).filter(key => key.startsWith('ch'));
        return (
            <>
                {chKeys.map((chKey, chIndex) => (
                    <TableCell align="center" className='border border-[#D4D7DA]'>
                        <ControlledCheckbox
                            control={control}
                            name={`mcqGroup.${rowIndex}.${chKey}`}
                        />
                    </TableCell>
                ))}

            </>
        );
    };

    const RenderRadioButtons: React.FC<RenderButtonsProps> = ({ row, rowIndex }) => {
        const chKeys = Object.keys(row).filter(key => key.startsWith('ch'));
        return (
            <>
                {chKeys.map((chKey, chIndex) => (
                    <TableCell align='center' key={chIndex} className='border border-[#D4D7DA] '>
                        <ControlledTableRadioButton
                            control={control}
                            name={`mcqGroup.${rowIndex}.${chKey}`}
                            choiceKeys={chKeys}
                            chKey={chKey}
                            rowIndex={rowIndex}
                            setValue={setValue}
                        />
                    </TableCell >
                ))}
            </>
        );
    };

    return (
        <Grid >
            <div className='h-full w-full font-sans'>
                <FormProvider {...form}>
                    {table ? table.length > 0 &&
                        table.map((answerItem: AnswerProps, answerIndex: number) => (
                            <div key={answerIndex} className='w-full'>
                                <div className='w-full text-sm mb-4 pr-5'>
                                    <div className='w-full text-sm mb-4 pr-5'>
                                        <p className="flex" key={answerIndex}>
                                            <NearMeIcon className="h-6 rotate-45 text-[#86BCEA] mr-2 pb-1" />
                                            {answerItem.answer ? answerItem.answer.length > 0 && answerItem.answer.map((answerItem: AnswerProps) => (
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: answerItem.answerInstruction,
                                                    }}
                                                />
                                            )) : null}
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <Paper elevation={3}>
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        {answerItem.answer ? answerItem.answer.length > 0 && answerItem.answer.map((answerContainer: AnswerProps) =>
                                                            answerContainer.columns && answerContainer.columns.map((columnName: any, index: number) =>
                                                                <TableCell key={index} align="center" className='text-sm bg-[#E6F2FF] font-semibold border border-[#D4D7DA]' sx={{ width: '80px' }}>{columnName}</TableCell>
                                                            )
                                                        ) : null}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {fields.length > 0 && fields.map((row, index) =>
                                                        <TableRow key={index}>
                                                            <TableCell align="left" className='border border-[#D4D7DA] px-4 py-2 w-40 '>{row.rowTitle}</TableCell>
                                                            {table ? table.length > 0 && table.map((tableItem: QuestionaireProps) => (
                                                                tableItem.QType === "MCQNoGroup" ?
                                                                    <RenderRadioButtons row={row} rowIndex={index} />
                                                                    :
                                                                    <RenderCheckboxes row={row} rowIndex={index} />
                                                            )) : null}
                                                        </TableRow>)}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Paper>
                                    <div className='w-full text-sm mb-4 pr-5 pt-4 flex gap-1'>
                                        <p>Note:</p>
                                        <p>{answerItem.answer ? answerItem.answer.length > 0 && answerItem.answer.map((answerItem: AnswerProps) => (
                                            answerItem.note
                                        )) : null}</p>
                                    </div>
                                </div>
                            </div>
                        )) : null}
                </FormProvider>

                {(!formState.isValid || (formState.isDirty && !formState.isValid)) && (
                    <FormHelperText error={true}>
                        Each row should have at least one selected value
                    </FormHelperText>
                )}

            </div>
        </Grid >
    )
}

