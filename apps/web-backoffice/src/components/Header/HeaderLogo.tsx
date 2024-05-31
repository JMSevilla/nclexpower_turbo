import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { CmsTenant } from "@repo/utils/types/tenant";
import { useGlobalsContext } from "@repo/utils/contexts";
import { useResolution } from "@repo/utils/hooks";

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
  console.log("tenant", tenant);
  return (
    <Box
      position="relative"
      sx={{ cursor: "pointer" }}
      width={logo?.width}
      height={logo?.height}
      role="button"
      aria-label={labelByKey("header_logo_aria_label")}
    >
      {/* Logo here is currently unresponsive due to no linked options. */}
      {/* {logo ? (
        <Image
          data-testid="header_logo_image"
          src={logo.url || ""}
          alt={labelByKey("tenant_logo_alt")}
          key={`${isMobile ? "mobile" : "desktop"}-logo`}
          height={logo?.height || 46}
          width={logo?.width || 100}
          style={{
            objectFit: "contain",
            objectPosition: "center",
            width: "auto",
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
      )} */}
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
    </Box>
  );
};
