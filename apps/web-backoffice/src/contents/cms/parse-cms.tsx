import { Typography } from "@mui/material";
import { CallToAction, CmsButton } from "@repo/utils/types/common";
import {
  CmsPage,
  ColorSchemesValue,
  JourneyTypeSelection,
  PageContentValues,
  ThemeBackgroundColorSelection,
  TimelineItemStatus,
} from "@repo/utils/types/page";
import { CmsTenant } from "@repo/utils/types/tenant";
import { appColorsFromPrimary } from "@/core/theme/theme";

export const parseContent = (
  contents: PageContentValues[],
  page: CmsPage,
  tenant: CmsTenant | null,
  queryParams = {}
) => {
  const backPageKey = page.backPageKey?.value;

  return contents.map((content) => {
    const type = (content?.elements?.formKey?.value || content?.type).trim();
    const elements = content?.elements;
    /* all blocks should go here.. */
    switch (type) {
    }
  });
};

export const parseButtonProps = (
  element: Partial<NonNullable<PageContentValues["elements"]>>
) => {
  return {
    customActionKey: element.customActionKey?.value,
    linkKey: element.pageKey?.value,
    link: element.buttonLink?.value,
    type: element.buttonType?.value?.selection,
    text: element.buttonText?.value,
    icon: element.icon,
    iconName: element.iconName?.value,
    rightSideIcon: element.rightSideIcon?.value,
    notification: element.notification?.value,
    reuseUrlParameters: element.reuseUrlParameters?.value,
    openInTheNewTab: element.openInTheNewTab?.value,
    widthPercentage: element.widthPercentage?.value,
    disabledReason: element.disabledReason?.value,
    analyticsKey: element.analyticsKey?.value,
    fastForwardComparisonPageKey: element.fastForwardComparisonPageKey?.value,
    fastForwardRedirectPageKey: element.fastForwardRedirectPageKey?.value,
    postRequestUrl: element.postToEndpoint?.value,
    largeIcon: element.largeIcon?.value,
  };
};

export const callToActionValuesToCmsButtons = (
  buttons: CallToAction["values"]
) => {
  return buttons?.map((button) => ({
    link: button.elements?.buttonLink?.value,
    linkKey: button.elements?.pageKey?.value,
    text: button.elements?.buttonText?.value,
    key: button.elements?.buttonKey?.value,
    type: button.elements?.buttonType?.value?.selection,
    pageKey: button.elements?.pageKey?.value,
    disabledReason: button.elements?.disabledReason?.value,
    customActionKey: button.elements?.customActionKey?.value,
  }));
};
