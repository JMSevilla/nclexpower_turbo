import { McqSsValidationType } from '@/core/schema/mcq/validation';
import { MrsnValidationType } from "./mrsn/validation";
import { atom } from "jotai";
import { DNDValidationType } from '@/core/schema/dnd/validation';
import { MCQGValidationType } from '@/core/schema/mcqGroup/validation';

export const MrsnValidationAtom = atom<MrsnValidationType | undefined>(
  undefined
);

export const McqSsValidationAtom = atom<McqSsValidationType | undefined>(
  undefined
);

export const DNDValidationAtom = atom<DNDValidationType | undefined>(
  undefined
);

export const MCQGValidationAtom = atom<MCQGValidationType | undefined>(
  undefined
);
