import { MrsnValidationType } from "./mrsn/validation";
import { atom } from "jotai";

export const MrsnValidationAtom = atom<MrsnValidationType | undefined>(
  undefined
);
