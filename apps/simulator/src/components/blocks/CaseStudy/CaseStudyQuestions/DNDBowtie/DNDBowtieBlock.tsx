import React, { useState } from 'react';
import { DNDBowtie, DroppedValueType } from './DNDBowtie';
import { DNDBowtieValidationAtom } from '@/core/schema/useAtomic';
import { DNDBowtieValidationType } from '@/core/schema/dndbowtie/validation';
import { DropContainerType, SsrData, choicesListProps, dndObjectValueProps, } from '@/core/types/ssrData';
import { dropContainers, initialContainerState } from '@/core/constant/dndStateConstant';
import { getMapItems } from '@/core/utils/contents';
import { useAtom } from 'jotai';

export const DNDBowtieBlock: React.FC<SsrData> = ({ questionaire, answer }) => {
  const { choicesLists } = getMapItems(answer)
  const [answerLists, setAnswerList] = useState<choicesListProps[]>(choicesLists);
  const [droppedValue, setDroppedValue] = useState<DroppedValueType>(initialContainerState);
  const dropContainer: DropContainerType = dropContainers;
  const [dndBowtieAtom, setDnDBowtieAtom] = useAtom(DNDBowtieValidationAtom)

  async function handleSubmit(values: DNDBowtieValidationType) {
    console.log("answer", values)
  }

  const removeValue = (id: number, container: string, setState: any) => {
    setState((prevState: any) => {
      const updatedState = { ...prevState };
      updatedState[container] = updatedState[container].filter((block: { id: number }) => block.id !== id);
      return updatedState;
    });
  };

  const addValue = (value: dndObjectValueProps) => {
    setAnswerList((prevState: any) => {
      const updatedState = { ...prevState };
      if (!updatedState[value.container]?.some((values: dndObjectValueProps) => values.id === value.id)) {
        updatedState[value.container] = updatedState[value.container] ? [...updatedState[value.container], value] : [value];
      }
      return updatedState;
    });
  }

  const dropAnswer = (containerName: string, value: dndObjectValueProps) => {
    const { id, container } = value
    setDroppedValue(prevState => {
      if (prevState[containerName].length > 0) {
        const currentValue = prevState[containerName];
        addValue(currentValue[0])
      }

      return {
        ...prevState,
        [containerName]: [value]
      };
    });
    removeValue(id, container, setAnswerList)
  };

  const handleRemove = (containerName: string, item: dndObjectValueProps) => {
    const { id } = item
    removeValue(id, containerName, setDroppedValue)
    addValue(item)
  };



  return (
    <DNDBowtie
      dropContainer={dropContainer}
      droppedValue={droppedValue}
      dropAnswer={dropAnswer}
      handleRemove={handleRemove}
      answerLists={answerLists}
      questionaire={questionaire}
      answer={answer}
      handleSubmit={handleSubmit}
      dndBowtieAtom={dndBowtieAtom}
    />
  );
};
