/**
 * @author JMSevilla
 * Kindly use `Calc` Before the name of the type. thanks
 */
export type CalcItemSelectResponseItem = {
  lNum: string;
  qId: number;
  hasContainer: number;
  question: string;
  actionKey: string;
  cnCateg: number;
  correct: string;
  current: number;
  choices: string;
  typeOfQuestion: string;
};

export type CalcItemSelectValues = {
  lNum: string;
  qId: number;
  hasContainer: boolean;
  questionUI: string;
  tabId: string;
  qLNum: string;
  question: string;
  actionKey: string;
  questionType: string;
};
