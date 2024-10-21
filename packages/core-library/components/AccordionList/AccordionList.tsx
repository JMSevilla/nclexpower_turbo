/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React, { useState } from "react";
import {
  Box,
  Accordion,
  AccordionSlots,
  Fade,
  IconButton,
} from "@mui/material";
import { StandardProgramListType } from "core-library/types/wc/programList";
import { CustomAccordionSummary } from "./AccordionSummary";
import { CustomAccordionDetails } from "./AccordionDetails";
import { styled } from "@mui/material";
import useCalculateProgramProgress from "../../core/hooks/useCalculateProgramProgress";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  program: StandardProgramListType[];
  isOptions?: boolean;
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

export const AccordionList: React.FC<Props> = ({
  program,
  isOptions = false,
}) => {
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
        <>
          {program.map((item) => {
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
                sx={{ display: "flex", flexDirection: "column", gap: 1 }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    padding: 1,
                  }}
                >
                  <CustomAccordionSummary
                    panelId={panelId}
                    expanded={expanded === panelId}
                    programImage={programImage}
                    title={title}
                    programStatus={programStatus}
                    sectionsCount={sections?.length ?? 0}
                    progress={progress}
                    onToggle={handleChange(panelId)}
                  />
                  {isOptions && (
                    <Box
                      sx={{
                        padding: "5px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                      }}
                    >
                      <IconButton
                        sx={{
                          marginBottom: '2px',
                          backgroundColor: "yellow",
                          boxShadow: 2,
                          borderRadius: 5,
                          "&:hover": {
                            backgroundColor: "gold",
                            boxShadow: 4,
                          },
                        }}
                      >
                        <EditIcon sx={{ color: "white" }} />
                      </IconButton>

                      <IconButton
                        sx={{
                          backgroundColor: "red",
                          boxShadow: 2,
                          borderRadius: 5,
                          "&:hover": {
                            backgroundColor: "darkred",
                            boxShadow: 4,
                          },
                        }}
                      >
                        <DeleteIcon sx={{ color: "white" }} />
                      </IconButton>
                    </Box>
                  )}
                </Box>

                <CustomAccordionDetails
                  sections={sections ?? []}
                  programId={programId}
                />
              </StyledAccordion>
            );
          })}
        </>
      )}
    </Box>
  );
};
