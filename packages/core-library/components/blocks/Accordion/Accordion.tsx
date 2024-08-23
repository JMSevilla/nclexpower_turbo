import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Grid } from "@mui/material";
import { useSanitizedInputs } from "../../../hooks";

type QSummaryProps = {
  clientNeeds: any;
  cognitivelevel: any;
  contentArea: any;
  answers: any[];
};

const QSummary: React.FC<QSummaryProps> = ({
  clientNeeds,
  cognitivelevel,
  contentArea,
  answers,
}) => {
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={5}>
        <Box
          padding="4px"
          marginX="10px"
          height="25vh"
          borderRight="2px solid #8E2ADD"
          justifyContent="center"
        >
          <Box
            display="flex"
            alignItems="start"
            justifyContent="center"
            flexDirection="column"
          >
            <Typography color="#8E2ADD">Cognitive Level :</Typography>
            <Typography>{clientNeeds}</Typography>
          </Box>
          <Box display="flex" alignItems="start" flexDirection="column">
            <Typography color="#8E2ADD">Content Area :</Typography>
            <Typography fontSize="18px">{cognitivelevel}</Typography>
          </Box>
          <Box display="flex" alignItems="start" flexDirection="column">
            <Typography color="#8E2ADD">Client Needs Category :</Typography>
            <Typography>{contentArea}</Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={7}>
        {answers.length > 0 &&
          answers.map(({ answer }) => (
            <Box>
              {/* <SATA /> */}
              <Typography>{answer}</Typography>
            </Box>
          ))}
      </Grid>
    </Grid>
  );
};

interface Props {
  answers: any[];
  question: any;
  clientNeeds: any;
  cognitivelevel: any;
  contentArea: any;
  index: number;
}

export const RegularQAccordion: React.FC<Props> = ({
  clientNeeds,
  cognitivelevel,
  contentArea,
  question,
  answers,
  index,
}) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const { purifyInputs } = useSanitizedInputs({
    config: {
      ALLOWED_TAGS: ["#text"],
    },
  });
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
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
          id="panel1-header"
          sx={{ backgroundColor: "#8E2ADD", borderRadius: "10px" }}
        >
          <Box width="100%" height="100%" padding="5px">
            <Typography fontSize="18px" style={{ color: "#ffff" }}>
              {purifyInputs(question) as string}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <QSummary
            clientNeeds={clientNeeds}
            cognitivelevel={cognitivelevel}
            contentArea={contentArea}
            answers={answers}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
