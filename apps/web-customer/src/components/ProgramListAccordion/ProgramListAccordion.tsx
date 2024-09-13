import * as React from "react";
import { useState } from "react";
import Accordion, { AccordionSlots } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
import { Box } from "@mui/material";
import Image from "next/image";
import { ProgressCircle } from "../../components/ProgressCircle/ProgressCircle";
import { StandardProgramListType } from "../../core/types/programList";
import useCalculateProgramProgress from "../../core/hooks/useCalculateProgramProgress";
import { getStatusIcons, getSectionTypeIcons, getSectionStatusIcons } from "../../utils";

interface Props {
  program: StandardProgramListType[];
}

export const ProgramListAccordion: React.FC<Props> = ({program}) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const progress = useCalculateProgramProgress(program);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Box className="flex flex-col gap-4" data-testid="list-view">
      {program.map((item) => {
        const { programId, title, programStatus, programImage, sections } = item;
        const panelId = `panel${programId}`;
        return (
          <Accordion
            disabled={programStatus === "unavailable"}
            key={panelId}
            square={true}
            expanded={expanded === panelId}
            slots={{ transition: Fade as AccordionSlots["transition"] }}
            slotProps={{ transition: { timeout: 400 } }}
            sx={[
              expanded === panelId
                ? {
                    borderRadius: "16px",
                    "& .MuiAccordion-region": {
                      height: "auto",
                    },
                    "& .MuiAccordionDetails-root": {
                      display: "block",
                      paddingX: 0,
                      paddingTop: 0,
                    },
                  }
                : {
                    borderRadius: "16px",
                    "& .MuiAccordion-region": {
                      height: 0,
                    },
                    "& .MuiAccordionDetails-root": {
                      display: "none",
                    },
                  },
              {
                "&.Mui-disabled": {
                  backgroundColor: "white",
                  pointerEvents: "none",
                  opacity: "0.5",
                },
                "&.MuiAccordion-root:before": {
                    backgroundColor: "transparent"
                  }
              },
            ]}
          >
            <AccordionSummary
              aria-controls={`${panelId}-content`}
              id={`${panelId}-header`}
              className="bg-gradient-to-r from-mainBlue to-[#181E2F]"
              sx={[
                expanded === panelId
                  ? {
                      paddingX: 0,
                      height: "162px",
                      borderTopLeftRadius: "16px",
                      borderTopRightRadius: "16px",
                    }
                  : {
                      paddingX: 0,
                      height: "162px",
                      borderRadius: "16px",
                      border: "none",
                    },
              ]}
              style={{cursor: 'default'}}
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
                      borderBottomLeftRadius:
                        expanded === panelId ? "0px" : "16px",
                    }}
                  />
                  <div className="flex flex-col px-8 py-2 md:py-6 justify-around md:justify-between w-full">
                    <h2 className="font-ptSansNarrow font-bold text-[18px] md:text-[20px] text-center md:text-start text-white">
                      {title}
                    </h2>
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                      <div className="relative flex gap-1 items-center bg-[#181E2F] px-4 py-1 rounded-[10px]">
                        {programStatus === "progress" && <>
                          <ProgressCircle progress={progress}/>
                          <h4 className="text-white font-ptSansNarrow font-regular text-[14px] md:text-[16px] pl-4">{progress}%</h4>
                        </>}
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
                        <Typography className="text-white text-[14px] md:text-[18px] font-regular font-ptSansNarrow">
                          {sections.length} Sections
                        </Typography>

                        <ExpandMoreIcon
                          sx={{
                            color: "white",
                            cursor: "pointer",
                            transition: "transform 0.3s",
                            transform:
                              expanded === panelId
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleChange(panelId)(
                              e,
                              expanded !== panelId
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box className="h-auto">
                <div className="flex w-full justify-between bg-[#dbdfea] px-8 py-2">
                  <h4 className="font-ptSansNarrow text-[16px] text-black font-regular">
                    Sections
                  </h4>
                  <h4 className="font-ptSansNarrow text-[16px] text-black font-regular">
                    Status
                  </h4>
                </div>
              </Box>
              <Box className="flex flex-col space-y-2 bg-white px-10 pt-4">
                {sections.map((item) => {
                  const {sectionId, sectionType, sectionTitle, sectionStatus} = item;
                  return (
                    <div
                      key={sectionId}
                      className="flex justify-between items-center"
                    >
                      <div className="flex gap-2 items-center">
                        <Image
                          src={getSectionTypeIcons(sectionType)}
                          alt={sectionType}
                          width={16}
                          height={16}
                        />
                        <h4 className="font-ptSansNarrow font-regular text-[18px] text-[#6C6C6C] hover:underline cursor-pointer">
                          {sectionTitle}
                        </h4>
                      </div>
                      <Image
                        src={getSectionStatusIcons(sectionStatus)}
                        alt={sectionStatus}
                        width={16}
                        height={16}
                      />
                    </div>
                  )})}
              </Box>
            </AccordionDetails>
          </Accordion>
        )})}
    </Box>
  );
}
