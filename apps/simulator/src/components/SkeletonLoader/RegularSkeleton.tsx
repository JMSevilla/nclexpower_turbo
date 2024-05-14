import { AnimatedBoxSkeleton } from './AnimatedBoxSkeleton'

export const RegularSkeletonLoader = () => {
    return (
        <div className='w-full h-full flex flex-col pt-5'>
            <AnimatedBoxSkeleton height={500} />
        </div>
    )
}
