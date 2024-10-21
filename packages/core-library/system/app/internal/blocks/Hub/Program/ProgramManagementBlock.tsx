/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box, Container, Typography } from "@mui/material";
import { standardProgramList } from "./constant/ProgramConstants";
import { Button } from "../../../../../../components";
import { AccordionList } from "../../../../../../components/AccordionList/AccordionList";

export function ProgramManagementBlock() {
  const buttonStyle = {
    color: "white",
    borderRadius: "10px",
    backgroundColor: "#560bad",
    fontSize: "1rem",
    boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.3)",
  };

  return (
    <Box>
      <Container>
        <Box
          sx={{
            padding:'10px',
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{ fontSize: "1.5rem", fontWeight: "bold", color: "#560bad" }}
          >
            Program Management List
          </Typography>
          <Button sx={buttonStyle}>Create</Button>
        </Box>
        <AccordionList program={standardProgramList} isOptions={true}/>
      </Container>
    </Box>
  );
}
