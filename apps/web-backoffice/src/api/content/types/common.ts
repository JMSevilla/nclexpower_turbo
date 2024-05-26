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
