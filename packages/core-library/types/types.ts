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

export interface LoginParams {
  username: string;
  password: string;
}

export interface RegisterParams {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  middlename: string;
  imgurl: string;
  email: string;
}