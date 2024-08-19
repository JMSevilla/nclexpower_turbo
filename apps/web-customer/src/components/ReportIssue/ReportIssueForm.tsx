import React from 'react';
import { MultipleSelectField, TextField, Button } from 'core-library/components';
import { useForm } from 'react-hook-form';
import { ReportIssueType, ReportSchema } from '../../core/Schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useBusinessQueryContext } from 'core-library/contexts';
import { useFormFocusOnError } from 'core-library/hooks';

type Props = {
  onSubmit: (data: ReportIssueType) => void;
}

type CategoryType = {
  id: string;
  categoryName: string;
}

export default function ReportIssueForm({ onSubmit }: Props) {
  const { businessQueryGetReportCategories } = useBusinessQueryContext();
  const { data } = businessQueryGetReportCategories([
    "CategoryList",
  ], 1);

  const form = useForm<ReportIssueType>({
    mode: "all",
    resolver: yupResolver(ReportSchema),
    defaultValues: ReportSchema.getDefault()
  });

  const { control, handleSubmit, formState, setFocus, clearErrors } = form;
  useFormFocusOnError<ReportIssueType>(formState.errors, setFocus);

  const categories = data?.map((item: CategoryType) => ({
    label: item.categoryName,
    value: item.id,
  }))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MultipleSelectField
        control={control}
        name="categoryId"
        options={categories ?? []}
        label={"Select Report Categories"}
        sx={{ marginY: 2, borderRadius: '10px', width: '100%' }}
      />
      <TextField<ReportIssueType>
        control={control}
        name="email"
        label="Email Address"
        placeholder="Input your email address here..."
        onBlur={() => clearErrors()}
        sx={{ borderRadius: '5px', marginBottom: 2 }}
        inputProps={{ style: { padding: 15, borderRadius: '5px' } }}
      />
      <TextField<ReportIssueType>
        multiline
        rows={4}
        control={control}
        name="description"
        label="Provide a brief description about the encountered issue:"
        placeholder="Describe the issue..."
        onBlur={() => clearErrors()}
      />
      <Button
        variant="contained"
        onClick={handleSubmit(onSubmit)}
        sx={{ borderRadius: 1 }}
        className="w-full mt-6 p-3 bg-darkBlue hover:bg-hoverBlue"
      >
        Submit
      </Button>
    </form>
  )
}