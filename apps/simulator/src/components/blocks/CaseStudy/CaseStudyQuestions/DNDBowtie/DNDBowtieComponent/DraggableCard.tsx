import React, { useRef } from 'react';
import { Paper, IconButton } from "@mui/material";
import { useDrag } from "react-dnd";
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { dndObjectValueProps } from '@/core/types/ssrData';

type Props = {
  onClick?: (() => void) | undefined
  answer: dndObjectValueProps,
  bg?: any,
  icon: boolean
  type: string
}

export const DraggableCard: React.FC<Props> = ({ onClick, answer, ...rest }) => {

  const { icon, type, bg } = rest
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { id: answer.id, container: answer.container, text: answer.text, },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const ref = useRef<HTMLDivElement>(null)
  drag(ref)

  return (
    <div
      ref={ref}
      key={answer.id}
      className={`rounded-md relative cursor-grab ${isDragging ? "opacity-0" : "opacity-100"}`}
    >
      <Paper elevation={8} style={{ borderRadius: "0.375rem" }}>
        <div className={`flex justify-between items-center text-start text-xs w-48 min-h-16 rounded-md ${bg} p-2 px-6`}>
          <p>{answer.text}</p>
          {icon && (
            <div className="absolute top-0 right-0 m-[2px]">
              <IconButton onClick={onClick} size="small">
                <HighlightOffOutlinedIcon fontSize="small" className=" text-red-400" />
              </IconButton>
            </div>
          )}
        </div>
      </Paper>
    </div>
  );
}

