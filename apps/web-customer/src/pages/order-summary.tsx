import { useRouter } from 'next/router';
import React from 'react'

const OrderSum = () => {
    const router = useRouter();
    const { amount, currency, productName, productDescription } = router.query;

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1>Product Details</h1>
            <p>Product Name: {productName}</p>
            <p>Price: {amount} {currency}</p>
            <p>Description: {productDescription}</p>
        </div>
    )
}

export default OrderSum
