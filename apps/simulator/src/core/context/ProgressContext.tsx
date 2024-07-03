import React, {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useState
} from 'react'


type ProgressValues = {
    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

const ProgressContext = createContext<ProgressValues>(undefined as any);

export const ProgressProvider: React.FC<React.PropsWithChildren> = ({
    children
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    return (
        <ProgressContext.Provider value={{ isLoading, setIsLoading }}>
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



