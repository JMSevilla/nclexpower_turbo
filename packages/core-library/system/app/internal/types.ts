import { DashboardCardType } from "./blocks/Hub/types";

export type Blocks = "LoginFormBlock" | "HubOverviewBlock" | "SettingsBlock";

type BlockProps = {
  LoginFormBlock: {};
  HubOverviewBlock: { cards: DashboardCardType[] };
  SettingsBlock: {};
};

export type ParseBlocksProps<B extends Blocks = Blocks> = {
  blocks: B;
} & BlockProps[B];
