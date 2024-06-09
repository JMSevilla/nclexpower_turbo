import React from 'react';
import { Grid } from '@mui/material';
import { SsrData } from "@/core/types/ssrData";
import { MCQAnswerGroupTable } from '@/components/blocks/CaseStudy/CaseStudyQuestions/MCQTable/MCQAnswerGroupTable';
import { MCQCSQuestionnaireBlock } from './MCQCS'

export const MCQCSBlock: React.FC<SsrData> = ({ questionaire, answer }) => {
  return (
    <div className="p-2 py-2 h-full w-full">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6} md={6}>
          <MCQCSQuestionnaireBlock questionaire={questionaire} answer={answer} />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <MCQAnswerGroupTable questionaire={questionaire} answer={answer} />
        </Grid>
      </Grid>
    </div>
  )
}