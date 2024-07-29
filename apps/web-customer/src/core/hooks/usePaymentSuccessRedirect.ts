import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useConfirmedIntent } from 'core-library/contexts/auth/hooks';

export const usePaymentSuccessRedirect = (confirmValue: string | undefined | null) => {
    const router = useRouter();
    const [intentValue, , clearSessionItem] = useConfirmedIntent()

    useEffect(() => {
        if (!router.pathname.includes("payment-success")) {
            clearSessionItem();
        }
    }, [router.pathname]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const finalIntent = urlParams.get('payment_intent');
        if (router.pathname.includes("payment-success") && !confirmValue ||
            router.pathname.includes("payment-success") && finalIntent !== intentValue
        ) {
            router.push('/');
        }
    }, [router.pathname, confirmValue, router]);

};

