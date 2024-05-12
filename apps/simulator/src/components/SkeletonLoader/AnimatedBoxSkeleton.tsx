import { Skeleton } from '@mui/material'
import React from 'react'

type QuestionType = {
    height: number
    variant?: "text" | "rectangular" | "rounded" | "circular" //MUI Only accepts these strings as variant
}

const AnimatedBoxSkeleton: React.FC<QuestionType> = ({ height, variant }) => {
    return (
        <div className='w-full h-full flex flex-col pt-5'>
            <Skeleton variant={variant} height={height} className='rounded-lg' />
        </div>
    )
}
export const RegularSkeletonLoader: React.FC = () => {
    return (
        <div className='w-full h-full flex flex-col pt-5'>
            <AnimatedBoxSkeleton variant='rectangular' height={500} />
        </div>
    )
}

export const CaseStudySkeletonLoader: React.FC = () => {
    return (
        <div className='w-full h-full flex flex-col'>
            <div className='w-full'>
                <AnimatedBoxSkeleton variant='rectangular' height={70} />
            </div>
            <div className='w-full flex gap-10'>
                <div className='w-1/2 h-fit'>
                    <AnimatedBoxSkeleton height={100} />
                    <AnimatedBoxSkeleton variant='rectangular' height={300} />
                </div>
                <div className='w-1/2 h-fit'>
                    <AnimatedBoxSkeleton height={100} />
                    <AnimatedBoxSkeleton variant='rectangular' height={300} />
                </div>
            </div>
        </div>
    )
}



