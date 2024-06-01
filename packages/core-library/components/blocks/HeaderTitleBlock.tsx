import { Box, Typography, useTheme } from "@mui/material";
import { FileValue } from "../../types/common";
import { useResolution } from "../../hooks";

interface Props {
  id?: string;
  icon?: FileValue;
  pageHeader?: string;
  indicatorExists?: boolean;
  isInStickOutPage?: boolean;
}

export const HeaderTitleBlock: React.FC<Props> = ({
  id,
  pageHeader,
  icon,
  indicatorExists,
  isInStickOutPage,
}) => {
  const { isMobile } = useResolution();
  const titleText = pageHeader;

  return (
    <Box id={id} position="relative" data-testid="header-title">
      <Typography
        component="h1"
        display="flex"
        variant={isInStickOutPage || isMobile ? "h3" : "h1"}
        alignItems={isInStickOutPage || isMobile ? "center" : "flex-end"}
        sx={{
          "& span": {
            mt: isInStickOutPage || isMobile ? 2 : 0,
            lineHeight: (theme) =>
              (isInStickOutPage || isMobile
                ? theme.typography.h3
                : theme.typography.h1
              ).fontSize,
          },
        }}
      >
        {titleText}
      </Typography>
    </Box>
  );
};
