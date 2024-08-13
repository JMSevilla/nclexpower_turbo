import { Box, Typography } from "@mui/material";
import { useResolution } from "../../hooks";
import Image from "next/image";
import { NCLEXBlueLogo, NCLEXYellowLogo } from "../../assets";
import { useScroll } from "../../core";
import { useRouter } from "next/router";

interface Props {}

export const HeaderLogo: React.FC<Props> = ({}) => {
  const { isMobile } = useResolution();
  const { isScrolled } = useScroll();
  const router = useRouter();

  const NCLEXLogo =
    router.pathname === "/404" || isScrolled ? NCLEXBlueLogo : NCLEXYellowLogo;

  return (
    <Box
      position="relative"
      sx={{ cursor: "pointer" }}
      height={70}
      display="flex"
      alignItems="center"
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
        <Image width={150} src={NCLEXLogo} alt="NCLEX Logo" />
      </Typography>
    </Box>
  );
};
