import { Box, Typography } from "@mui/material";
import { CmsTenant } from "../../types/tenant";
import { useGlobalsContext } from "../../contexts";
import { useResolution } from "../../hooks";
import Image from "next/image";

//Temporary File Location
import logoImage from "./asset/CoreZigma.png";

interface Props {
  tenant: CmsTenant | null;
  useRawLogoUrl?: boolean;
}

export const HeaderLogo: React.FC<Props> = ({ tenant, useRawLogoUrl }) => {
  const { isMobile } = useResolution();
  const { labelByKey } = useGlobalsContext();
  const logo = isMobile
    ? tenant?.mobileLogo?.renditions?.default
    : tenant?.tenantLogo?.renditions?.default;

  if (!tenant) {
    return null;
  }

  return (
    <Box
      position="relative"
      sx={{ cursor: "pointer" }}
      height={95}
      role="button"
      aria-label={labelByKey("header_logo_aria_label")}
    >
      {/* Logo here is currently unresponsive due to no linked options. */}
      {logo ? (
        <Image
          data-testid="header_logo_image"
          src={logoImage}
          alt={labelByKey("tenant_logo_alt")}
          key={`${isMobile ? "mobile" : "desktop"}-logo`}
          style={{
            objectFit: "contain",
            objectPosition: "center",
            width: "auto",
            height: "100%",
            padding: 5,
          }}
        />
      ) : (
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
          {tenant.headerText.value}
        </Typography>
      )}
    </Box>
  );
};
