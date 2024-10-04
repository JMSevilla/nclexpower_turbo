import { DashboardCardType } from "./blocks/Hub/types";

export type Blocks =
  | "LoginFormBlock"
  | "HubOverviewBlock"
  | "SettingsBlock"
  | "QuestionApprovalBlock"
  | "EmailVerificationBlock"
  | "PasswordChangeBlock"
  | "ViewUserBlock"
  | "InternalUsersBlock"
  | "CreatePricingBlock"
  | "CreateProductBlock"
  | "QuestionManagementPageBlock"
  | "ReportedIssuesBlock"
  | "CreateRegularQuestionTypeBlock"
  | "CreateCategoryBlock";

type BlockProps = {
  LoginFormBlock: {};
  HubOverviewBlock: { cards: DashboardCardType[] };
  SettingsBlock: {};
  QuestionApprovalBlock: {};
  EmailVerificationBlock: {};
  PasswordChangeBlock: {};
  ViewUserBlock: {};
  InternalUsersBlock: {};
  CreatePricingBlock: {};
  CreateProductBlock: {};
  QuestionManagementPageBlock: {};
  ReportedIssuesBlock: {};
  CreateRegularQuestionTypeBlock: {};
  CreateCategoryBlock: {};
};

export type ParseBlocksProps<B extends Blocks = Blocks> = {
  blocks: B;
} & BlockProps[B];
