import { CmsGlobals, PreloadedGlobals } from "../global";

export const extractLabelFromGlobals = (
  label: string,
  globals: CmsGlobals | null
) => {
  return (
    globals?.labels?.find(
      (element) => element.elements.labelKey.value === label
    )?.elements.labelText.value ?? ""
  );
};

export const extractPreloadedLabelFromGlobals = (
  key: string,
  preloadedGlobals?: PreloadedGlobals
) =>
  preloadedGlobals?.labels?.find(
    (label) => label.elements.labelKey.value === key
  )?.elements.labelText.value ?? `[[${key}]]`;

export const extractClassifierFromGlobals = (
  key: string,
  globals: CmsGlobals
) =>
  globals?.classifiers?.find(
    (classifier) => classifier.elements.classifierKey?.value === key
  )?.elements.classifierItem.values;

export const extractClassifierItemValueFromGlobals = (
  key: string,
  itemKey: string,
  globals: CmsGlobals
) =>
  extractClassifierFromGlobals(key, globals)?.find(
    (item) => item.key.value === itemKey
  )?.value.value;

export const extractLabelByKey = (globals: CmsGlobals | null, key: string) =>
  globals?.labels?.find((label) => label.elements.labelKey.value === key)
    ?.elements.labelText.value ?? `[[label:${key}]]`;
