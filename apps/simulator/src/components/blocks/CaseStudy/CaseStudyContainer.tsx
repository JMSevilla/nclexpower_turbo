import React from 'react';
import { QuestionaireProps, CaseStudyProps } from '@/core/types/ssrData';
import { useAlertMessageV2 } from '@repo/core-library/contexts/AlertMessageContext';
import {
  HCPBlock,
  DDCQuestion,
  DDTQuestionaireBlock,
  MCQCSQuestionnaire,
  DNDBlock,
  MRSNBlock,
  SATABlock
} from './CaseStudyQuestions';

export const CaseStudyContainer: React.FC<CaseStudyProps> = ({ questionaire }) => {
  const { AlertMessage } = useAlertMessageV2();

  if (questionaire.length > 0) {
    const deserializeContents: any =
      questionaire?.length > 0 &&
      questionaire?.filter((cms: QuestionaireProps) => {
        return cms.QType === 'SATA';
      });

    const { QType: QuestionType, answer, hasAlert, qId } = deserializeContents?.[0];

    if (hasAlert) {
      return (
        <>
          <AlertMessage severity="info" title={`Case Study: Item ${qId}`} />
          {renderSwitch(QuestionType, deserializeContents, answer)}
        </>
      );
    } else {
      return renderSwitch(QuestionType, deserializeContents, answer);
    }
  }
  return <h3>No questionaire Loaded</h3>;
};

function renderSwitch(QuestionType: string, deserializeContents: any, answer: any) {
  switch (QuestionType) {
    case 'SATA':
      return <SATABlock questionaire={deserializeContents} />;
    case 'MCQGroup':
    case 'MCQNoGroup':
      return <MCQCSQuestionnaire questionaire={deserializeContents} answer={answer} />;
    case 'HCP':
      return <HCPBlock questionaire={deserializeContents} answer={answer} />;
    case 'MRSN':
      return <MRSNBlock questionaire={deserializeContents} answer={answer} />;
    case 'DDC':
      return <DDCQuestion questionaire={deserializeContents} answer={answer} />;
    case 'DDT':
      return <DDTQuestionaireBlock questionaire={deserializeContents} answer={answer} />;
    case 'DND1':
      return <DNDBlock questionaire={deserializeContents} />;

    default:
      return <h3>No questionaire Loaded</h3>;
  }
}
