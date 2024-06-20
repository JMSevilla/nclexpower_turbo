import { Box, Typography } from "@mui/material";
import { useResolution } from "../../hooks";
import Image from "next/image";

interface Props {}

export const HeaderLogo: React.FC<Props> = ({}) => {
  const { isMobile } = useResolution();

  return (
    <Box
      position="relative"
      sx={{ cursor: "pointer" }}
      height={95}
      role="button"
    >
      <Typography
        variant="h3"
        component="span"
        fontWeight="bold"
        color="primary"
        noWrap
        fontSize={(theme) => ({
          xs: theme.typography.h6.fontSize,
          sm: theme.typography.h4.fontSize,
          md: theme.typography.h3.fontSize,
        })}
      >
        No logo
      </Typography>
    </Box>
  );
};
