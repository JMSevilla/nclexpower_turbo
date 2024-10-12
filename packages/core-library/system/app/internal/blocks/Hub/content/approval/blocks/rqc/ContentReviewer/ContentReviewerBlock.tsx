import ContentApproverForm from './ContentApproverForm';
import { ContentReviewerForm } from './ContentReviewerForm';
import { Button, Card } from '../../../../../../../../../../components';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import React, { useState } from 'react';
import { useExecuteToast } from '../../../../../../../../../../contexts';
import { crbSchema, crbType } from './validation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type Props = {
  nextStep(values: {}): void;
  previousStep(): void;
  values: {};
}

export default function ContentReviewerBlock({ nextStep, previousStep }: Props) {
  const [isLoading , setIsLoading] = useState<boolean>(false);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const toast = useExecuteToast();

  const handlePreviousStep = () => {
    previousStep();
  };
  
  const form = useForm<crbType>({
    mode: "all",
    resolver: yupResolver(crbSchema),
    defaultValues: crbSchema.getDefault(),
  });

  const { control, handleSubmit, setValue, watch, clearErrors, reset } = form;
  
  const onSubmit = async (values: crbType) => {
    console.log("Selected Option:", values);
    if (values.option === 0) {
      try {
        setShowModal(true);
        setIsLoading(true);
        // add api here for submitting content review
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setIsApproved(true);
        toast.executeToast("Thank you for your review! Your feedback has been successfully submitted..", "top-right", false, {
          toastId: 0,
          type: "success",
        });
      } catch (err) {
        toast.executeToast("An error occurred while submitting the review. Please try again.", "top-right", false, {
          toastId: 0,
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    }
    reset();
  };

  return (
      <Card sx={{ padding: 6, height: "auto" }}>
        <Button
          onClick={handlePreviousStep}
          sx={{
            marginBottom: 4,
            px: 4,
            py: 2,
            backgroundColor: "#560bad",
            borderRadius: "10px",
            color: "#F3F3F3",
            "&:hover": {
              backgroundColor: "#212529",
            },
          }}
        >
          <FirstPageIcon /> Go Back
        </Button>

        <ContentReviewerForm
          control={control}
          handleSubmit={handleSubmit}
          setValue={setValue}
          watch={watch}
          clearErrors={clearErrors}
          isLoading={isLoading}
          isApproved={isApproved}
          onSubmit={onSubmit}
          showModal={showModal}
        />
        <ContentApproverForm />
      </Card>
  );
}
