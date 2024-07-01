import React from 'react';
import { Grid } from '@mui/material';
import { SsrData } from '../../../../../../core/types/ssrData';
import { MCQAnswerGroupTable } from '../../../../../../components/blocks/CaseStudy/CaseStudyQuestions/MCQTable/MCQAnswerGroupTable';
import { MCQGValidationType } from '../../../../../../core/schema/mcqGroup/validation';
import { MCQCSQuestion } from './MCQCSQuestion';

export type MCQCSProps = SsrData & {
  handleSubmit: (value: MCQGValidationType) => void;
  mcqGAtom: MCQGValidationType | undefined;
};

export const MCQCS: React.FC<MCQCSProps> = ({ questionaire, answer, handleSubmit, mcqGAtom }) => {
  return (
    <div className="p-2 py-2 h-full w-full">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6} md={6}>
          <MCQCSQuestion questionaire={questionaire} answer={answer} />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <MCQAnswerGroupTable
            questionaire={questionaire}
            answer={answer}
            handleSubmit={handleSubmit}
            mcqGAtom={mcqGAtom}
          />
        </Grid>
      </Grid>
    </div>
  );
};
