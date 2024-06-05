import React, { useState, useCallback } from 'react';
import { dropContainers, initialContainerState } from '@/core/constant/dndStateConstant';
import { dndObjectValueProps, SsrData, choicesListProps, DropContainerType } from '@/core/types/ssrData';
import { DNDBowtie } from './DNDBowtie';
import { getMapItems } from '@/core/utils/contents';


export const DNDBowtieBlock: React.FC<SsrData> = ({ questionaire, answer }) => {

  const { choicesLists} = getMapItems(answer)
  const [answerLists, setAnswerList] = useState<choicesListProps[]>(choicesLists);
  const [droppedValue, setDroppedValue] = useState<Record<string, dndObjectValueProps[]>>(initialContainerState);
  const [dropContainer] = useState<DropContainerType>(dropContainers);

  const removeValue = (id: number, container: string, setState: any ) => {
    setState((prevState:any) => {
        const updatedState = { ...prevState };
        updatedState[container] = updatedState[container].filter((block: { id: number; }) => block.id !== id);
        return updatedState;
      });
  }
  const addValue = (value: dndObjectValueProps) => {
    setAnswerList((prevState: any) => {
        const updatedState = { ...prevState };
        if (!updatedState[value.container]?.some((values: dndObjectValueProps) => values.id === value.id)) {
          updatedState[value.container] = updatedState[value.container] ? [...updatedState[value.container], value] : [value];
        }
        return updatedState;
      });
  }

  const dropAnswer = useCallback((containerName: string, value: dndObjectValueProps) => {
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
    <DNDBowtie 
        questionaire={questionaire} 
        answer={answer} 
        dropContainer={dropContainer} 
        droppedValue={droppedValue} 
        dropAnswer={dropAnswer} 
        handleRemove={handleRemove} 
        answerLists={answerLists}    
    />
  );
};
