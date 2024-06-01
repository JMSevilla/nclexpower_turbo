export interface Membership {
  firstname: string | null;
  surname: string | null;
  referenceNumber: string | null;
  status: string | null;
}

export type CmsTokens = Nullable<{
  email: string;
  phoneNumber: string;
  name: string;
}>;

export interface AccessKey {
  contentAccessKey: string;
}
