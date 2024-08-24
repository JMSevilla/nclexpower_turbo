import Image from "next/image";
import { NCLEXYellowLogo } from "../../assets";
import { FooterProps } from "../../types/global";
import { useMemo } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useScroll } from "../../core";
import { useRouteBasedVisibility } from "../../hooks";
import { HideFooter } from "./HideFooter";

export const Footer: React.FC<FooterProps> = (props) => {
  const yearData = new Date().getFullYear();
  const memoYear = useMemo(() => yearData, [yearData]);
  const { isHidden } = useRouteBasedVisibility(HideFooter);

  return (
    !isHidden && (
      <Box
        width={1}
        sx={{
          padding: " 2.5rem",
          color: "white",
          backgroundColor: "#040814",
          paddingY: 5,
          fontFamily: "PT Sans",
          flexGrow: 1,
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 2, md: 12 }}
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          {props.list.length > 0 && (
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              sx={{
                display: "flex",
                alignItems: "start",
                justifyContent: "center",
                width: "25%",
                gap: 5,
                paddingRight: 5,
              }}
            >
              <Image
                style={{ width: 150 }}
                src={NCLEXYellowLogo}
                alt="NCLEXLogo"
              />
            </Grid>
          )}
          <Grid xs={2} sm={12} md={8} sx={{ display: "flex", width: "60%" }}>
            <Grid item xs={12} sm={1} md={4} sx={{ width: "40%" }}>
              <Typography sx={{ marginBottom: 5 }}>
                {props.info.address}
              </Typography>
              <Grid
                sx={{
                  marginBottom: 10,
                  gap: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    width: "fit-content",
                    borderBottom: 2,
                    borderBlockColor: "#f5c206",
                  }}
                >
                  {props.info.phone}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    width: "fit-content",
                    borderBottom: 2,
                    borderBlockColor: "#f5c206",
                  }}
                >
                  {props.info.website}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              sm={1}
              md={4}
              sx={{
                width: "60%",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "start",
                marginBottom: 2,
              }}
            >
              {props.list.length > 0 &&
                props.list.map((list, index) => (
                  <div key={index}>
                    <ul>
                      {props.list.length > 0 &&
                        list.items.map((item, index) => (
                          <li key={index}>
                            <a href={item.path}>{item.label}</a>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
            </Grid>
          </Grid>
          {/* <Grid item xs={2} sm={4} md={4} sx={{ width: "10%", display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => scrollTop()}
              sx={{
                height: "40px",
                width: "40px",
                minWidth: "40px",
                bgcolor: "#f3c402",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                  bgcolor: "#f3c402",
                },
              }}
            >
              <NorthIcon
                sx={{
                  width: "25px",
                  height: "25px",
                }}
                className="text-[#0f2a71]"
              />
            </Button>
          </Grid> */}
        </Grid>
        <div className="text-xs">
          <p className="w-full text-center pt-4">
            NCLEX-RN® and NCLEX-PN® are registered trademarks of the National
            Council of State Boards of Nursing, Inc (NCSBN®)
          </p>
          <p className="w-full text-center pt-4">
            © {memoYear} NCLEXPower ™. All rights reserved.
          </p>
        </div>
      </Box>
    )
  );
};
