import {
    createContext, useContext
} from 'react'

import { AlertProps, Alert, AlertTitle } from '@mui/material'

interface Props {
    severity: AlertProps['severity'];
    title: string;
    description?: string | undefined
}

type AlertContext = {
    alertMessage(props: Props): void
}

const context = createContext<AlertContext>({} as any)

export const AlertMessageV2Provider: React.FC<React.PropsWithChildren<{}>> = ({
    children
}) => {
    function alertMessage(props: Props) {
        const { severity, title, description } = props;
        switch(severity){
            case "info":
                return (
                    <Alert severity={severity}>
                        <AlertTitle>{title}</AlertTitle>
                        {description}
                    </Alert>
                )
            default:
                return (
                    <Alert severity={severity}>
                        <AlertTitle>{title}</AlertTitle>
                        {description}
                    </Alert>
                )
        }
    }

    return (
        <context.Provider value={{
            alertMessage
        }}>{children}</context.Provider>
    )
}

export const useAlertMessageV2 = () => {
    if(!context) {
        throw new Error("AlertMessageV2Provider must used.")
    }
    return useContext(context)
}

/**
 * Question lorem ipsumrngeorjnbkernbkrenb [[select:field:key]] egnjkwrngjwrnknrkjbnejkr
 */

/**
 * Question > lorem weiognwroengjrnjrbjr
 * correct > wekgnweknrjkbnkrjenb
 */