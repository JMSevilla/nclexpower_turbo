import {
  BooleanValue,
  ButtonElements,
  CallToAction,
  FileValue,
  MultiSelectionValue,
  NumberValue,
  PageWidget,
  SelectionValue,
  StringValue,
} from "./common";

export interface PageFeedWidgets {
  widgets: PageWidget[];
}
export interface CmsPageResponse {
  description: string;
  elements: CmsPage;
  id: string;
  name: string;
  status: string;
  type: string;
}
export interface CmsPage {
  content: PageContent;
  pageHeader?: StringValue;
  headerIcon?: FileValue;
  pageUrl: StringValue;
  pageKey: StringValue;
  journeyStage?: NumberValue;
  journeyType?: JourneyType;
  journeyStepNumber?: NumberValue;
  journeyHideBackButton?: BooleanValue;
  showAsStickOut?: BooleanValue;
  backPageKey?: StringValue;
  heroBlocks?: { values: HeroBlock[] };
  pageMenu?: { value: PageContentValues };
  removeFromJourneySteps?: BooleanValue;
}

export interface HeroBlock {
  elements: {
    heroContent: {
      value: PageContentValues;
    };
    heroImage?: FileValue;
  };
  type: string;
}

export type ThemeBackgroundColorSelection = SelectionValue<AppColorType>;

interface JourneyPage {
  value: {
    elements: {
      content: {
        values: {
          creatorId: string;
          id: string;
          protectedUrl: string;
          status: string;
          typeId: string;
          url: string;
        }[];
      };
      journeyStag: NumberValue;
      journeyType: JourneyType;
      pageKey: StringValue;
    };
  };
}

export enum JourneyTypes {
  RETIREMENT = "retirement",
  QUOTES_SELECTION = "quoteselection",
  BEREAVEMENT = "bereavement",
  TRANSFER2 = "transfer2",
}

export type JourneyTypeSelection =
  | "retirement"
  | "quoteselection"
  | "bereavement"
  | "transfer2";

export type AppColorType =
  | "Primary"
  | "Secondary"
  | "Tertiary"
  | "Support60"
  | "Support80";

export type PanelLayoutSelection = SelectionValue<
  "50/50" | "80/20" | "20/80" | "45/10/45" | "66/33" | "33/33/33" | "100"
>;

type JourneyType = SelectionValue<JourneyTypeSelection>;

export interface PageContent {
  values?: PageContentValues[] | null;
}
export interface PageContentValues {
  elements: PageElements;
  type: string;
  name: string;
}

export interface PanelListItem {
  elements: {
    columns: { values?: PanelColumn[] };
    header?: StringValue;
    layout?: PanelLayoutSelection;
    reverseStacking?: BooleanValue;
    panelKey?: StringValue;
  };
}

interface PageElements
  extends Partial<ButtonElements>,
    Partial<ResourceListElements>,
    Partial<ResourceListItemElements>,
    Partial<InfoTileElements>,
    Partial<ChartElements>,
    Partial<DataSummaryElements>,
    Partial<TimelineElements>,
    Partial<DataTableElements>,
    Partial<TrackerElements> {
  textLabel?: StringValue | null;
  type?: SelectionValue;
  themeColorForBackround?: ThemeBackgroundColorSelection | null;
  backgroundColor?: ThemeBackgroundColorSelection | null;
  blockHeader?: BlockHeader | null;
  content?: StringValue | null;
  header?: StringValue;
  panelNameLabel?: StringValue;
  formKey?: StringValue;
  panelList?: { values?: PanelListItem[] };
  panels?: { values?: PanelListItem[] };
  labels?: { values?: LabelValues[] };
  tooltips?: { values?: TooltipValues[] };
  buttons?: { values?: ButtonValues[] };
  linkGroups?: { values?: LinkGroup[] };
  cards?: { values?: CardsValues[] };
  text?: StringValue;
  reverseStacking?: BooleanValue;
  layout?: PanelLayoutSelection;
  panelKey?: StringValue;
  columns?: { values?: PanelColumn[]; value?: number };
  answers?: Answers;
  questionKey?: StringValue;
  questionText?: StringValue;
  bottomPanel?: { value?: PanelListItem };
  showInDropdown?: BooleanValue;
  hideSaveAndExit?: BooleanValue;
  disableCallToAction?: BooleanValue;
  contentBlockKey?: StringValue;
  openFile?: FileValue;
  journeyPage?: JourneyPage;
  stage?: Parameters;
  maxNumberOfJourneySteps?: StringValue;
  pageKey?: StringValue;
  customActionKey?: StringValue;
  analyticsKey?: StringValue;
  headerLink?: StringValue;
  subHeader?: StringValue;
  parameters?: Parameters;
  showAlwaysOnTop?: BooleanValue;
  callToAction?: CallToAction;
  showInAccordion?: SelectionValue;
  linkText?: StringValue;
  pageMenuItem?: Parameters;
  orderedListItems?: { values?: { elements: OrderedListItemElement }[] };
  orderedListKey?: StringValue;
  hideNumber?: BooleanValue;
  defaultItemImage?: FileValue;
  showAllItems?: BooleanValue;
  items?: StringValue;
  avoidBranching?: BooleanValue;
  actionButtons?: CallToAction;
  checkbox?: { values: Checkbox[] };
  checkboxListKey?: StringValue;
  description?: StringValue;
  mainContent?: StringValue;
  footerIcon?: FileValue;
  caption?: StringValue;
  gridKey?: StringValue;
  contentBlocks?: { values: PageContentValues[] };
  panel?: { value: PanelListItem };
  errorContent?: StringValue;
  dataSourceUrl?: StringValue;
  errorText?: StringValue;
  alternateTableStyle?: SelectionValue<"Transparent">;
}

