export type ItemSelectTypes = {
  accountId: string;
  examGroupId?: string;
  shouldDisplayNextItem: boolean;
};

export type ItemSessionTypes = {
  SessionItem: string | undefined;
  accountId: string;
  indicator?: string;
};
