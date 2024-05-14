import { Skeleton } from '@mui/material'
import React from 'react'

type QuestionType = {
    height: number
}

export const AnimatedBoxSkeleton: React.FC<QuestionType> = ({ height }) => {
    return (
        <div className='w-full h-full flex flex-col pt-5'>
            <Skeleton variant="rectangular" height={height} className='rounded-lg' />
        </div>
    )
}


