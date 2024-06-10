import { atom } from "jotai";
import { McqSsValidationType } from '@/core/schema/mcq/validation';
import { MrsnValidationType } from "./mrsn/validation";
import { DNDValidationType } from '@/core/schema/dnd/validation';
import { MCQGValidationType } from '@/core/schema/mcqGroup/validation';
import { HCPValidationType } from '@/core/schema/hcp/validation';
import { RegularSATAValidationType } from './regularSATA/validation';
import { DDClozeValidationType } from "@/core/schema/ddcloze/validation";
import { DDTableValidationType } from "./ddtable/validation";

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

export const HCPValidationAtom = atom<HCPValidationType | undefined>(
  undefined
);

export const RegularSATAValidationAtom = atom<RegularSATAValidationType | undefined>(
  undefined
)

export const DDClozeValidationAtom = atom<DDClozeValidationType | undefined>(
  undefined
)

export const DDTableValidationAtom = atom<DDTableValidationType | undefined>(
  undefined
)
