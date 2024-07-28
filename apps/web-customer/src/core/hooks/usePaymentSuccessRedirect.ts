import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useConfirmedIntent } from 'core-library/contexts/auth/hooks';

export const usePaymentSuccessRedirect = (confirmValue: string | undefined) => {
    const router = useRouter();
    const [, , clearSessionItem] = useConfirmedIntent()

    useEffect(() => {
        if (!router.pathname.includes("payment-success")) {
            clearSessionItem();
        }
    }, [router.pathname]);

    useEffect(() => {
        if (router.pathname.includes("payment-success") && !confirmValue) {
            router.push('/');
        }
    }, [router.pathname, confirmValue, router]);
};

