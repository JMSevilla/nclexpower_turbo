//import React from "react";
// import { ItemType } from '@/core/types/ssrData'
import { useRef } from 'react'
import { useDrag } from 'react-dnd'

export const Block: React.FC<any> = ({ id, item }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [{ collected, isDragging }, drag] = useDrag(() => ({
        type: 'block',
        item: item,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    drag(ref)
    return (
        <>
            <div
                ref={ref}
                data-id={id}
                className='shadow-md px-2 rounded-md cursor-grab'
                {...collected}
                style={{
                    background: isDragging ? '#86bcea' : '0px',
                }}>
                <h2>{item?.text}</h2>
            </div>
        </>
    )
}


