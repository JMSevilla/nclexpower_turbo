import {
    Checkbox,
    Grid,
    Paper,
    Radio,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import NearMeIcon from '@mui/icons-material/NearMe';
import React, { useEffect, useState } from 'react';
import { Row, AnswerProps } from '@/core/types/ssrData';
import { ControlledCheckbox } from '@/components/Checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useFormState } from 'react-hook-form';
import { mcqGSchema, MCQGValidationType } from '@/core/schema/mcqGroup/validation';
import { MCQGValidationAtom } from '@/core/schema/useAtomic';
import { useFormSubmissionBindingHooks } from '@repo/core-library/hooks/useFormSubmissionBindingHooks';
import { useAtom } from 'jotai';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useFormSubmissionBindingHooks } from '@repo/core-library/hooks/index'
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ControlledCheckbox } from '@/components/Checkbox';
import { ControlledTableRadioButton } from '@/components/TableRadioButton';
import { FormHelperText } from '@/components/FormHelperText';
import NearMeIcon from '@mui/icons-material/NearMe';


type RenderButtonsProps = {
    row?: MCQGValidationType | any;
    rowIndex?: number;
    chKey?: string;
    chKeys?: string[];
    handleChange?: ChangeHandler;
}

export type DataProps = {
    rowIndex: number | any;
    chKey: string;
    chKeys: string[];
}

export type ChangeHandler = (onChange: (value: boolean) => void, data: DataProps) => void;


export const MCQAnswerGroupTable: React.FC<SsrData> = ({ questionaire, answer }) => {
    const [mcqGAtom, setmcqGAtom] = useAtom(MCQGValidationAtom);
    const rows = answer ? answer[0].rows : null;

    const form = useForm<MCQGValidationType>({
        mode: 'all',
        resolver: zodResolver(mcqGSchema),
        defaultValues: {
            mcqGroup: rows,
        },
    });

    const { control } = form;

    const formState = useFormState({ control: control });

    useEffect(() => {
        if (formState?.errors?.mcqGroup?.length > 0) {
            executeToast('Did not reach the answer expected', 'top-right', false);
        }
    }, [formState.errors]);

    useFormSubmissionBindingHooks({
        key: 'MCQGroup',
        isValid: formState.isValid,
        isDirty: formState.isDirty,
        cb: () => form.handleSubmit(handleSubmit)(),
        initDependencies: [mcqGAtom],
    });

    async function handleSubmit(values: MCQGValidationType) {
        console.log(values);
        setmcqGAtom(values);
    }

    const initialSelectedValues = table.map((rowItem: any) =>
        rowItem.answer.map((item: AnswerProps) => item.rows.map(() => Array(3).fill(0))),
    );
    const flattenedInitialValues: number[][] = initialSelectedValues.flat(2);

    const [selectedValues, setSelectedValues] = useState<number[][]>(flattenedInitialValues);

    const renderCheckboxes = (row: Row, rowIndex: number) => {
        const chKeys = Object.keys(row).filter(key => key.startsWith('ch'));
        return (
            <>
                {chKeys.slice(0, 3).map((chKey, chIndex) => (
                    <TableCell align="center" className="border border-[#D4D7DA]">
                        <ControlledCheckbox control={control} name={`mcqGroup.${rowIndex}.${chKey}`} />
                    </TableCell>
                ))}
            </>
        );
    };

    const handleRadioChange = (rowIndex: number, optionIndex: number) => {
        const newSelectedValues = selectedValues.map((row, index) =>
            index === rowIndex ? row.map((value, i) => (i === optionIndex ? 1 : 0)) : row,
        );
        setSelectedValues(newSelectedValues);
    };

    const renderRadioButtons = (row: Row, rowIndex: number) => {
        const chKeys = Object.keys(row).filter(key => key.startsWith('ch'));
        return (
            <>
                {chKeys.slice(0, 3).map((chKey, chIndex) => (
                    <TableCell align="center" key={chIndex} className="border border-[#D4D7DA] ">
                        <Radio
                            checked={selectedValues[rowIndex][chIndex] === 1}
                            onChange={() => handleRadioChange(rowIndex, chIndex)}
                        />
                    </TableCell>
                ))}
            </>
        );
    };

    return (
        <Grid>
            <div className="h-full w-full font-sans">
                <FormProvider {...form}>
                    {table.length > 0 &&
                        table.map((answerItem: AnswerProps, answerIndex: number) => (
                            <div key={answerIndex} className="w-full">
                                <div className="w-full text-sm mb-4 pr-5">
                                    <div className="w-full text-sm mb-4 pr-5">
                                        <p className="flex" key={answerIndex}>
                                            <NearMeIcon className="h-6 rotate-45 text-[#86BCEA] mr-2 pb-1" />
                                            {answerItem.answer
                                                ? answerItem.answer.length > 0 &&
                                                answerItem.answer.map((answerItem: AnswerProps) => (
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: answerItem.answerInstruction,
                                                        }}
                                                    />
                                                ))
                                                : null}
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <Paper elevation={3}>
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        {answerItem.answer
                                                            ? answerItem.answer.length > 0 &&
                                                            answerItem.answer.map(
                                                                (answerContainer: AnswerProps) =>
                                                                    answerContainer.columns &&
                                                                    answerContainer.columns.map((columnName: any, index: number) => (
                                                                        <TableCell
                                                                            key={index}
                                                                            align="center"
                                                                            className="text-sm bg-[#E6F2FF] font-semibold border border-[#D4D7DA]"
                                                                            sx={{ width: '80px' }}
                                                                        >
                                                                            {columnName}
                                                                        </TableCell>
                                                                    )),
                                                            )
                                                            : null}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {answerItem.answer
                                                        ? answerItem.answer.length > 0 &&
                                                        answerItem.answer.map(
                                                            (answerContainer: AnswerProps) =>
                                                                answerContainer.rows.length > 0 &&
                                                                answerContainer.rows.map((row: Row, index: number) => (
                                                                    <TableRow key={index}>
                                                                        <TableCell align="left" className="border border-[#D4D7DA] px-4 py-2 w-40 ">
                                                                            {row.rowTitle}
                                                                        </TableCell>
                                                                        {table.length > 0 &&
                                                                            table.map((tableItem: any) =>
                                                                                tableItem.QType === 'MCQNoGroup'
                                                                                    ? renderRadioButtons(row, index)
                                                                                    : renderCheckboxes(row, index),
                                                                            )}
                                                                    </TableRow>
                                                                )),
                                                        )
                                                        : null}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Paper>
                                    <div className="w-full text-sm mb-4 pr-5 pt-4 flex gap-1">
                                        <p>Note:</p>
                                        <p>
                                            {answerItem.answer
                                                ? answerItem.answer.length > 0 &&
                                                answerItem.answer.map((answerItem: AnswerProps) => answerItem.note)
                                                : null}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </FormProvider>
            </div>
        </Grid>
    );
};
