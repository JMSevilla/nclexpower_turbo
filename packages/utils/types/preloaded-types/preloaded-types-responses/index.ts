export type Header = {
    headerContentId: string
    timeRemaining: any
    duration: any
    lNum: string
    qId: number
    accountId: string
}

// get-all-content payload
export type QuestionContentsPayload = {
  tabId: string;
  qId: number;
  LNum: string;
  QLNum: string
}

type ChoicesItem = {
  Id: string;
  choices: string;
  numOfChoices: number;
}

type AnswerUIItem = {
  answeringId: string;
  qId: number;
  answerType: string;
  answerInstruction: string;
  rows: string;
  columns: string;
  notes: string;
}

type QuestionTypeItem = {
  QLNum: string;
  QType: string;
  QTypeDesc: string
}

export type QuestionContentsResponse = {
  choices: ChoicesItem[];
  answerUI: AnswerUIItem[];
  questionType: QuestionTypeItem[]
}