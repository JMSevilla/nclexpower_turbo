import React, { useRef, useState } from 'react'
import { UnBlock } from './UnBlock'
import { useDrop } from 'react-dnd'
// import { ItemType, WordOneType } from '@/core/types/ssrData'

export const WordTwo: React.FC<any> = ({ setBelow, updateBlockList, setBlocklist, placeholder }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [board, setBoard] = useState<any>([])
    const [word, setWord] = useState<boolean>(true)

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'block',
        canDrop: () => word,
        drop: (item) => addBlockToBoard(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }), [word])
    //console.log("isOver: ", isOver);
    const addBlockToBoard = (item: any) => {
        setWord(false)
        setBoard([item])
        setBelow([item])
        updateBlockList(item)
    }

    const handleRemove = (item: any, status: string) => {
        setWord(true)
        if (status == 'Two') {
            setBoard([])
        }
        setBlocklist((prev: any) => [...prev, item])
    }

    drop(ref)

    return (
        <div
            className='shadow-md  h-fit w-fit min-w-[150px] rounded-md '
            ref={ref}
            style={{ background: isOver && word ? '#86bcea' : 'none' }}>
            {board.length > 0 ? board.map((item: any) => {
                return (
                    <UnBlock
                        item={item}
                        key={`unblock-${item?.id}`}
                        id={item?.id}
                        name={item?.name}
                        status='Two'
                        handleRemove={handleRemove}
                    />
                )
            }) :
                <p className='mt-2'>
                    {placeholder}
                </p>
            }
        </div>
    )
}