export type ResourceItemDisplayType = "Image" | "Icon" | "Video";

export interface ResourceListElements {
  header: StringValue;
  displayType: SelectionValue<ResourceItemDisplayType>;
  resourceListKey: StringValue;
  resources: {
    values: { type: "Resource"; elements: ResourceListItemElements }[];
  };
}

export interface Checkbox {
  checkboxKey: StringValue;
  checkboxText: StringValue;
  isMandatory: BooleanValue;
  defaultState: BooleanValue;
}

export interface InfoTileElements {
  data: StringValue;
  iconName: StringValue;
  tileKey: StringValue;
  title: StringValue;
}

export interface ResourceListItemElements {
  title: StringValue;
  resourceKey: StringValue;
  link: StringValue;
  image: FileValue;
  icon: FileValue;
  document: FileValue;
  documentType: SelectionValue<"Factsheet">;
  standaloneSize: SelectionValue<ResourceItemDisplayType>;
}

interface Parameters {
  values: { key: StringValue; value: StringValue }[];
}

interface Answers {
  values: {
    answer: StringValue;
    answerKey: StringValue;
    nextJourneyPage: JourneyPage;
    descriptionPanels: { values: PanelListItem[] };
    pageKey: StringValue;
  }[];
}

interface LinkGroup {
  elements?: {
    defaultHeaderLabel?: StringValue;
    header?: StringValue;
    items: {
      values?: {
        type: string;
        elements: {
          content: StringValue;
          header: StringValue;
          headerLink: StringValue;
        } | null;
      }[];
    };
  };
}

interface BlockHeader {
  value?: {
    description: string;
    elements: LabelElements;
    id: string;
    name: string;
    status: string;
    type: string;
  };
}

interface LabelElements {
  labelKey: StringValue;
  labelText: StringValue;
  linkTarget: StringValue;
  tenant: StringValue;
}

export interface TooltipValues {
  description: string;
  elements: Tooltip;
  id: string;
  name: string;
  status: string;
  type: string;
}
interface Tooltip {
  accessGroups: StringValue;
  contentText: StringValue;
  headerText: StringValue;
  linkText: StringValue;
  tooltipKey: StringValue;
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
export interface OrderedListItemElement {
  content?: StringValue | null;
  contentBlockKey?: StringValue;
  header?: StringValue | null;
  headerLink?: StringValue;
  showInAccordion?: SelectionValue;
  themeColorForBackround?: ThemeBackgroundColorSelection | null;
}

export type PanelSideSelection = "right" | "left" | "top" | "bottom";

export interface PanelColumn {
  alignment: { elementType: "optionselection"; value: ColumnAlignment };
  themeColorForBackround?: ThemeBackgroundColorSelection | null;
  contentBlocks?: ContentBlocksListItems;
  enablePadding?: BooleanValue;
  roundCorners?: BooleanValue;
  reducedGap?: BooleanValue;
  border?: MultiSelectionValue<PanelSideSelection>;
  paddingSide?: MultiSelectionValue<PanelSideSelection>;
  desktopPaddingMultiplier?: NumberValue;
}

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
interface ContentBlocksListItems {
  values?: PageContentValues[] | null;
}

export interface ChartElements {
  xAxisName: StringValue;
  yAxisName: StringValue;
  chartKey: StringValue;
  dataSourceUrl: StringValue;
  hideLegend: BooleanValue;
  showDataItems: NumberValue;
  type: SelectionValue<string>;
  defaultColors?: ColorSchemesValue;
  customColors?: ColorSchemesValue;
  heightWidthRatio?: NumberValue;
  labelLengthLimit?: NumberValue;
}

export interface DataSummaryElements {
  dataSourceUrl: StringValue;
  summaryBlocks: {
    // empty for now
  };
}

export interface ColorSchemesValue {
  value?: {
    elements: {
      colorSchemes: {
        values: {
          colors: StringValue;
        }[];
      };
    };
  };
}

export interface TimelineElements {
  key: Partial<StringValue>;
  dataSourceUrl: StringValue;
  simplifiedVersion?: BooleanValue;
  timelineItems: {
    values: {
      description: StringValue;
      header: StringValue;
      status: SelectionValue<TimelineItemStatus>;
    }[];
  };
}

export type TimelineItemStatus = "Completed" | "Current" | "Future";

export interface DataTableElements {
  dataColumns: { values: DataTableColumn[] };
  dataArray: StringValue;
  dataSourceUrl: StringValue;
  dataTableKey: StringValue;
  functionalTable: BooleanValue;
  addPrefixForLabelFields: BooleanValue;
  pageSize: NumberValue;
  defaultOrderingColumn: StringValue;
  defaultOrderingOrder: {
    elementType: string;
    value: {
      label: string;
      selection: string;
    };
  };
}

export interface DataTableColumn {
  alignment: SelectionValue<"Left" | "Right" | "Center">;
  dataField: StringValue;
  header: StringValue;
  widthPercentage: NumberValue;
}

export interface TrackerElements {
  continuePageKey: StringValue;
  trackerItems: {
    values: {
      endPage: StringValue;
      firstPage: StringValue;
      stageKey: StringValue;
      trackerItemText: StringValue;
      hideButton: BooleanValue;
    }[];
  };
}

export interface CardsValues {
  elements: CardsItem;
  type: string;
}
export interface CardsItem {
  callToAction: CallToAction;
  description: StringValue;
  image: FileValue;
  title: StringValue;
}
