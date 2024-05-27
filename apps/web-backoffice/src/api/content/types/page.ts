import {
  BooleanValue,
  ButtonElements,
  MultiSelectionValue,
  NumberValue,
  PageWidget,
  SelectionValue,
  StringValue,
} from "./common";

export interface PageFeedWidgets {
  widgets: PageWidget[];
}

export interface CmsPage {}

export interface ColumnAlignment {
  label: string;
  selection:
    | "top-left"
    | "top-center"
    | "top-right"
    | "middle-left"
    | "middle-center"
    | "middle-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
}

export interface PageContentValues {
  elements: PageElements;
  type: string;
  name: string;
}
interface LabelElements {
  labelKey: StringValue;
  labelText: StringValue;
  linkTarget: StringValue;
  tenant: StringValue;
}
interface LabelValues {
  description: string;
  elements: LabelElements;
  id: string;
  name: string;
  status: string;
  type: string;
}

interface ButtonValues {
  description: string;
  elements: ButtonElements;
  id: string;
  name: string;
  status: string;
  type: string;
}
interface Parameters {
  values: { key: StringValue; value: StringValue }[];
}

interface PageElements extends Partial<ButtonElements> {
  textLabel?: StringValue | null;
  type?: SelectionValue;
  content?: StringValue | null;
  header?: StringValue;
  panelNameLabel?: StringValue;
  formKey?: StringValue;
  panelList?: { values?: PanelListItem[] };
  panels?: { values?: PanelListItem[] };
  labels?: { values?: LabelValues[] };
  buttons?: { values?: ButtonValues[] };
  text?: StringValue;
  reverseStacking?: BooleanValue;
  layout?: PanelLayoutSelection;
  panelKey?: StringValue;
  columns?: { values?: PanelColumn[]; value?: number };
  bottomPanel?: { value?: PanelListItem };
  showInDropdown?: BooleanValue;
  hideSaveAndExit?: BooleanValue;
  disableCallToAction?: BooleanValue;
  contentBlockKey?: StringValue;
  parameters?: Parameters;
  caption?: StringValue;
  gridKey?: StringValue;
  contentBlocks?: { values: PageContentValues[] };
  panel?: { value: PanelListItem };
  errorContent?: StringValue;
  dataSourceUrl?: StringValue;
  errorText?: StringValue;
}
export type PanelLayoutSelection = SelectionValue<
  "50/50" | "80/20" | "20/80" | "45/10/45" | "66/33" | "33/33/33" | "100"
>;
export interface PanelListItem {
  elements: {
    columns: { values?: PanelColumn[] };
    header?: StringValue;
    layout?: PanelLayoutSelection;
    reverseStacking?: BooleanValue;
    panelKey?: StringValue;
  };
}

interface ContentBlocksListItems {
  values?: PageContentValues[] | null;
}
export type PanelSideSelection = "right" | "left" | "top" | "bottom";
export interface PanelColumn {
  alignment: { elementType: "optionselection"; value: ColumnAlignment };
  contentBlocks?: ContentBlocksListItems;
  enablePadding?: BooleanValue;
  roundCorners?: BooleanValue;
  reducedGap?: BooleanValue;
  border?: MultiSelectionValue<PanelSideSelection>;
  paddingSide?: MultiSelectionValue<PanelSideSelection>;
  desktopPaddingMultiplier?: NumberValue;
}
