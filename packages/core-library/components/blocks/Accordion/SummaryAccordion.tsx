import * as React from "react";
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
}

type AnswerOptionSummaryProps = {
  clientNeeds: string;
  cognitiveLevel: string;
  contentArea: string;
  type: string;
  answers: AnswerProps[];
};

const AnswerOptionSummary: React.FC<AnswerOptionSummaryProps> = ({
  clientNeeds,
  cognitiveLevel,
  contentArea,
  answers,
  type
}) => {

  const renderType = (type: string, answerKey: boolean) => {
      switch(type){
        case "SATA" :
          return <Checkbox disabled checked={answerKey} />
        case "MCQ" :
          return  <Radio disabled checked={answerKey} />
        default:
      }
  }

  return (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={5}>
          <Box
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
            <Box display="flex" alignItems="start" flexDirection="column" marginBottom="4px">
              <Typography color="#8E2ADD">Content Area :</Typography>
              <Typography fontSize="18px">{contentArea}</Typography>
            </Box>
            <Box display="flex" alignItems="start" flexDirection="column" marginBottom="4px">
              <Typography color="#8E2ADD">Client Needs Category :</Typography>
              <Typography>{clientNeeds}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={7}>
        <Typography color="#8E2ADD">Aswer Option :</Typography>
        <Box height="160px" sx={{
                overflowY: "auto"
              }}>
          {answers.length > 0 &&
            answers.map(({ answer, answerKey }) => (
              <Box display="flex" alignItems="center">
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

interface Props {
  item:any;
  type: any;
  index: number;
}

export const SummaryAccordion: React.FC<Props> = ({
  item,
  type,
  index,
}) => {

  const [expanded, setExpanded] = React.useState<string | false>("panel0");
  const { purifyInputs } = useSanitizedInputs({
    config: {
      ALLOWED_TAGS: ["#text"],
    },
  });
  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  return (
    <div>
      <Accordion
        key={index}
        expanded={expanded === `panel${index}`}
        onChange={handleChange(`panel${index}`)}
        sx={{
          borderRadius: "10px",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "#ffff" }} />}
          aria-controls="panel1-content"
          id={`panel${index}-header`}
          sx={{ backgroundColor: "#8E2ADD", borderRadius: "10px" }}
        >
          <Box width="100%" height="100%" padding="5px">
            <Typography fontSize="18px" style={{ color: "#ffff" }}>
              {purifyInputs(item.question) as string}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <AnswerOptionSummary
            clientNeeds={item.clientNeeds}
            cognitiveLevel={item.cognitiveLevel}
            contentArea={item.contentArea}
            answers={item.answers}
            type={type}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
