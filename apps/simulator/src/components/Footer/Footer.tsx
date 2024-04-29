import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SettingsIcon from "@mui/icons-material/Settings";
import PauseIcon from "@mui/icons-material/Pause";
import { useCustomAction } from "@repo/utils/hooks";

export const Footer: React.FC = () => {
  const action = useCustomAction({
    actionKey: "mrsn-form-submission:mrsn",
  });

  return (
    <div className="h-fit w-full bg-[#007ab7] text-white footer-step-9">
      <Toolbar disableGutters>
        <Box sx={{ height: "100%", width: "100%" }}>
          <Button
            disabled
            color="inherit"
            sx={{
              width: "32%",
              padding: "1rem",
              borderRight: "2px solid #F8FAF8",
              fontFamily: "Arial, sans-serif",
              gap: 1,
              display: "none",
            }}
          >
            <PauseIcon style={{ fontSize: "20px" }} />
            Suspend
          </Button>
        </Box>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div className="footer-step-10">
          <Typography
            variant="h6"
            component="div"
            sx={{ textAlign: "center", fontSize: "16px" }}
          >
            Acme Medical Prep School
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{ textAlign: "center", fontSize: "14px" }}
          >
            Patricia Freeman
          </Typography>            
          </div>
        </Box>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            color="inherit"
            className="footer-step-11"
            sx={{
              width: "32%",
              padding: "1rem",
              borderLeft: "2px solid #F8FAF8",
              fontFamily: "Arial, sans-serif",
              color: "#FFFFFF",
              gap: 1,
            }}
          >
            <SettingsIcon style={{ fontSize: "18px" }} />
            Navigator
          </Button>     
          <Button
            color="inherit"
            className="footer-step-12"
            sx={{
              width: "32%",
              padding: "1rem",
              borderLeft: "2px solid #F8FAF8",
              fontFamily: "Arial, sans-serif",
              color: "#FFFFFF",
              gap: 1,
            }}
            onClick={action?.execute}
          >
            Next{" "}
            <ArrowForwardIcon style={{ fontSize: "20px", marginTop: "2px" }} />
          </Button>
        </Box>
      </Toolbar>
    </div>
  );
};
