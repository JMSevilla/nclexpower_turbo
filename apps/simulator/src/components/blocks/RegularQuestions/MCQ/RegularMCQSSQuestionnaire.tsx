import { Grid, Paper } from "@mui/material";
import { RegularQuestion, SsrData } from "@/core/types/ssrData";
import React from "react";
import NearMeIcon from "@mui/icons-material/NearMe";
import { useForm, useFormState } from 'react-hook-form'
import { ControlledRadioGroup } from '@/components/Radio';
import { datatypes } from '@repo/utils';
import { McqSsValidationType, RowSchema } from '@/core/schema/mcq/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormSubmissionBindingHooks } from '@repo/utils/hooks/useFormSubmissionBindingHooks';
import { useAtom } from 'jotai';
import { McqSsValidationAtom } from '@/core/schema/useAtomic';

export const RegularMCQSSQuestionnaire: React.FC<RegularQuestion> = ({ contents, itemselection }) => {

	const [mcqAtom, setMcqAtom] = useAtom(McqSsValidationAtom)

	const form = useForm<McqSsValidationType>({
		mode: "all",
		resolver: zodResolver(RowSchema),
	});

	const { control } = form
	const formState = useFormState({ control: control });

	useFormSubmissionBindingHooks({
		key: "MCQSS",
		isValid: formState.isValid,
		isDirty: formState.isDirty,
		cb: () => form.handleSubmit(handleSubmit)(),
		initDependencies: [mcqAtom],
	});

	const handleSubmit = (value: McqSsValidationType) => {
		console.log(value)
		setMcqAtom(mcqAtom)
	}

	return (
		<div className="p-2 h-full tracking-tight">
			<Grid container rowSpacing={1} justifyContent={"center"} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				<Paper>

					<div className='h-full w-full p-4'>
						{itemselection && itemselection.length > 0 && itemselection.map((item: datatypes.CalcItemSelectValues, idx) =>
							<div key={item.qId}>
								<div>
									{contents && contents.answerUI.length > 0 && contents.answerUI.map((answerMap: datatypes.AnswerUIItem) =>
										<React.Fragment>
											<div className='p-2'>{answerMap.answerInstruction}</div>
										</React.Fragment>
									)}
								</div>

								<div><NearMeIcon className="h-6 rotate-45 text-[#86BCEA] mr-2 pb-1" />{item.question}</div>

								<div className="p-5">
									{contents.choices?.length > 0 && contents.choices.map((choiceMap, choiceIndex) => {
										const parsedChoice: datatypes.ParsedChoices[] = JSON.parse(choiceMap.choices)
										return (
											<React.Fragment key={choiceIndex}>
												<ControlledRadioGroup radio={parsedChoice} control={control} name={`mcqss`} />
											</React.Fragment>
										)
									})}
								</div>

							</div>
						)}
					</div>
				</Paper>

			</Grid>
		</div>
	);
};
