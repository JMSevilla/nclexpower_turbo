import { DND1WordChoicesUI } from '@/core/types/ssrData'
import { useRef } from 'react'
import { useDrag } from 'react-dnd'

type Props = {
    id: number;
    item: DND1WordChoicesUI;
}


export const DraggableWord: React.FC<Props> = ({ id, item }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'block',
        item: item,
        collect: (monitor) => (
            { isDragging: monitor.isDragging() }
        ),
    }))

    drag(ref)

    return (
        <>
            <div
                ref={ref}
                data-id={id}
                className='shadow-md px-2 rounded-md cursor-grab'
                style={{
                    background: isDragging ? '#86bcea' : '0px',
                }}>
                <h2>{item?.text}</h2>
            </div>
        </>
    )
}


