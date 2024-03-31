import {
    createContext, useContext
} from 'react'

import { AlertProps, Alert, AlertTitle, Paper } from '@mui/material'

interface Props {
    severity: AlertProps['severity'];
    title: string;
    description?: string | undefined;
}

type AlertContext = {
    AlertMessage(props: Props): React.ReactNode
}

const context = createContext<AlertContext>({} as any)

export const AlertMessageV2Provider: React.FC<React.PropsWithChildren<{}>> = ({
    children
}) => {
    function AlertMessage(props: Props) {
        const { severity, title, description } = props;
        switch(severity){
            case "info":
                return (
                    <Paper elevation={2} style={{margin: "10px 24px 0 24px"}}>
                     <Alert severity={severity}>
                        <AlertTitle>{title}</AlertTitle>
                        {description}
                    </Alert>                       
                    </Paper>

                )
            default:
                return (
                    <Paper elevation={2} style={{margin: "10px 20px 0 20px"}}>
                        <Alert severity={severity}>
                            <AlertTitle>{title}</AlertTitle>
                            {description}
                        </Alert>                        
                    </Paper>
                )
        }
    }

    return (
        <context.Provider value={{
            AlertMessage
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