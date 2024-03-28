import { Checkbox } from '@/components/Checkbox/Checkbox'
import React from 'react'


interface AnswerData {
    answerInstruction: string
    choices: []

}

interface Props {
    answer?: AnswerData[]
}

export const SataAnswer: React.FC<Props> = ({ answer }) => {


    return (
        <div className='h-full w-full p-5'>
            <ol className='w-full text-sm mb-4 pr-5 list-disc'>
                <li>{answer && answer.map((ans) => (
                    ans.answerInstruction
                ))}</li>
            </ol>
            <div className='w-full h-fit'>
                {answer && answer.map((choiceMap) =>
                    choiceMap?.choices && choiceMap?.choices.map((choiceItem, choiceIndex) => (
                        <div className='flex items-center' key={choiceIndex}>
                            <span><Checkbox sx={{ height: "20px" }} label={choiceItem} /></span>
                        </div>
                    )))}
            </div>
        </div>
    )
}

export default SataAnswer
