import { FormValueType } from '@/components/blocks/page/SettingsManagement/types';
import { atom } from 'jotai';

export const CreateRegularQuestionAtom = atom<FormValueType[] | undefined>(undefined);
