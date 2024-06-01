import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { CmsGlobals, PreloadedGlobals } from "../types/global";
import { CmsTenant } from "../types/tenant";
import {
  CmsButton,
  CmsError,
  CmsHtmlContent,
  CmsIcon,
  CmsLabel,
  CmsMessage,
  CmsModal,
  CmsTooltip,
} from "../types/common";
import { useCachedCmsTokens } from "./contentData/useCachedCmsTokens";
import { createCmsTokenParser, injectCmsTokenValues } from "..";

export type InterpolationTokens = { [key: string]: string | null | undefined };

type ContextValue = {
  globals: CmsGlobals | null;
  preloadedLabelByKey(key: string, tokens?: InterpolationTokens): string;
  labelByKey(key: string, tokens?: InterpolationTokens): string;
  buttonByKey(key: string): CmsButton | undefined;
  errorByKey(key: string, tokens?: InterpolationTokens): string;
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
  errorByKey: () => "",
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
      errors: parseContentErrors(globals?.errors),
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
  const errorByKey = useCallback(
    (key: string, tokens?: InterpolationTokens) => {
      const label = parsedGlobals.errors?.find(
        (e) => e.key?.toLowerCase() === key.toLowerCase()
      )?.text;
      if (label === undefined || label === null) {
        return `[[${key}]]`;
      }
      return tokenizeLabel(label, tokens);
    },
    [parsedGlobals.errors]
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
        errorByKey,
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
const parseContentErrors = (errors: CmsGlobals["errors"]) =>
  Array.from(errors ?? []).map<CmsError>((error) => ({
    key: error.elements?.errorKey.value,
    text: error.elements?.text.value,
    alt: error.elements?.alternateTexts.value,
  }));
const tokenEnrichedLabel = (label: string, tokens: InterpolationTokens) => {
  Object.entries(tokens).forEach(([key, value]) => {
    label = label?.replace(`[[token:${key}]]`, value ?? `[[token:${key}]]`);
  });
  return label;
};

export const useGlobalsContext = () => useContext(GlobalsContext);
