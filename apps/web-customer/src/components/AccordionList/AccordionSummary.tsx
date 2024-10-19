import * as React from "react";
import { Box, AccordionSummary, styled } from "@mui/material";
import Image, { StaticImageData } from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ProgressCircle } from "../ProgressCircle/ProgressCircle";
import { getStatusIcons } from "../../utils";

interface CustomAccordionSummaryProps {
  panelId: string;
  expanded: boolean;
  programImage: StaticImageData;
  title: string;
  programStatus: string;
  sectionsCount: number;
  progress: number;
  onToggle: (event: React.SyntheticEvent, newExpanded: boolean) => void;
}

const StyledAccordionSummary = styled(AccordionSummary, {
  shouldForwardProp: (prop) => prop !== "expanded",
})<{ expanded: boolean }>(({ expanded }) => ({
  background: "linear-gradient(to right, #0F2A71, #181E2F)",
  paddingLeft: 0,
  paddingRight: 0,
  height: "162px",
  borderTopLeftRadius: expanded ? "16px" : "16px",
  borderTopRightRadius: expanded ? "16px" : "16px",
  borderRadius: expanded ? "16px 16px 0 0" : "16px",
  border: "none",
}));

export const CustomAccordionSummary: React.FC<
CustomAccordionSummaryProps
> = ({
  panelId,
  expanded,
  programImage,
  title,
  programStatus,
  sectionsCount,
  progress,
  onToggle,
}) => {
  return (
    <StyledAccordionSummary
      expanded={expanded}
      aria-controls={`${panelId}-content`}
      id={`${panelId}-header`}
      style={{ cursor: "default"}}
    >
      <Box className="flex flex-row gap-4 items-center w-full">
        <div className="h-[162px] flex w-full">
          <Image
            src={programImage}
            alt={title}
            width={180}
            height={162}
            style={{
              objectFit: "cover",
              borderTopLeftRadius: "16px",
              borderBottomLeftRadius: expanded ? "0px" : "16px",
            }}
          />
          <div className="flex flex-col px-8 py-2 md:py-6 justify-around md:justify-between w-full">
            <h2 className="font-ptSansNarrow font-bold text-[18px] md:text-[20px] text-center md:text-start text-white">
              {title}
            </h2>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
              <div className="relative flex gap-1 items-center bg-[#181E2F] px-4 py-1 rounded-[10px]">
                {programStatus === "progress" && (
                  <>
                    <ProgressCircle progress={progress} />
                    <h4 className="text-white font-ptSansNarrow font-regular text-[14px] md:text-[16px] pl-4">
                      {progress}%
                    </h4>
                  </>
                )}
                <h4 className="font-ptSansNarrow text-white font-regular text-[14px] md:text-[16px] capitalize">
                  {programStatus === "unavailable" ||
                  programStatus === "available"
                    ? "Start"
                    : programStatus}
                </h4>
                <Image
                  src={getStatusIcons(programStatus)}
                  alt="Completed"
                  width={16}
                  height={16}
                />
              </div>
              <div className="flex gap-2">
                <h4 className="text-white text-[14px] md:text-[18px] font-regular font-ptSansNarrow">
                  {sectionsCount} Sections
                </h4>

                <ExpandMoreIcon
                  sx={{
                    color: "white",
                    cursor: "pointer",
                    transition: "transform 0.3s",
                    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle(e, !expanded);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Box>
    </StyledAccordionSummary>
  );
};
