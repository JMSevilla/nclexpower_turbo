import { SsrData } from "@/core/types/ssrData";
import React, { useState } from 'react';
import { DDTable } from "./DDTable";

 interface SelectedValuesType {
    [key: string]: string; 
}

export const DDTBlock: React.FC<SsrData> = ({ questionaire, answer }) => {
    const [selectedValues, setSelectedValues] = useState<SelectedValuesType>({});

    const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValues({
            ...selectedValues,
            [event.target.name]: event.target.value
        });
    };

  return (
    <DDTable
        questionaire={questionaire}
        answer={answer}
        handleSelectChange={handleSelectChange}
        selectedValues={selectedValues}
    />
  );  
};