import React, {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState
} from 'react'


type ProgressValues = {
    progress: number,
    setProgress: Dispatch<SetStateAction<number>>
}

const ProgressContext = createContext<ProgressValues>(undefined as any);


export const ProgressProvider: React.FC<React.PropsWithChildren> = ({
    children
}) => {
    const [progress, setProgress] = useState(10)


    useEffect(() => {
        const intervalId = setInterval(() => {
            if (progress <= 100) {
                setProgress(prev => prev + prev)
                return
            }
            clearInterval(intervalId)
        }, 400);
        return () => clearInterval(intervalId)
    }, [progress])


    return (
        <ProgressContext.Provider value={{ progress, setProgress }}>
            {children}
        </ProgressContext.Provider>
    )

}

export const useProgress = () => {
    if (!ProgressContext) {
        throw new Error("Progress context must used.");
    }
    return useContext(ProgressContext);
};



