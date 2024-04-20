import React, { useState, useCallback } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import NearMeIcon from '@mui/icons-material/NearMe';
import { DroppableContainer } from './DNDBowtieComponent/Droppable';
import { DraggableCard } from './DNDBowtieComponent/DraggableCard';
import itemTypes from './DNDBowtieComponent/ItemTypes';
import { dndObjectValueProps, SsrData } from '@/core/types/ssrData';


const initialContainerState= {
  "first": [],
  "second": [],
  "third": [],
  "fourth": [],
  "fifth": []
};

export const DNDBowtieQuestion: React.FC<SsrData> = ({ questionaire, answer }) => {

    const foundAnswer = answer ? answer && answer.find(answers => answers.answerId) : null;
    const choicesList = foundAnswer ? foundAnswer.ChoicesList : [];

const [answerLists, setAnswerList] = useState<Record<string, dndObjectValueProps[]>>(choicesList);
  const [droppedValue, setDroppedValue] = useState<Record<string, dndObjectValueProps[]>>(initialContainerState);
  const [dropContainer] = useState([
    { accepts: [itemTypes.FIRST], text: "Action To Take", container: "first" },
    { accepts: [itemTypes.FIRST], text: "Action To Take", container: "second" },
    { accepts: [itemTypes.SECOND], text: "Condition Most Likely Experiencing", container: "third" },
    { accepts: [itemTypes.Third], text: "Parameter To Monitor", container: "fourth" },
    { accepts: [itemTypes.Third], text: "Parameter To Monitor", container: "fifth" },
  ]);

  const removeValue = (id: number, containerName: string, setState:any ) => {
    setState((prevState:any) => {
        const updatedState: Record<string, dndObjectValueProps[]> = { ...prevState };
        updatedState[containerName] = updatedState[containerName].filter(block => block.id !== id);
        return updatedState;
      });
  }

  const addValue = (value: dndObjectValueProps) => {
    setAnswerList(prevState => {
        const updatedState: Record<string, dndObjectValueProps[]> = { ...prevState };
        if (!updatedState[value.container]?.some((i: dndObjectValueProps) => i.id === value.id)) {
          updatedState[value.container] = updatedState[value.container] ? [...updatedState[value.container], value] : [value];
        }
        return updatedState;
      });
  }

  const dropvalue = useCallback((containerName: string, value: dndObjectValueProps) => {
    const { id, container } = value
    setDroppedValue(prevState => {
      if (prevState[containerName].length > 0) {
        const currentValue = prevState[containerName];
        addValue(currentValue[0])
        return {
          ...prevState,
          [containerName]: [value]
        };
      } else {
        return {
          ...prevState,
          [containerName]: [value]
        };
      }
    });
    removeValue(id, container, setAnswerList)
  }, [setDroppedValue, removeValue, addValue]);
  
  const handleRemove = useCallback((containerName: string, item: dndObjectValueProps) => {
    const { id } = item
    removeValue(id, containerName, setDroppedValue)
    addValue(item)
  }, [setDroppedValue, removeValue, addValue]);

  return (
    <div className="p-2 py-2 min-h-[100dvh]">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6} md={5.5}>
          <div className='h-full w-full p-4'>
            {questionaire &&
              questionaire.map((questionItem: any) => (
                <div key={questionItem.qId} className='w-full'>
                  <div className='w-full text-sm mb-4 pr-5 pt-4'>
                    <p>{questionItem.question}</p>
                  </div>
                  <div className='w-full'>
                    {questionItem.tabs &&
                      questionItem.tabs.map((tab: any) => (
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
        <Grid item xs={12} sm={6} md={6.5}>
          <div className='h-full w-full p-5'>
            {answer &&
              answer.map((answerItem: any) => (
                <>
                  <div key={answerItem.answerId} className='w-full text-sm mb-4 pr-5 pt-4'>
                    <p className="flex"><NearMeIcon className='h-6 rotate-45 text-[#86BCEA] mr-2 pb-1' /><div dangerouslySetInnerHTML={{ __html: answerItem.answerInstruction }} /></p>
                  </div>
                  <div className="flex gap-5 flex-col">
                    <Paper elevation={3} className="p-5 overflow-auto flex flex-col gap-2">
                    <div className="flex justify-between items-center gap-2">
                        <div className="flex flex-col gap-4">
                            {dropContainer.slice(0, 2).map((i, index) => (
                                <DroppableContainer
                                    key={index}
                                    accept={i.accepts}
                                    text={i.text}
                                    onDrop={(item: any) => dropvalue(i.container, item)}
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
                                onDrop={(item: any) => dropvalue(dropContainer[2].container, item)}
                                droppedValue={droppedValue[dropContainer[2].container]}
                                bg="bg-[#6DCFF6]"
                                handleRemove={() => handleRemove(dropContainer[2].container, droppedValue[dropContainer[2].container][0])}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            {dropContainer.slice(3).map((i, index) => (
                                <DroppableContainer
                                    key={index}
                                    accept={i.accepts}
                                    text={i.text}
                                    onDrop={(item: any) => dropvalue(i.container, item)}
                                    droppedValue={droppedValue[i.container]}
                                    bg="bg-[#E0E0DF]"
                                    handleRemove={() => handleRemove(i.container, droppedValue[i.container][0])}
                                />
                            ))}
                        </div>
                    </div>
                    </Paper>
                    <Paper elevation={3} className="p-1 overflow-auto flex flex-col">
                      <div className="flex justify-evenly items-start">
                        <div className="flex gap-1">
                          {answerItem.selectFieldKey.map((key: string, index: number) => (
                            <div key={index} className="min-w-[180px] bg-[#E6F2FF]">
                              {/* <h3 className="text-center p-2">{key}</h3> */}
                              <Typography variant='subtitle1' sx={{color: ""}}>{key}</Typography>
                              <div className="flex flex-col gap-2 p-2">
                                {answerLists[key] && answerLists[key].map((item: dndObjectValueProps) => (
                                  <DraggableCard
                                    key={item.id}
                                    answer={item}
                                    type={item.container}
                                  />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Paper>
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
