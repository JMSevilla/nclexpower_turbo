import React from "react";
import {
  Accordion,
  AccordionDetails,
  Box,
  CardContent,
  Typography,
  AccordionSummary,
} from "@mui/material";
import { Button, Card } from "../../../../../../../../../../../components";
import { ContentApprover } from "./MockData";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
  data: ContentApprover;
  index: number;
}

export const MultipleAccordion: React.FC<Props> = ({ data, index }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxHeight: "80vh",
        overflowY: "auto",
        rowGap: 6,
      }}
    >
      <div>
        <Accordion key={index} sx={{ pb: 5 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            aria-controls={`panel-${data.id}-content`}
            id={`panel-${data.id}-header`}
            sx={{
              bgcolor: "darkviolet",
              color: "white",
              borderTopLeftRadius: 10,
              borderBottomRightRadius: 20,
              p: 2,
            }}
          >
            {`${data.accountId.name} ${data.accountId.lastname}`}
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                p: 5,
              }}
            >
              <Box sx={{ display: "flex", gap: 2 }}>
                <Card
                  variant="elevation"
                  sx={{
                    flex: 1,
                    maxHeight: 700,
                    minHeight: 600,
                    overflowY: "auto",
                  }}
                >
                  <CardContent>
                    <Typography variant="h1" sx={{ pb: 5 }}>
                      Content
                    </Typography>
                    <Box
                      sx={{
                        width: "100%",
                        height: "4px",
                        backgroundColor: "darkviolet",
                        mb: 2,
                      }}
                    />
                    <Typography>{data.content}</Typography>
                  </CardContent>
                </Card>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    maxHeight: 600,
                    minHeight: 500,
                  }}
                >
                  <Card
                    variant="elevation"
                    sx={{
                      flex: 1,
                      overflowY: "auto",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h1" sx={{ pb: 4 }}>
                        Approver Details
                      </Typography>
                      <Box
                        sx={{
                          width: "100%",
                          height: "4px",
                          backgroundColor: "darkviolet",
                          mb: 5,
                        }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          rowGap: 5,
                        }}
                      >
                        <Typography>
                          Name:
                          {`${data.accountId.name} ${data.accountId.lastname}`}
                        </Typography>
                        <Typography>
                          Created Date:
                          {new Date(data.approver.createdDate).toLocaleString()}
                        </Typography>
                        <Typography>
                          Updated Date:
                          {new Date(data.approver.updatedDate).toLocaleString()}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>

                  <Card variant="elevation">
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: "10px",
                        }}
                      >
                        <Button
                          sx={{
                            bgcolor: "#42b883",
                            color: "white",
                            "&:hover": {
                              bgcolor: "#118a7e",
                            },
                            borderTopLeftRadius: 10,
                            borderBottomRightRadius: 20,
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          sx={{
                            bgcolor: "#f23557",
                            color: "white",
                            "&:hover": {
                              bgcolor: "#d63447",
                            },
                            borderTopLeftRadius: 10,
                            borderBottomRightRadius: 20,
                          }}
                        >
                          Reject
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </div>
    </Box>
  );
};
