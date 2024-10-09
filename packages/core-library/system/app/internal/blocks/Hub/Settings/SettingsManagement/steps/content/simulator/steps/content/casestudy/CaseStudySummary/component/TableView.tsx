import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Box,
  Typography,
} from "@mui/material";
import { ContainedCaseStudyQuestionType } from "../../../../../types";

interface Props {
  data: Partial<ContainedCaseStudyQuestionType>;
}

export const TableView: React.FC<Props> = ({ data }) => {
  const column = [
    "Question Item",
    "Sequence No.",
    "Question Types",
    "MaxOrigPoints",
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="512px"
    >
      <Box margin="25px">
        {data.caseName && data.caseName.length > 0 && (
          <Typography>{data.caseName.join(" and ")}</Typography>
        )}
      </Box>
      <Box width="90%" margin="20px">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {column.map((colName, index) => (
                  <TableCell
                    align="center"
                    key={index}
                    sx={{
                      border: "1px solid #7222B1",
                      width: "50px",
                      backgroundColor: "#D4AEF2",
                    }}
                  >
                    <Typography fontWeight="semiBold">{colName}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.questionnaires && data.questionnaires.length > 0 ? (
                data.questionnaires.map((content, index) => (
                  <TableRow key={index}>
                    <TableCell
                      align="center"
                      sx={{ border: "1px solid #7222B1", width: "50px" }}
                    >
                      {content.itemNum}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ border: "1px solid #7222B1", width: "50px" }}
                    >
                      {content.seqNum}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ border: "1px solid #7222B1", width: "50px" }}
                    >
                      {content.questionType}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ border: "1px solid #7222B1", width: "50px" }}
                    >
                      {content.maxPoints}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography>No data available</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
