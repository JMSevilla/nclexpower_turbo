export type QuestionaireProps = {
  qId: number;
  QType: string;
  question: string;
  questionUI: string;
  tabs: Array<{
    tabsId: number;
    tabsTitle: string;
    contentTitle: string;
    content: string;
  }>;
};

type AnswerProps = {
  answerId: number;
  qId: number;
  answerType: string;
  answerInstruction: string;
  answerUI: string;
  columns: Array<string>;
  rows: any;
  note: string;
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
  question: string;
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
  choices: []
};
