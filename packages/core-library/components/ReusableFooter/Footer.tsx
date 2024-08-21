import Image from "next/image";
import { NCLEXYellowLogo } from "../../assets";
import NorthIcon from "@mui/icons-material/North";
import { FooterProps } from "../../types/global";
import { useMemo } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useScroll } from "../../core";
import { useRouteBasedVisibility } from "../../hooks";
import { HideFooter } from "./HideFooter";

export const Footer: React.FC<FooterProps> = (props) => {
  const { scrollTop } = useScroll();
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
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          {props.list.length > 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "start",
                justifyContent: "end",
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
            </Box>
          )}
          <Box sx={{ display: "flex", width: "60%" }}>
            <Box sx={{ width: "40%" }}>
              <Typography sx={{ marginBottom: 5 }}>
                {props.info.address}
              </Typography>
              <Box
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
              </Box>
            </Box>

            <Box
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
            </Box>
          </Box>
          <Box sx={{ width: "10%", display: "flex", justifyContent: "center" }}>
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
          </Box>
        </Box>
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
