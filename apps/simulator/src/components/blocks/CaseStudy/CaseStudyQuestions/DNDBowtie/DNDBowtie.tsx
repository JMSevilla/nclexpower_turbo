import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import NearMeIcon from '@mui/icons-material/NearMe';
import { DroppableContainer } from './DNDBowtieComponent/Droppable'; 
import { DraggableCard } from './DNDBowtieComponent/DraggableCard'; 
import { dndObjectValueProps, QuestionaireProps, AnswerProps,  choicesListProps, DropContainerType } from '@/core/types/ssrData';

type DropValueType = Record<string, dndObjectValueProps[]>;

type Props = {
      questionaire: QuestionaireProps[];
      answer: AnswerProps[];
      dropContainer: DropContainerType,
      droppedValue: DropValueType,
      dropAnswer: (container: string, item: dndObjectValueProps) => void,
      handleRemove: (containerName:string, value: dndObjectValueProps) => void,
      answerLists: choicesListProps[]
}

export const DNDBowtie: React.FC<Props> = ({ questionaire, answer, ...rest }) => {

    const {  dropContainer, droppedValue, dropAnswer, handleRemove, answerLists } = rest

  return (
    <div className="p-2 py-2 overflow-y-auto">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 3 }}>
        <Grid item xs={12} sm={12} md={5.5}>
          <div className='h-full w-full p-4'>
            {questionaire &&
              questionaire.map((questionItem: QuestionaireProps) => (
                <div key={questionItem.qId} className='w-full'>
                  <div className='w-full text-sm mb-4 pr-5 pt-4'>
                    <p>{questionItem.question}</p>
                  </div>
                  <div className='w-full'>
                    {questionItem.tabs &&
                      questionItem.tabs.map((tab) => (
                        <>
                          <div className='flex gap-1'>
                            <div
                              key={tab.tabsId}
                              className='bg-white w-fit px-5 py-1 rounded-t-md text-sm font-semibold flex items-center mb-[-3px]'
                            >
                              <p>{tab.tabsTitle}</p>
                            </div>
                          </div>
                          <Paper elevation={3} className='p-5 overflow-auto flex flex-col gap-5' style={{ maxHeight: '70vh' }}>
                            <div key={tab.tabsId} className=' h-[45vh] flex w-full gap-2'>
                              <p className='font-semibold min-w-[50px]'>{tab.tabsId} :</p>
                              <div className='leading-6 text-sm'>{typeof tab.content === "string" && tab.content}</div>
                            </div>
                          </Paper>
                        </>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6.5}>
          <div className='h-full w-full p-5 '>
            {answer &&
              answer.map((answerItem: AnswerProps) => (
                <>
                  <div key={answerItem.answerId} className='w-full text-sm mb-4 pr-5 pt-4'>
                    <p className="flex"><NearMeIcon className='h-6 rotate-45 text-[#86BCEA] mr-2 pb-1' />
                    <div dangerouslySetInnerHTML={{ __html: answerItem.answerInstruction }} />
                    </p>
                  </div>
                  <div className="flex gap-5 flex-col">
                    <div className="flex justify-evenly items-center gap-2">
                        <div className="flex flex-col gap-4">
                            {dropContainer.slice(0, 2).map((i: any, index: number) => (
                                <DroppableContainer
                                    key={index}
                                    accept={i.accepts}
                                    text={i.text}
                                    onDrop={(item: dndObjectValueProps) => dropAnswer(i.container, item)}
                                    droppedValue={droppedValue[i.container]}
                                    bg="bg-[#BCE4E4]"     
                                    handleRemove={() => handleRemove(i.container, droppedValue[i.container][0])}
                                />
                            ))}
                        </div>
                        <div className="flex justify-center items-center">
                            <DroppableContainer
                                accept={dropContainer[2].accepts}
                                text={dropContainer[2].text}
                                onDrop={(item: dndObjectValueProps) => dropAnswer(dropContainer[2].container, item)}
                                droppedValue={droppedValue[dropContainer[2].container]}
                                bg="bg-[#6DCFF6]"
                                handleRemove={() => handleRemove(dropContainer[2].container, droppedValue[dropContainer[2].container][0])}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            {dropContainer.slice(3).map((i:any, index: number) => (
                                <DroppableContainer
                                    key={index}
                                    accept={i.accepts}
                                    text={i.text}
                                    onDrop={(item: dndObjectValueProps) => dropAnswer(i.container, item)}
                                    droppedValue={droppedValue[i.container]}
                                    bg="bg-[#E0E0DF]"
                                    handleRemove={() => handleRemove(i.container, droppedValue[i.container][0])}
                                />
                            ))}
                        </div>
                    </div>
                      <div className="flex justify-evenly items-start">
                        <div className="flex ">
                          {answerItem.choicesListKey.map((listKey: any, index: number) => (
                            <div key={index} className="min-w-[180px] bg-[#E6F2FF]">
                              <Typography variant='subtitle1' sx={{color: "#1f1f1f", textAlign: "center", padding: "8px" }}>{listKey}</Typography>
                              <div className="flex flex-col gap-2 p-2">
                                {answerLists[listKey] && answerLists[listKey].map((item: dndObjectValueProps) => (
                                  <DraggableCard
                                    key={item.id}
                                    answer={item}
                                    type={item.container}
                                    icon={false}
                                  />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                  </div>
                  <div className='w-full text-sm mb-4 pr-5 pt-4 flex gap-1'>
                    <p>{answerItem.note === "" ? "" : "Note:"}</p>
                    <p>{answerItem.note}</p>
                  </div>
                </>
              ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
