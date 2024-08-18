import { Button, Card, ControlledCheckbox } from 'core-library/components'
import { ControlledTextField } from 'core-library/components/Textfield/TextField'
import React from 'react'
import { useFieldArray } from 'react-hook-form'
import AddIcon from '@mui/icons-material/Add';
import { RegularQuestionsFormType } from '@/components/blocks/page/SettingsManagement/steps/content/simulator/types';


type SATAPropsType = {
}

export const SATA: React.FC<SATAPropsType> = () => {
    const { append: appenAnswer, fields: answerFields, update: updateAnswer, remove: removeAnswers } = useFieldArray<RegularQuestionsFormType>({ name: `answers` })

    const handleAppendFields = () => {
        appenAnswer({ answer: "", answerKey: false })
    }


    return (
        <Card>
            <div className='w-full h-[200px]  rounded-md p-2 flex flex-col gap-2 overflow-y-auto'>
                {answerFields.map((answer, index) => (
                    <div className='w-full flex rounded-md  gap-10 text-sm items-center px-5 bg-[#d7f2f4] border-[#37BEC7] border justify-between' key={index}>
                        <div className='w-full'>
                            <ControlledTextField
                                name={`answers.${index}.answer`}
                                className=' flex-1  border-none outline-none  placeholder:text-sm  w-full'
                                rows={5}
                                sx={{ border: 'none', outline: 0 }}
                                placeholder='Enter answer'
                            />
                        </div>

                        <ControlledCheckbox name={`answers.${index}.answerKey`} />
                    </div>
                ))}

                <Button
                    onClick={handleAppendFields}
                    className='w-full h-10 flex rounded-md text-sm items-center px-5 bg-[#d7f2f4] border-[#37BEC7] border justify-center text-[#37BEC7] font-semibold hover:bg-[#2a98a0] transition-colors duration-150 hover:text-white disabled:saturate-0'
                >
                    <span><AddIcon /></span>
                    <p>Add Answer Option</p>
                </Button>
            </div>
        </Card>
    )

}
