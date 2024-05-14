import { AnimatedBoxSkeleton } from './AnimatedBoxSkeleton'

export const CaseStudySkeletonLoader = () => {
    return (
        <div className='w-full h-full flex flex-col'>
            <div className='w-full'>
                <AnimatedBoxSkeleton height={70} />
            </div>
            <div className='w-full flex gap-10'>
                <div className='w-1/2 h-fit'>
                    <AnimatedBoxSkeleton height={100} />
                    <AnimatedBoxSkeleton height={300} />
                </div>
                <div className='w-1/2 h-fit'>
                    <AnimatedBoxSkeleton height={100} />
                    <AnimatedBoxSkeleton height={300} />
                </div>
            </div>
        </div>
    )
}


