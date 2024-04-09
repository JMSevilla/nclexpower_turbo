export type SsrQuestionaireContentProps = {
  contentId: number;
  content: string;
};

export type SsrAnswerTabsProps = {
  tabsId: number;
  tabsTitle: string;
  contentTitle: string;
  content: string | string[];
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
    content: string;
    contentUI: string // this is if the display is a table or not
  }>;
  answer?: AnswerProps[]
};

export type AnswerProps = {
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
  DNDAnswer?: string;
  DND1?: {
    DND1WordChoices?: string[]
  };


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
  choices: []
};

export type RegularSATA = {
  questionaire: QuestionaireWithAnswerProps[]
}


export type MCQTable = {
  table: Array<{
    rows: Array<{

    }>
  }> | any
}

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
  answer?: AnswerProps[]
}

export type CaseStudyProps = {
  questionaire: QuestionaireProps[];
};

export type DND1 = {
  questionaire: QuestionaireProps[];
  tasks?: string | string[]
  status?: string
  placeholder?: string
}

export type DND1Column = {
  addItemToSection: any;
  setTasks: any;
  tasks?: string[] | any;
  status: string;
  placeholder?: string;

}
export type DND1Task = {
  task: string;
  id: number
}

export type DND1 = {
  questionaire: QuestionaireProps[];
  tasks?: string | string[]
  status?: string
  placeholder?: string
}

export type DND1Column = {
  addItemToSection: any;
  setTasks: any;
  tasks?: string[] | any;
  status: string;
  placeholder?: string;

}
export type DND1Task = {
  task: string;
  id: number
}

export type OptionType = {
  label: string;
  value: string;
  xvalue: number;
};
