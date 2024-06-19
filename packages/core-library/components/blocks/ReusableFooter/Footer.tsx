import { Grid, Box, Typography } from "@mui/material";
import Image from "next/image";
import { CmsTenant } from "../../../types/tenant";

interface Props {
  logo: NonNullable<
    NonNullable<CmsTenant["footerLogo"]>["renditions"]
  >["default"];
  linkGroups?: NonNullable<
    NonNullable<CmsTenant["footer"]>["value"]
  >["elements"]["linkGroups"];
  copyrightText: string;
}

export const Footer: React.FC<Props> = ({
  logo,
  linkGroups,
  copyrightText,
}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        sx={{ backgroundColor: "#444444", color: "#fff" }}
      >
        <Grid
          item
          md={3}
          xs={6}
          sx={{
            alignItems: "center",
            justifyContent: "start",
            display: "flex",
          }}
        >
          <Image
            data-testid="footer_logo_image"
            src={""}
            alt={""}
            style={{
              objectFit: "contain",
              objectPosition: "center",
              width: "100px",
              height: "100%",
              padding: 20,
            }}
          />
        </Grid>
        <Grid
          item
          md={9}
          xs={6}
          sx={{ alignItems: "start", display: "flex", textAlign: "start" }}
        >
          {linkGroups?.values &&
            linkGroups?.values.length > 0 &&
            linkGroups?.values.map((colData, colIndex) => (
              <Grid key={colIndex} item md={3} xs={3} sx={{ paddingY: 3 }}>
                <Typography></Typography>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Box>
  );
};
