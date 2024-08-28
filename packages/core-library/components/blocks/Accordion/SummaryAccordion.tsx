import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Checkbox, Radio, Grid } from "@mui/material";
import { useSanitizedInputs } from "../../../hooks";

type AnswerProps = {
  answer: string;
  answerKey: boolean;
};

interface ContentProps {
  clientNeeds: string;
  cognitiveLevel: string;
  contentArea: string;
  answers: AnswerProps[];
  index?: number;
}

interface AnswerOptionContentProps extends ContentProps {
  type: string;
}

const AnswerOptionContent: React.FC<AnswerOptionContentProps> = (props) => {
  const { clientNeeds, cognitiveLevel, contentArea, answers, type, index } =
    props;
  const renderType = (type: string, answerKey: boolean) => {
    switch (type) {
      case "SATA":
        return <Checkbox disabled checked={answerKey} />;
      case "MCQ":
        return <Radio disabled checked={answerKey} />;
      default:
        return null;
    }
  };

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={4}>
        <Box
          key={index}
          padding="4px"
          marginX="10px"
          minHeight="25vh"
          borderRight="2px solid #8E2ADD"
          justifyContent="center"
        >
          <Box
            display="flex"
            alignItems="start"
            justifyContent="center"
            flexDirection="column"
            marginBottom="4px"
          >
            <Typography color="#8E2ADD">Cognitive Level :</Typography>
            <Typography>{cognitiveLevel}</Typography>
          </Box>
          <Box
            display="flex"
            alignItems="start"
            flexDirection="column"
            marginBottom="4px"
          >
            <Typography color="#8E2ADD">Content Area :</Typography>
            <Typography fontSize="18px">{contentArea}</Typography>
          </Box>
          <Box
            display="flex"
            alignItems="start"
            flexDirection="column"
            marginBottom="4px"
          >
            <Typography color="#8E2ADD">Client Needs Category :</Typography>
            <Typography>{clientNeeds}</Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Typography color="#8E2ADD">Answer Option :</Typography>
        <Box
          height="160px"
          sx={{
            overflowY: "auto",
          }}
        >
          {answers.length > 0 &&
            answers.map(({ answer, answerKey }, idx) => (
              <Box key={idx} display="flex" alignItems="center" paddingX="10px">
                <>
                  {renderType(type, answerKey)}
                  <Typography>{answer}</Typography>
                </>
              </Box>
            ))}
        </Box>
      </Grid>
    </Grid>
  );
};

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
          <AnswerOptionContent
            clientNeeds={item.clientNeeds}
            cognitiveLevel={item.cognitiveLevel}
            contentArea={item.contentArea}
            answers={item.answers}
            type={type}
            index={index}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
