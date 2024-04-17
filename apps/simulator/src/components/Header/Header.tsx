import {
  AppBar,
  Toolbar,
  Box,
  Tooltip,
  Typography,
  Button,
} from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";
import FormatClearIcon from "@mui/icons-material/FormatClear";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Header as SsrHeader } from "@/core/types/ssrData";
import { usePreloadedGlobals } from "@/core/context/PreloadedGlobalsContext";


const buttonStyle = {
  backgroundColor: "transparent",
  color: "white",
  fontSize: "small",
  IconStyle: {
    pr: 2,
  },
};

export const Header: React.FC = () => {
  const { header } = usePreloadedGlobals()
  const headerTimeRemaining = header[0]?.timeRemaining ?? null;
  const duration = header[0]?.duration ?? null;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <div style={{ padding: 10, backgroundColor: "#007AB7" }}>
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box>
              <Typography
                fontWeight="bold"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                Time Remaining : 
                {headerTimeRemaining}
              </Typography>
              <Typography
                fontSize={14}
                fontWeight="bold"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                Duration :
                {duration} |
              </Typography>
            </Box>
            <Box>
              <Typography
                textAlign="center"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                QID: {header[0]?.qId}
              </Typography>
              <Typography style={{ fontFamily: "Arial, sans-serif" }}>
               NCLEX Sample Tutor
              </Typography>
            </Box>
            <Box flexGrow={0}>
              <Tooltip title="3 of 5 pages">
                <Button sx={{ color: "white", fontSize: "small" }}>
                  <AutoStoriesIcon
                    fontSize="small"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  />{" "}
                  : 3 of 5
                </Button>
              </Tooltip>
            </Box>
          </Toolbar>
        </div>
        <Box display={"flex"} height={35} pl={7} gap={5} bgcolor={"#86BCEA"}>
          <Button sx={buttonStyle} style={{ fontFamily: "Arial, sans-serif" }}>
            <CalculateIcon fontSize="large" sx={buttonStyle.IconStyle} />
            Calculator
          </Button>

          <Button sx={buttonStyle} style={{ fontFamily: "Arial, sans-serif" }}>
            <FormatClearIcon fontSize="large" sx={buttonStyle.IconStyle} />
            Clear
          </Button>
        </Box>
      </AppBar>
    </Box>
  );
};
