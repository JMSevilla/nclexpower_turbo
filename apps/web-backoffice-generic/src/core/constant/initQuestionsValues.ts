import { RegularQuestionsFormType } from '@/components/blocks/page/SettingsManagement/steps/content/simulator/types';

export const initQuestionsValues: RegularQuestionsFormType = {
    clientNeeds: '',
    question: '',
    cognitiveLevel: '',
    contentArea: '',
    answers: Array(2).fill({ answer: '', answerKey: false })
}