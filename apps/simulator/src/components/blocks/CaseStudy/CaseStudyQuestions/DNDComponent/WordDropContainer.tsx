import React, { useEffect, useRef, useState } from 'react'
import { UnBlock } from './UnBlock'
import { useDrop } from 'react-dnd'
import { DND1WordChoicesUI } from '@/core/types/ssrData'


type Props = {
    placeholder: string;
    name: string;
    setWord: (items: DND1WordChoicesUI[]) => void;
    onDelete: (item: DND1WordChoicesUI) => void;
    onDropped: (item: DND1WordChoicesUI) => void;
}

export const WordDropContainer: React.FC<Props> = ({ placeholder, name, onDropped, ...rest }) => {
    const { onDelete, setWord } = rest

    const ref = useRef<HTMLDivElement>(null)
    const [item, setItem] = useState<DND1WordChoicesUI | null>()

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "block",
        canDrop: () => !item,
        drop: (item: DND1WordChoicesUI) => handleDropped(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }), [item])

    const handleDropped = (item: DND1WordChoicesUI) => {
        setItem(item)
        setWord([item])
    }

    useEffect(() => {
        if (item) {
            onDropped(item)
        }
    }, [item])

    drop(ref)

    const handleRemove = (item: DND1WordChoicesUI) => {
        setItem(null)
        setWord([])
        onDelete(item)
    }


    return (
        <div
            className='shadow-md  h-fit w-fit min-w-[150px] rounded-md'
            ref={ref}
            style={{ background: isOver && !item ? '#86bcea' : 'none' }}>
            {item ?
                <UnBlock handleRemove={handleRemove} item={item} />
                :
                <p className='mt-2'>{placeholder}</p>}
        </div>
    )
}

