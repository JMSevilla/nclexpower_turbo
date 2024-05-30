import { SsrData, SelectedValuesType } from "@/core/types/ssrData";
import React, { useState } from 'react';
import { DDTableQuestion } from "./DDTQuestion";

export const DDTQuestionaireBlock: React.FC<SsrData> = ({ questionaire, answer }) => {
    const [selectedValues, setSelectedValues] = useState<SelectedValuesType>({});

    const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValues({
            ...selectedValues,
            [event.target.name]: event.target.value
        });
    };

  return (
    <DDTableQuestion
        questionaire={questionaire}
        answer={answer}
        handleSelectChange={handleSelectChange}
        selectedValues={selectedValues}
    />
  );  
};