import { useExecuteToast } from '@repo/core-library/contexts';
import { useRouter } from 'next/router';


export const toast_msgs = {
    SUCCESS: "Account successfully created",
    ALREADY_EXIST: "Account already exist",
    ERROR: "Oops, Please try again later"
}

export const useAccountSetup = () => {
    const toast = useExecuteToast()
    const router = useRouter()

    const toastMessage = (value: number): string => {
        switch (value) {
            case (200):
                return toast_msgs.SUCCESS
            case (1012):
                return toast_msgs.ALREADY_EXIST
            default:
                return toast_msgs.ERROR
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
