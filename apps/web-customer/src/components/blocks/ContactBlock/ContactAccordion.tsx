import * as React from 'react';
import Typography from '@mui/material/Typography';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ControlledAccordion } from 'core-library/components'
import { AccordionMock } from '../../../core/constant/ContactPageMock/AccordionMock'

export const ContactAccordion = () => {
  const { control } = useForm();

  const accordionItems = AccordionMock.map(item => ({
    title: item.question,
    content: item.answer
  }));

  return (
    <section className='w-full h-full flex items-center justify-center '>
      <Grid container sx={{ width: '60%', zIndex: 1 }}>
        <Grid item xl={12} sx={{ p: { xs: 2, sm: 4, lg: 6, xl: 8 } }}>
          <div className="flex items-center p-12 justify-center flex-col bg-white ">
            <QuestionAnswerIcon fontSize='large' sx={{ color: '#007AB7' }} />
            <div className="text-center mb-5">
              <Typography variant="h3" sx={{ color: '#007AB7', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
                Frequently Asked Questions
              </Typography>
              <p>
                These are the most commonly asked questions about NCLEX power and billing. Have any concerns?
              </p>
            </div>
            <div className='mt-6 p-4'>
              <ControlledAccordion items={accordionItems} control={control} name="accordion" />
            </div>
          </div>
        </Grid>
      </Grid>
    </section>
  );
}
