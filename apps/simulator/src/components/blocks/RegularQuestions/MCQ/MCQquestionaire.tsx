import {} from "@mui/material";
import {
  SsrData,
  SsrMockQuestionaire,
  SsrQuestionaireContentProps,
} from "@/core/types/ssrData";
import React, { useState } from "react";
import NearMeIcon from "@mui/icons-material/NearMe";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
  Container,
  Radio,
} from "@mui/material";

export const McqQuestion: React.FC<SsrData> = ({ questionaire, answer }) => {
  const [selectedOptions, setSelectedOptions] = useState(
    Array(answer.length).fill(null)
  );

  const handleOptionChange = (rowIndex: any, optionIndex: any) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[rowIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };

  return (
    <div className="p-2 h-full tracking-tight">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6} md={6}>
          <div className="h-full w-full p-4">
            {questionaire &&
              questionaire.map((questionItem) => (
                <div key={questionItem.qId} className="w-full">
                  <div className="w-full text-sm mb-4 pr-5 pt-4">
                    <p>{questionItem.question}</p>
                  </div>
                  <div className="w-full">
                    {questionItem.tabs &&
                      questionItem.tabs.map((tab) => (
                        <>
                          <div className="flex gap-1">
                            <div
                              key={tab.tabsId}
                              className="bg-white w-fit px-5 py-1 rounded-t-md text-sm font-semibold flex items-center mb-[-3px]"
                            >
                              <p>{tab.tabsTitle}</p>
                            </div>
                          </div>
                          <Paper
                            elevation={3}
                            className="p-5 overflow-auto flex flex-col gap-5"
                            style={{ maxHeight: "70vh" }}
                          >
                            <div
                              key={tab.tabsId}
                              className=" h-[45vh] flex w-full gap-2"
                            >
                              <p className="font-semibold min-w-[50px]">
                                {tab.tabsId} :
                              </p>
                              <div className="leading-6 text-sm">
                                {typeof tab.content === "string" ? (
                                  <>{tab.content}</>
                                ) : (
                                  <>
                                    {tab.content?.length > 0 &&
                                      tab.content.map(
                                        (
                                          contentItem: SsrQuestionaireContentProps,
                                          contentItemIdx
                                        ) => (
                                          <React.Fragment key={contentItemIdx}>
                                            <p className="min-w-[50px] inline-block">
                                              <span>
                                                <strong>
                                                  {contentItem.contentId}
                                                </strong>
                                              </span>{" "}
                                              : {contentItem.content}
                                            </p>
                                            <br />
                                          </React.Fragment>
                                        )
                                      )}
                                  </>
                                )}
                              </div>
                            </div>
                          </Paper>
                        </>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <div className="h-full w-full p-4 font-sans tracking-tight">
            <form>
              {answer &&
                answer.map((answerItem) => (
                  <div key={answerItem.answerId} className="w-full">
                    <div className="w-full text-sm mb-4 pr-5 pt-4">
                      <p>
                        <NearMeIcon className="h-6 rotate-45 text-[#86BCEA] mr-2 pb-1" />
                        {answerItem.answerInstruction}
                      </p>
                    </div>
                    <div className="w-full">
                      <Paper elevation={3}>
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow>
                                {answerItem.columns.map(
                                  (columnName: string, index) => (
                                    <TableCell
                                      key={index}
                                      align="center"
                                      className="text-sm bg-[#E6F2FF] font-semibold border border-[#D4D7DA]"
                                      sx={{ width: "80px" }}
                                    >
                                      {columnName}
                                    </TableCell>
                                  )
                                )}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {answerItem.rows.map(
                                (row: any, rowIndex: any) => (
                                  <TableRow key={row.rowIndex}>
                                    <TableCell
                                      align="left"
                                      className="text-sm border border-[#D4D7DA] p-4 w-40"
                                    >
                                      {row.NRI}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      className=" border border-[#D4D7DA]"
                                    >
                                      <Radio
                                        value={row.ID}
                                        checked={
                                          selectedOptions[rowIndex] === 0
                                        }
                                        onChange={() =>
                                          handleOptionChange(rowIndex, 0)
                                        }
                                      />
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      className=" border border-[#D4D7DA]"
                                    >
                                      <Radio
                                        value={row.NID}
                                        checked={
                                          selectedOptions[rowIndex] === 1
                                        }
                                        onChange={() =>
                                          handleOptionChange(rowIndex, 1)
                                        }
                                      />
                                    </TableCell>
                                  </TableRow>
                                )
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                      <div className="w-full text-sm mb-4 pr-5 pt-4 flex gap-1">
                        <p>Note:</p>
                        <p>{answerItem.note}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
