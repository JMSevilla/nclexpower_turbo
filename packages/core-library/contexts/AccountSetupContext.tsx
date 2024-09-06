import React, { createContext, useContext, useEffect, useState } from 'react'
import { useApiCallback } from '../hooks';
import { useRouter } from '../core';

const context = createContext<{ accountExist: boolean | undefined }>(undefined as any);

export const AccountSetupContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [accountExist, setIsAccountExisting] = useState<boolean | undefined>(undefined)
    const router = useRouter()

    const accountSetupCb = useApiCallback((api) =>
        api.webbackoffice.shouldDoAccountSetup()
    );

    useEffect(() => {
        async function accountSetup(url: string) {
            const executeSetup = await accountSetupCb.execute()
            const isAccountExist = executeSetup.data
            setIsAccountExisting(isAccountExist)

            if (url !== '/account_setup' && !isAccountExist) {
                router.replace((route) => route.account_setup)
            }
            else if (isAccountExist && url === '/account_setup') {
                router.replace((route) => route.login)
            }
        }

        if (accountExist !== undefined) return;
        accountSetup(router.asPath)
    }, [accountExist])

    return (
        <context.Provider value={{ accountExist }}>
            {children}
        </context.Provider>
    )
}

export const useAccountSetup = () => {
    if (!context) {
        throw new Error("Account Setup Context Provide should be used.")
    }
    return useContext(context)
}