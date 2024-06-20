import { useEffect } from 'react'
import { useApiCallback } from '../../../hooks'
import { AccountSetupType } from './validation'

export const useAccountSetup = () => {
    const createAccount = useApiCallback(async (api, data: AccountSetupType) => await api.web.createAccount(data))

    useEffect(() => {
        if (createAccount.error) {
            console.error("accounterror", createAccount.error)
        }

        if (createAccount.result?.data === 1012) {
            console.log("Account Already Exist")
        }

    }, [createAccount.error, createAccount.result?.data])



    return { createAccount }
}