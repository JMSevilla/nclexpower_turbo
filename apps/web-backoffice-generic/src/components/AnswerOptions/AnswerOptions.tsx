import { MCQ } from '@/components/AnswerOptions/blocks/MCQ/MCQ'
import { SATA } from '@/components/AnswerOptions/blocks/SATA/SATA'
import React from 'react'

type AnswerOptionsType = {
    questionType: "regularQuestion" | "caseStudy",
    questionnaireType: "MCQ" | "SATA"
    questionIndex: number
}

export const AnswerOptions: React.FC<AnswerOptionsType> = ({ questionType, questionnaireType, questionIndex }) => {

    if (questionType === 'regularQuestion') {
        switch (questionnaireType) {
            case "MCQ":
                return <MCQ />
            case "SATA":
                return <SATA questionIndex={questionIndex} />
        };
    }
    else if (questionType === 'caseStudy') {
        switch (questionnaireType) {
            case "MCQ":
                return <></>
        };
    }

    return null
}