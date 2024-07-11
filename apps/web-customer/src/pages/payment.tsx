import React from 'react'
import { useStripeContext } from 'core-library/contexts'


export default function Payment() {
    const { clientSecret, orderNumber, paymentIntentId } = useStripeContext()

    console.log(clientSecret)
    console.log(orderNumber)
    console.log(paymentIntentId)

    return (
        <div>
            Payment
        </div>
    )
}
