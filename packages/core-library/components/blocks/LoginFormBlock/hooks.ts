import { useEffect } from 'react'
import { useApiCallback } from '../../../hooks'
import { LoginFormType } from './validation'

export const useLogin = () => {
    const loginAccount = useApiCallback(async (api, data: LoginFormType) => await api.web.backofficeLogin(data))

    useEffect(() => {
        if (loginAccount?.result?.data == null) {
            console.log("Login Status : Login Failed")
        }
    }, [loginAccount.error, loginAccount.result?.data])

    return { loginAccount }
}