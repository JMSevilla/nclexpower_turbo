export interface Membership {
  firstname: string | null;
  surname: string | null;
  referenceNumber: string | null;
  status: string | null;
}

export type CmsTokens = {
  email: string;
  phoneNumber: string;
  name: string;
};

export interface AccessKey {
  contentAccessKey: string;
}

export interface LoginProps {
  username: string
  password: string
  type?: string
}