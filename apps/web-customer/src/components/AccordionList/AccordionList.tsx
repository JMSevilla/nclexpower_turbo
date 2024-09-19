import React, { useState } from "react";
import { Box, Accordion, AccordionSlots, Fade } from "@mui/material";
import { StandardProgramListType } from "../../core/types/programList";
import useCalculateProgramProgress from "../../core/hooks/useCalculateProgramProgress";
import { CustomAccordionSummary } from "./AccordionSummary";
import { CustomAccordionDetails } from "./AccordionDetails";
import { styled } from "@mui/material";

interface Props {
  program: StandardProgramListType[];
}

const StyledAccordion = styled(Accordion)(({ expanded }) => ({
  borderRadius: "16px",
  "& .MuiAccordion-region": {
    height: expanded ? "auto" : 0,
  },
  "& .MuiAccordionDetails-root": {
    display: expanded ? "block" : "none",
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
  },
  "&.Mui-disabled": {
    backgroundColor: "white",
    pointerEvents: "none",
    opacity: 0.5,
  },
  "&.MuiAccordion-root:before": {
    backgroundColor: "transparent",
  },
}));

export const AccordionList: React.FC<Props> = ({ program }) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const progress = useCalculateProgramProgress(program);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Box className="flex flex-col gap-4" data-testid="list-view">
      {program.length === 0 ? (
        <>
          <h4 className="font-ptSansNarrow text-center text-gray-500 w-full">
            No programs available at the moment.
          </h4>
        </>
        ) : (
        program.map((item) => {
          const { programId, title, programStatus, programImage, sections } =
            item;
          const panelId = `panel${programId}`;
          return (
            <StyledAccordion
              disabled={programStatus === "unavailable"}
              key={panelId}
              square
              expanded={expanded === panelId}
              slots={{ transition: Fade as AccordionSlots["transition"] }}
              slotProps={{ transition: { timeout: 400 } }}
            >
              <CustomAccordionSummary
                panelId={panelId}
                expanded={expanded === panelId}
                programImage={programImage}
                title={title}
                programStatus={programStatus}
                sectionsCount={sections.length}
                progress={progress}
                onToggle={handleChange(panelId)}
              />

              <CustomAccordionDetails sections={sections} />
            </StyledAccordion>
          );
        })
      )}
    </Box>
  );
};
