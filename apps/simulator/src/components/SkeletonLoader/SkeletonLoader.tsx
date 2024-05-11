import { Fade, Skeleton } from '@mui/material'

type QuestionType = {
    QType: string
}

export const SkeletonLoader: React.FC<QuestionType> = ({ QType }) => {
    switch (QType) {
        case "RegularQuestion":
            return <Fade in>
                <div className='w-full h-full flex flex-col'>
                    <Skeleton height={100} />
                    <Skeleton variant='rectangular' height={300} />

                </div>
            </Fade>
        case "CaseStudy":
            return <Fade in>
                <div className='w-full h-full flex flex-col'>
                    <div className='w-full'>
                        <Skeleton variant='rectangular' height={70} />
                    </div>
                    <div className='w-full flex gap-10'>
                        <div className='w-1/2'>
                            <Skeleton height={100} />
                            <Skeleton variant='rectangular' height={300} />
                        </div>
                        <div className='w-1/2'>
                            <Skeleton height={100} />
                            <Skeleton variant='rectangular' height={300} />
                        </div>
                    </div>

                </div>
            </Fade>
    }
}