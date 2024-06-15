import { Box, Typography, useTheme } from "@mui/material";
import { SelectionValue } from "../../types/common";
import { CmsPage } from "../../types/page";
import { ParsedHtml } from "../ParseHtml";
interface Props {
  id?: string;
  blockHeader?: NonNullable<
    NonNullable<CmsPage["content"]>["values"]
  >[number]["elements"]["blockHeader"];
  header?: string;
  subHeader?: string;
  showInAccordion?: SelectionValue["value"];
  html?: string;
  backgroundColor?: string | null;
  smallerFonts?: boolean;
  insideHeroBlock?: boolean;
  sourceUrl?: string;
  errorContent?: string;
  alternateTableStyle?: string;
}
export const DATA_TOKENS_REGEX =
  /\[\[data-?(date|text|timeto|):([a-zA-Z0-9_.-]+)\]\]/g;
export const TextBlock: React.FC<Props> = ({
  id,
  blockHeader,
  header,
  subHeader,
  html,
  backgroundColor,
  showInAccordion,
  smallerFonts,
  insideHeroBlock,
  sourceUrl,
  errorContent,
  alternateTableStyle,
}) => {
  const theme = useTheme();
  const enrichedHtml = processHtml(html);

  return (
    <Box
      id={id}
      sx={{
        backgroundColor,
        color:
          theme.palette.appColors.primary === backgroundColor
            ? theme.palette.common.white
            : "unset",
      }}
      data-testid="content-html-block"
    >
      {(blockHeader?.value?.elements.labelText.value || header) && (
        <Typography
          component={insideHeroBlock ? "h1" : "h2"}
          variant="h2"
          mb={subHeader || 0}
        >
          {blockHeader?.value?.elements.labelText.value ?? header}
        </Typography>
      )}
      {subHeader && (
        <Typography variant="h3" mb={0}>
          {subHeader}
        </Typography>
      )}
      {/* {enrichedHtml && (
        <ParsedHtml
          html={enrichedHtml}
          smallerFonts={smallerFonts}
          alternateTableStyle={alternateTableStyle}
        />
      )} */}
    </Box>
  );

  function processHtml(html?: string) {
    if (!html) {
      return html;
    }

    if (errorContent) {
      return errorContent;
    }

    return html;
  }
};
