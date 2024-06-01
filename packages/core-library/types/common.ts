import { PanelListItem } from "./page";

export type CMSValue = { elementType?: string | { [key: string]: string } };

export interface StringValue extends CMSValue {
  value: string;
}

export interface BooleanValue extends CMSValue {
  value: boolean;
}

export interface NumberValue extends CMSValue {
  value: number;
}

export interface SelectionValue<T = string> {
  value?: {
    label: T;
    selection: T;
  };
}

export interface MultiSelectionValue<T = string> {
  values?: {
    label: T;
    selection: T;
  }[];
}

export interface PageWidget {
  pageUrl: string;
  imageRelativeUrl: string;
  header: string;
  content: string;
}

export type ButtonType =
  | "Primary"
  | "Secondary"
  | "PrimaryDarkBG"
  | "SecondaryDarkBG"
  | "Critical"
  | "Success"
  | "Link";

export type ButtonSelection = SelectionValue<ButtonType>;

export interface ButtonElements {
  customActionKey?: StringValue;
  analyticsKey?: StringValue;
  anchor?: StringValue;
  buttonKey?: StringValue;
  buttonLink?: StringValue;
  buttonText?: StringValue;
  notification?: StringValue;
  buttonType?: ButtonSelection;
  pageKey?: StringValue;
  iconName?: StringValue;
  rightSideIcon?: BooleanValue;
  largeIcon?: BooleanValue;
  openInTheNewTab?: BooleanValue;
  reuseUrlParameters?: BooleanValue;
  widthPercentage?: NumberValue;
  disabledReason?: StringValue;
  fastForwardComparisonPageKey?: StringValue;
  fastForwardRedirectPageKey?: StringValue;
  postToEndpoint?: StringValue;
}

export interface CallToAction {
  values: {
    elements: ButtonElements;
  }[];
  value?: {
    elements: ButtonElements;
  };
}
export interface CmsButton {
  customActionKey?: string;
  anchor?: string;
  linkKey?: string;
  link?: string;
  type?: ButtonType;
  text?: string;
  key?: string;
  pageKey?: string;
  openInTheNewTab?: boolean;
  icon?: FileValue;
  widthPercentage?: number;
  notification?: string;
  disabledReason?: string;
  dialogElement?: DialogElement;
}
export interface FileValue {
  asset: {
    altText: string;
    fileName: string;
    fileSize: number;
    height?: number;
    id: string;
    mediaType: string;
    resourceUri: string;
    width?: number;
  };
  link?: {
    target?: string;
    url?: string;
  };
  elementType: string;
  mode?: string;
  renditions?: {
    default?: {
      height?: number;
      source: string;
      url: string;
      width?: number;
    };
  };
  url: string;
  value?: string;
}

export interface DialogElement {
  value?: {
    elements?: {
      closeDialogButtonText?: StringValue;
      dialogKey?: StringValue;
      header?: StringValue;
      dataSourceUrl?: StringValue;
      text?: StringValue;
      callToAction?: CallToAction;
      showInAlternateStyle?: BooleanValue;
      panel: { value: PanelListItem };
    };
    type: "Dialog";
  };
}

export interface CmsModal {
  header?: string;
  text?: string;
  linkText?: string;
  buttons?: CmsButton[];
  key?: string;
  isAlternateStyle?: boolean;
  panel?: PanelListItem;
}

export interface CmsTooltip {
  header?: string;
  html?: string;
  text?: string;
  key?: string;
}

export interface CmsButton {
  customActionKey?: string;
  anchor?: string;
  linkKey?: string;
  link?: string;
  type?: ButtonType;
  text?: string;
  key?: string;
  pageKey?: string;
  openInTheNewTab?: boolean;
  icon?: FileValue;
  widthPercentage?: number;
  notification?: string;
  disabledReason?: string;
  dialogElement?: DialogElement;
}

export interface CmsLabel {
  key?: string;
  value?: string;
  linkTarget?: string;
}

export interface CmsMessage {
  key?: string;
  type: string;
  header?: string;
  html?: string;
  buttons?: CmsButton[];
}

export interface CmsError {
  alt?: string;
  key?: string;
  text?: string;
}

export interface CmsHtmlContent {
  key: string;
  header: string;
  subHeader?: string;
  html: string;
  backgroundColor: string;
}

export interface CmsIcon {
  key: string;
  name: string;
  width: number;
  height: number;
  color: string;
  svgData?: string;
}
