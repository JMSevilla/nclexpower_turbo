import { accountSetupToast } from '@/core/constant/accountSetupToast';
import { useExecuteToast } from '@repo/core-library/contexts';
import { useRouter } from 'next/router';

export const useAccountSetup = () => {
    const toast = useExecuteToast()
    const router = useRouter()

    const toastMessage = (value: number): string => {
        switch (value) {
            case (200):
                return accountSetupToast.SUCCESS
            case (1012):
                return accountSetupToast.ALREADY_EXIST
            default:
                return accountSetupToast.ERROR
        }
    }

    const processAccountSetup = (value: number) => {
        const message = toastMessage(value)

        if (message) {
            toast.executeToast(message, 'top-right', false, {
                toastId: 0
            })

            if (value === 200 || value === 1012) {
                setTimeout(() => { router.push({ pathname: '/login' }) }, 3000)
            }
        }
    }

    return { processAccountSetup }
};
