import { PageContentValues } from "../../types/page";

export const shouldReduceSpaceBetweenCmsBlocks = (
  index: number,
  blocks?: PageContentValues[] | null
) => {
  if (!blocks?.length) return false;
  return (
    areCurrentAndNextBlocksAreMessages(index, blocks) ||
    areCurrentAndNextBlocksAreAccordions(index, blocks) ||
    isBlockABackButton(blocks?.[index] ?? null)
  );
};

const areCurrentAndNextBlocksAreMessages = (
  index: number,
  blocks?: PageContentValues[] | null
) =>
  blocks?.[index]?.type === "Message" &&
  blocks?.[index + 1]?.type === "Message";
const areCurrentAndNextBlocksAreAccordions = (
  index: number,
  blocks?: PageContentValues[] | null
) =>
  blocks?.[index]?.type === "Content HTML block" &&
  blocks?.[index]?.elements?.showInAccordion?.value &&
  blocks?.[index + 1]?.type === "Content HTML block" &&
  blocks?.[index + 1]?.elements?.showInAccordion?.value;
const isBlockABackButton = (block: PageContentValues | null) =>
  block?.type === "back_button" || block?.type === "back_button_by_page_key";
