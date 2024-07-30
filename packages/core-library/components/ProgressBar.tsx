import React, { useEffect, useState } from "react";
import { LinearProgress, Box } from "@mui/material";

interface Props {
  isLoading: boolean;
}

export const ProgressBar: React.FC<Props> = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (isLoading) {
      setProgress(0);
      timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 100 : prevProgress + 10
        );
      }, 800);
    } else {
      setProgress(100);
      if (timer) {
        clearInterval(timer);
      }
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isLoading]);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
};
