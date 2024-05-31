import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { CmsGlobals, PreloadedGlobals } from "@repo/utils/types/global";
import { CmsTenant } from "@repo/utils/types/tenant";
import { callToActionValuesToCmsButtons } from "@/contents/cms/parse-cms";
import {
  CmsButton,
  CmsError,
  CmsHtmlContent,
  CmsIcon,
  CmsLabel,
  CmsMessage,
  CmsModal,
  CmsTooltip,
} from "@repo/utils/types/common";
import { useCachedCmsTokens } from "./contentData/useCachedCmsTokens";
import {
  createCmsTokenParser,
  injectCmsTokenValues,
} from "@/contents/cms/inject-tokens";

export type InterpolationTokens = { [key: string]: string | null | undefined };

type ContextValue = {
  globals: CmsGlobals | null;
  preloadedLabelByKey(key: string, tokens?: InterpolationTokens): string;
  labelByKey(key: string, tokens?: InterpolationTokens): string;
  buttonByKey(key: string): CmsButton | undefined;
};

interface Props {
  tenant: CmsTenant | null;
  globals: CmsGlobals | null;
  stickOut?: boolean;
  preloadedGlobals: PreloadedGlobals;
}

const GlobalsContext = createContext<ContextValue>({
  globals: null,
  preloadedLabelByKey: () => "",
  labelByKey: () => "",
  buttonByKey: () => undefined,
});

export const GlobalsProvider: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  tenant,
  globals,
  stickOut,
  preloadedGlobals,
}) => {
  const cmsTokens = useCachedCmsTokens();
  const parsedGlobals = useMemo(
    () => ({
      preloadedLabels: parseContentLabels(preloadedGlobals.labels),
      labels: parseContentLabels(globals?.labels),
      buttons: parseContentButtons(globals?.buttons),
    }),
    [globals, preloadedGlobals]
  );

  const preloadedLabelByKey = useCallback(
    (key: string, tokens?: InterpolationTokens) => {
      const label = parsedGlobals.preloadedLabels?.find(
        (l) => l.key?.toLowerCase() === key.toLowerCase()
      )?.value;
      if (label === undefined || label === null) {
        return `[[${key}]]`;
      }
      return tokenizeLabel(label, tokens);
    },
    [parsedGlobals.preloadedLabels, cmsTokens.data]
  );
  const labelByKey = useCallback(
    (key: string, tokens?: InterpolationTokens) => {
      const label = parsedGlobals.labels?.find(
        (l) => l.key?.toLowerCase() === key.toLowerCase()
      )?.value;
      if (label === undefined || label === null) {
        return `[[${key}]]`;
      }
      return tokenizeLabel(label, tokens);
    },
    [parsedGlobals.labels, cmsTokens.data]
  );

  const buttonByKey = useCallback(
    (key: string) =>
      parsedGlobals.buttons?.find(
        (b) => b.key?.toLowerCase() === key.toLowerCase()
      ) || { text: `[[${key}]]` },
    [parsedGlobals.buttons]
  );

  function tokenizeLabel(label: string, tokens?: InterpolationTokens) {
    const labelIncludesTokens =
      label.includes("[[token:") && label.includes("]]");
    if (!labelIncludesTokens) {
      return label;
    }
    const tokenizedLabel =
      label && tokens ? tokenEnrichedLabel(label, tokens) : label;
    return tokenizedLabel && tenant
      ? injectCmsTokenValues(
          tokenizedLabel,
          createCmsTokenParser(tenant, {}, cmsTokens.data ?? null)
        )
      : tokenizedLabel;
  }
  return (
    <GlobalsContext.Provider
      value={{
        globals,
        preloadedLabelByKey,
        labelByKey,
        buttonByKey,
      }}
    >
      {children}
    </GlobalsContext.Provider>
  );
};

const parseContentLabels = (labels: CmsGlobals["labels"]) =>
  labels?.map<CmsLabel>((label) => ({
    key: label.elements.labelKey.value,
    value: label.elements.labelText.value,
    linkTarget: label.elements?.linkTarget?.value ?? undefined,
  }));

const parseContentButtons = (buttons: CmsGlobals["buttons"]) =>
  buttons?.map((button) => ({
    customActionKey: button.elements.customActionKey?.value,
    analyticsKey: button.elements.analyticsKey?.value,
    anchor: button.elements.anchor?.value
      ? `#${encodeURIComponent(button.elements.anchor?.value).trim()}`
      : "",
    linkKey: button.elements.pageKey?.value,
    link: button.elements.buttonLink?.value,
    text: button.elements.buttonText?.value,
    type: button.elements.buttonType?.value?.selection,
    key: button.elements.buttonKey?.value,
    openInTheNewTab: button.elements.openInTheNewTab?.value,
    widthPercentage: button.elements?.widthPercentage?.value,
    notification: button.elements.notification?.value,
    disabledReason: button.elements.disabledReason?.value,
    pageKey: button.elements.pageKey?.value,
  }));

const tokenEnrichedLabel = (label: string, tokens: InterpolationTokens) => {
  Object.entries(tokens).forEach(([key, value]) => {
    label = label?.replace(`[[token:${key}]]`, value ?? `[[token:${key}]]`);
  });
  return label;
};

export const useGlobalsContext = () => useContext(GlobalsContext);
