import React, { useRef, useState } from 'react'
import { useDrop } from 'react-dnd'
import { UnBlock } from './UnBlock'
// import { ItemType, WordOneType } from '@/core/types/ssrData'

export const WordOne: React.FC<any> = ({ setAbove, updateBlockList, setBlocklist, placeholder }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [board, setBoard] = useState<any>([])
    const [word, setWord] = useState<boolean>(true)

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'block',
        canDrop: () => word,
        drop: (item: any) => addBlockToBoard(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }), [word])

    const addBlockToBoard = (item: any) => {
        setWord(false)


        setBoard([item])
        setAbove([item])
        setBlocklist((prev: any) => [...prev, item])

        updateBlockList(item)
    }


    const handleRemove = (item: any, status: string) => {
        setWord(true)
        if (status == 'One') {
            setBoard([])
        }
        setBlocklist((prev: any) => [...prev, item])
    }

    drop(ref)

    return (
        <div
            className='shadow-md  h-fit w-fit min-w-[150px] rounded-md'
            ref={ref}
            style={{ background: isOver && word ? '#86bcea' : 'none' }}>
            {board.length > 0 ? board.map((item: any) => {
                return (
                    <UnBlock
                        item={item}
                        key={`unblock-${item?.id}`
                        }
                        id={item?.id}
                        name={item?.name}
                        status='One'
                        handleRemove={handleRemove}
                    />
                )
            }) :
                <p className='mt-2'>
                    {placeholder}
                </p>}
        </div>
    )
}

