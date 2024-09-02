import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import { useSanitizedInputs } from "../../../hooks";
import {
  SummaryAccordionContent,
  ContentProps,
} from "./SummaryAccordionContent";

interface Item extends ContentProps {
  question: string;
}

interface Props {
  item: Item;
  type: string;
  index: number;
}

export const SummaryAccordion: React.FC<Props> = ({ item, type, index }) => {
  const [expanded, setExpanded] = useState<string | false>("panel0");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const { purifyInputs } = useSanitizedInputs({
    config: {
      RETURN_TRUSTED_TYPE: true,
    },
  });

  return (
    <div>
      <Accordion
        key={index}
        expanded={expanded === `panel${index}`}
        onChange={handleChange(`panel${index}`)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "#ffff" }} />}
          aria-controls={`panel${index}-content`}
          id={`panel${index}-header`}
          sx={{
            backgroundColor: "#8E2ADD ",
            "&:hover": {
              backgroundColor: "#7222B1",
            },
            borderRadius: "10px",
            paddingX: "10px",
          }}
        >
          <Box>
            <Typography
              style={{
                color: "#ffff",
              }}
              key={index}
              dangerouslySetInnerHTML={{
                __html: purifyInputs(item.question) as TrustedHTML,
              }}
            />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <SummaryAccordionContent
            clientNeeds={item.clientNeeds}
            cognitiveLevel={item.cognitiveLevel}
            contentArea={item.contentArea}
            answers={item.answers}
            type={type as "SATA" | "MCQ"}
            index={index}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
