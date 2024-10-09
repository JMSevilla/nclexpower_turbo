import React, { useState } from 'react';
import { DialogBox } from 'core-library/components/Dialog/DialogBox';
import { Button, DateField } from '../../../../../../../../../../components';
import { FormProvider, useForm } from 'react-hook-form';
import { contentDateSchema, ContentDateType } from './validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';

export default function ContentReviewerDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const form = useForm<ContentDateType>({
    mode: "all",
    resolver: yupResolver(contentDateSchema),
  })

  const onSubmit = (values: ContentDateType) => {
    console.log("Date: ", values);
    handleClose()
  }

  const { control, handleSubmit, watch } = form;

  const selectedDate = watch('date');

  const isDateBeforeToday = selectedDate &&
    new Date(selectedDate).setHours(0, 0, 0, 0)
    < new Date().setHours(0, 0, 0, 0);

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} sx={{
        px: 4,
        py: 2,
        backgroundColor: "#80ed99",
        borderRadius: "10px",
        color: '#030303',
        '&:hover': {
          backgroundColor: '#386641',
          color: '#F3F3F3'
        },
        zIndex: 1
      }}>
        Pick a Date
      </Button>
      <DialogBox
        handleClose={handleClose}
        loading={false}
        maxWidth={"md"}
        open={open}
        hideCloseButton={false}
        sx={{ zIndex: 1 }}
      >
        <FormProvider {...form} >
          <div className='flex items-center justify-center w-full flex-col'>
            <h1>Select a date for this content to take effect in simulator.</h1>
            <Box sx={{ marginY: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DateField<ContentDateType>
                name='date'
                control={control}
                label="Select Date"
                placeholder="DD - MM - YYYY"
              />
            </Box>
            <Button sx={{
              py: 1.5,
              backgroundColor: "#80ed99",
              borderRadius: "10px",
              color: '#030303',
              '&:hover': {
                backgroundColor: '#386641',
                color: '#F3F3F3'
              },
            }}
              disabled={isDateBeforeToday}
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </div>
        </FormProvider>
      </DialogBox>
    </React.Fragment>
  );
}
