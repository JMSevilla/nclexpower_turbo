import { McqSsValidationType } from '@/core/schema/mcq/validation';
import { MrsnValidationType } from "./mrsn/validation";
import { atom } from "jotai";

export const MrsnValidationAtom = atom<MrsnValidationType | undefined>(
  undefined
);

export const McqSsValidationAtom = atom<McqSsValidationType | undefined>(
  undefined
);