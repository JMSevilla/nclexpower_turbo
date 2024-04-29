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

      <div className="header-step-1">
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
                <div className="header-step-2 p-0">
                Time Remaining : 
                {headerTimeRemaining}                  
                </div>

              </Typography>
              <Typography
                fontSize={14}
                fontWeight="bold"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                <div className="header-step-3">
                Duration :
                {duration} |                  
                </div>

              </Typography>
            </Box>
            <Box>
              <div className="header-step-4">
              <Typography
                textAlign="center"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                QID: {header[0]?.qId}
              </Typography>
              <Typography style={{ fontFamily: "Arial, sans-serif" }}>
               NCLEX Sample Tutor
              </Typography>                
              </div>
            </Box>
            <Box flexGrow={0}>
              <div className="header-step-5">
              <Tooltip title="3 of 5 pages">
                <Button sx={{ color: "white", fontSize: "small" }}>
                  <AutoStoriesIcon
                    fontSize="small"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  />{" "}
                  : 3 of 5
                </Button>
              </Tooltip>                
              </div>
            </Box>
          </Toolbar>
        </div>
        <Box display={"flex"} height={35} pl={7} gap={5} bgcolor={"#86BCEA"}>
          <div className="header-step-6">
            <Button sx={buttonStyle} style={{ fontFamily: "Arial, sans-serif" }}>
              <CalculateIcon fontSize="large" sx={buttonStyle.IconStyle} />
              Calculator
            </Button>
          </div>
          <div className="header-step-7">
            <Button sx={buttonStyle} style={{ fontFamily: "Arial, sans-serif" }}>
              <FormatClearIcon fontSize="large" sx={buttonStyle.IconStyle} />
              Clear
            </Button>
          </div>
        </Box>
      </AppBar>        
      </div>

    </Box>
  );
};
