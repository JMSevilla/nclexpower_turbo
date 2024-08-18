import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button } from 'core-library/components';
import { useRouter } from 'core-library';
import { ContainedRegularQuestionType } from '@/components/blocks/page/SettingsManagement/steps/content/simulator/types';

interface Props {
    nextStep(values: Partial<ContainedRegularQuestionType>): void;
    previousStep(): void;
    values: Partial<ContainedRegularQuestionType>;
    next: () => void;
}

export const SuccessPage: React.FC<Props> = (props) => {
    const { values, nextStep, next } = props
    const NextLocation = values.main_type == "Regular" ? '/regular-question-list' : '/case-study-list'
    const router = useRouter()

    const handleCreateNew = () => {
        nextStep({});
        next()
    }

    const handleGoToList = (value?: string) => {
        router.push({ pathname: value || "/hub" })
    }

    return (
        <div data-testid={values.main_type} className='h-[650px] flex flex-col items-center justify-center p-5 gap-y-10'>
            <CheckCircleIcon sx={{ fontSize: 100, color: '#37BEC7' }} />
            <p className='font-semibold text-xl'>{values.main_type} Questions Successfully Added</p>
            <div className='flex gap-5'>
                <Button data-testid='create-new' onClick={() => handleGoToList(NextLocation)} className='bg-transparent text-[#37BEC7] shadow-none rounded-full items-center justify-center hover:bg-transparent hover:underline hover:shadow-none'>
                    <p>Go to {values.main_type} Question List</p>
                </Button>
                <Button data-testid='create-new-button' onClick={handleCreateNew}
                    className='bg-[#37BEC7] hover:bg-[#2a98a0] py-5 w-44 text-white font-semibold rounded-full leading-3 transition-colors duration-150'>
                    <p>Create New</p>
                </Button>
            </div>
        </div>
    )
}
