import {
  Box,
  Paper,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { ControlledTextField } from "../../../../../Textfield/TextField";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ControlledRadio } from "../../../../../Radio/Radio";
import { ContainedCaseStudyQuestionMockType } from "./schema";

export type DDCTablePropsype = {
  optionName: string;
  answerOptionIndex: number;
  questionIndex: number;
};

export const DDCTable: React.FC<DDCTablePropsype> = ({
  optionName,
  answerOptionIndex,
  questionIndex,
}) => {
  const [checked, setChecked] = useState<number>();
  const { getValues, setValue, control } =
    useFormContext<ContainedCaseStudyQuestionMockType>();
  const { append, fields } = useFieldArray<ContainedCaseStudyQuestionMockType>({
    name: `questionnaires.${questionIndex}.answerOptions.${answerOptionIndex}.options`,
  });

  const handleRadioChange = (val: string) => {
    const selectedAnswer = parseInt(val);
    setChecked(selectedAnswer);
  };

  const handleAppendItem = () => {
    append({ answer: "", answerKey: false });
  };

  useEffect(() => {
    if (checked === undefined) return;
    const { questionnaires } = getValues();
    const updatedAnswers =
      questionnaires?.[questionIndex]?.answerOptions?.[answerOptionIndex]
        .options;

    if (updatedAnswers) {
      updatedAnswers.map((_, index) => {
        const isChecked = index === checked;
        console.log(isChecked);

        setValue(
          `questionnaires.${questionIndex}.answerOptions.${answerOptionIndex}.options.${index}.answerKey`,
          isChecked
        );
      });
    }
  }, [checked, questionIndex, setValue, getValues, setChecked]);

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "10px",
          overflow: "hidden",
          border: "1px solid #ddd",
          bgcolor: "#8E2ADD",
        }}
      >
        <Box sx={{ width: "100%", height: "100%" }}>
          <Typography
            sx={{ fontSize: "12px" }}
            p={2}
            fontWeight={600}
            textAlign="center"
            color="white"
            textTransform="capitalize"
          >
            {optionName}
          </Typography>
        </Box>
        <RadioGroup
          onChange={(e) => {
            handleRadioChange(e.target.value);
          }}
        >
          <Table
            sx={{
              overflow: "hidden",
              borderRadius: "5px",
              border: "1px solid #ddd",
              bgcolor: "white",
            }}
            aria-label="simple table"
          >
            <TableBody>
              {fields.map((_, index) => (
                <TableRow
                  key={index}
                  sx={{
                    display: "flex",
                    borderBottom: "1px solid #d3d3d3",
                    alignItems: "center",
                    px: 3,
                  }}
                >
                  <TableCell scope="row" sx={{ padding: 0 }}>
                    <Box>
                      <ControlledRadio
                        value={index}
                        name={`questionnaires.${questionIndex}.answerOptions.${answerOptionIndex}.options.${index}.answerKey`}
                      />
                    </Box>
                  </TableCell>
                  <TableCell width="100%" sx={{ padding: 0 }}>
                    <Box height="100%">
                      <ControlledTextField
                        sx={{
                          width: 1,
                          height: "30px",
                          outline: 0,
                          border: 0,
                          ".MuiOutlinedInput-notchedOutline": { border: 0 },
                          "&::before": {
                            backgroundColor: "black",
                          },
                        }}
                        name={`questionnaires.${questionIndex}.answerOptions.${answerOptionIndex}.options.${index}.answer`}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}

              <TableRow sx={{ padding: 0 }}>
                <TableCell
                  colSpan={2}
                  sx={{
                    padding: 0,
                    display: "flex",
                    justifyContent: "center",
                    borderTop: "1px solid #ddd",
                  }}
                >
                  <IconButton onClick={handleAppendItem}>
                    <AddCircleIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </RadioGroup>
      </TableContainer>
    </Box>
  );
};
