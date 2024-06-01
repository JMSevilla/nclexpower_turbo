import { BooleanValue, FileValue, NumberValue, StringValue } from "./common";

export interface TenantResponse {
  description: string;
  elements: CmsTenant;
  id: string;
  name: string;
  status: string;
  type: string;
  typeId: string;
}
export interface CmsTenant {
  footer?: Footer;
  headerText: StringValue;
  tenantName: StringValue;
  primaryColor: StringValue;
  secondaryColor: StringValue;
  tertiaryColor: StringValue;
  tenantUrl: StringValue;
  logoutUrl: StringValue;
  expiredSessionUrl: StringValue;
  tenantLogo?: FileValue;
  mobileLogo?: FileValue;
  footerLogo?: FileValue;
  tabIcon?: Omit<FileValue, "mode" | "renditions">;
  hideHelp?: BooleanValue;
  enableLinkedRecords?: BooleanValue;
}
export interface CmsFooter {
  elementType: string;
  elements: FooterElements;
}

interface Footer {
  elementType: string;
  value: {
    description: string;
    elements: FooterElements;
    id: string;
    links: Links;
    name: string;
    status: string;
    type: string;
    typeId: string;
  };
}
interface FooterElements {
  accessGroups: StringValue;
  defaultHeaderLabel: StringValue;
  panelHeaderLabel: StringValue;
  linkGroups: LinkGroups;
}
interface LinkGroups {
  elementType: string;
  values?: {
    description: string;
    elements: {
      accessGroups: StringValue;
      defaultHeaderLabel: StringValue;
      groupNameLabel: StringValue;
      header: StringValue;
      items: {
        elementType: string;
        values?: {
          type: string;
          elements: {
            content: StringValue;
            header: StringValue;
            headerLink: StringValue;
          };
        }[];
      };
    };
    id: string;
    links: Links;
    name: string;
    status: string;
    type: string;
    typeId: string;
  }[];
}

interface Links {
  draft: LinkValue;
  retire: LinkValue;
  self: LinkValue;
  type: LinkValue;
}
interface LinkValue {
  href: string;
}
