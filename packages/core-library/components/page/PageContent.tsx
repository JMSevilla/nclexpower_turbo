import { Grid } from "@mui/material";
import React from "react";
import { CmsPage, PageContentValues } from "../../types/page";
import { CmsTenant } from "../../types/tenant";
import { shouldReduceSpaceBetweenCmsBlocks } from "../../core/business/cms-spacing";
import { parseContent } from "../../contents/cms/parse-cms";
import { useRouter } from "next/router";

interface Props {
  page: CmsPage | null;
  tenant: CmsTenant | null;
}

export const PageContent: React.FC<Props> = ({ page, tenant }) => {
  const router = useRouter();

  if (!page) {
    return null;
  }

  const pageMenu = page.pageMenu?.value;
  const pageHeader = page.pageHeader?.value;

  const blocksList = (
    [
      pageHeader && createShallowContentItem("header", "header"),
      ...(page.content.values?.filter((block) => block.type !== "journey") ??
        []),
    ] as PageContentValues[]
  ).filter((block) => !!block?.elements);

  const contentBlocks = parseContent(blocksList, page, tenant)
    .map((block, index) =>
      block ? (
        <Grid
          item
          xs={12}
          mb={shouldReduceSpaceBetweenCmsBlocks(index, blocksList) ? -6 : 0}
          key={index}
        >
          {block}
        </Grid>
      ) : null
    )
    .filter(Boolean);

  return (
    <Grid container spacing={12}>
      {pageMenu ? (
        <Grid container item xs={12} md={9} pt={10} spacing={12}>
          {contentBlocks}
        </Grid>
      ) : (
        contentBlocks
      )}
    </Grid>
  );
};

const createShallowContentItem = (
  type: string,
  name: string
): PageContentValues => ({ name, type, elements: {} });
