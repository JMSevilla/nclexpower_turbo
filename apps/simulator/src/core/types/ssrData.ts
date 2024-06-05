import { datatypes } from '@repo/core-library';

export type SsrQuestionaireContentProps = {
  contentId: number;
  content: string;
};

export type SsrAnswerTabsProps = {
  tabsId: number;
  tabsTitle: string;
  contentTitle: string;
  content: string | string[];
  contentUI?: string;
};

export type QuestionaireProps = {
  qId: number;
  QType: string;
  question: string;
  questionUI: string;
  hasAlert: boolean;
  tabs: Array<{
    tabsId: number;
    tabsTitle: string;
    contentTitle: string;
    content: string | SsrQuestionaireContentProps[];
  }>;
  answer?: AnswerProps[];
};

export type AnswerProps = Partial<DNDAnswerUIItem> & {
  answerId: number;
  qId: number;
  answerType: string;
  answerInstruction: string;
  answerUI: string;
  columns: Array<string>;
  rows: any;
  note: string;
  tabs: SsrAnswerTabsProps[];
  DDCAnswer: string;
  selectFieldKey: string[];
  selectField: any;
  choicesListKey: string[];
  choicesList: choicesListProps[];
  answer: AnswerProps[];
  QType?: string;
};

export type DND1WordChoicesUI = {
  id: number;
  text: string;
};

export type DND1Object = {
  DNDID: number;
  DND1WordChoices: DND1WordChoicesUI[];
};

export type DNDAnswerUIItem = {
  DNDAnswer: string;
  DNDKey: string[];
  DND1: DND1Object;
  answerId: number;
  answerInstruction: string;
  answerType: string;
  answerUI: string;
  note: string;
  qId: number;
  row: Array<any>;
};

export type SsrData = {
  questionaire: QuestionaireProps[];
  answer: AnswerProps[];
};

// header
export type SsrHeader = {
  timeRemaining: string; // change this type accordingly
  duration: string; // change this type accordingly
  qId: number;
  headerTitle: string;
  elements: HeaderElements;
};

type HeaderElements = {
  buttons: HeaderButtonsEntity[];
};

type HeaderButtonsEntity = {
  buttonKey: string;
  value: string;
};

export type SsrMockQuestionaire = {
  qId: number;
  hasContainer: boolean;
  QType: string;
  questions: QuestionaireProps[];
  questionUI: string;
  tabs: SsrMockTabsUIQuestionaire[];
  answer: SsrMockQuestionaireAnswer[];
};

type SsrMockTabsUIQuestionaire = {
  tabsId: number;
  tabsTitle: string;
  contentTitle: string;
  content: string;
};

export type SsrMockQuestionaireAnswer = {
  answerId: number;
  qId: number;
  answerType: string;
  answerInstruction: string;
  answerUI: string;
  columns: string[];
  rows: any;
  note: string;
  choices: [];
};

// new types for questionnaire refactoring

export type RegularQuestion = {
  contents: datatypes.QuestionContentsResponse;
  itemselection: datatypes.CalcItemSelectValues[];
};

export type MCQTable = {
  table:
    | Array<{
        rows: Array<{}>;
      }>
    | any;
};

export interface Row {
  rowTitle: string;
  [key: string]: number | string;
}

export type QuestionaireWithAnswerProps = {
  qId: number;
  QType: string;
  question: string;
  questionUI: string;
  displayType?: string;
  tabs: Array<{
    tabsId: number;
    tabsTitle: string;
    contentTitle: string;
    content: string;
    contentUI: string;
  }>;
  answer?: AnswerProps[];
};

export type CaseStudyProps = {
  questionaire: QuestionaireProps[];
};

export type OptionType = {
  label: string;
  value: boolean;
  xvalue: number;
};

export type dndObjectValueProps = {
  id: number;
  text: string;
  container: string;
};

export type choicesListProps = {
  map(arg0: (item: dndObjectValueProps) => import('react').JSX.Element): import('react').ReactNode;
  'Action To Take': dndObjectValueProps[];
  'Potential Condition': dndObjectValueProps[];
  'Parameters To Monitor': dndObjectValueProps[];
};

/**
 * All types below is part of code refactor tasks
 */

export type Header = {
  headerContentId: string;
  timeRemaining: any;
  duration: any;
  lNum: string;
  qId: number;
  accountId: string;
};

//drop down table props

export interface SelectedValuesType {
  [key: string]: string;
}

export type DDTProps = {
  questionaire: QuestionaireProps[];
  answer: AnswerProps[];
  selectedValues: SelectedValuesType;
  handleSelectChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export interface TableProps {
  columns: string[];
  selectFieldKeys: string[];
  selectFieldOptions: { [key: string]: OptionType[] };
  selectedValues: SelectedValuesType;
  handleSelectChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface DropContainerItem {
  accepts: string[];
  text: string;
  container: string;
}
export type DropContainerType = DropContainerItem[];