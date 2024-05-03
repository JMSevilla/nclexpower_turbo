import { useDrag } from 'react-dnd'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { IconButton } from '@mui/material';
import { useRef } from 'react';
import { DND1WordChoicesUI } from '@/core/types/ssrData';

type Props = {
    item: DND1WordChoicesUI;
    handleRemove: (item: DND1WordChoicesUI) => void;
}

export const UnBlock: React.FC<Props> = ({ item, handleRemove }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'unblock',
        item: item,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))
    drag(ref)
    return (
        <>
            <div ref={ref} className='flex gap-5 justify-between p-2'>
                <h2 className='w-full h-full '>{item?.text}</h2>
                <p className='cursor-pointer'
                    onClick={() => handleRemove(item)}
                >
                    <IconButton>
                        <HighlightOffOutlinedIcon fontSize='small' />
                    </IconButton>
                </p>
            </div>
        </>
    )
}


