import { useEffect, useState } from 'react'


type Props = {
    duration: string
    timeRemaining?: string
}

const convertToTimeValue = (time: string = "00:00:00"): number => {
    const [hours = 0, minutes = 0, seconds = 0] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds
};

const convertToTimeString = (countdown: number) => {
    const hours = Math.floor(countdown / 3600);
    const minutes = Math.floor((countdown % 3600) / 60);
    const seconds = countdown % 60;
    return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
};


const getDuration = (timeValue: number, countdown: number) => {
    const duration = timeValue - countdown
    return duration
};

export const useCountdown = ({ duration, timeRemaining }: Props) => {
    const timeValue = convertToTimeValue(duration) ?? 18000
    const [countdown, setCountdown] = useState<number>(timeValue)
    const timeRemain = getDuration(timeValue, countdown)

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (countdown > 0) {
                setCountdown(prevCountdown => prevCountdown - 1);
            }
        }, 1000);


        return () => clearInterval(intervalId)

    }, [countdown])

    return { timeRemaining: convertToTimeString(countdown), duration: convertToTimeString(timeRemain) }
}