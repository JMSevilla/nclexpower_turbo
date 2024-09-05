import { atom } from "jotai";
import { ContainedRegularQuestionType } from "./types";

export const CreateRegularAtom = atom<ContainedRegularQuestionType | undefined>(
    undefined
  );