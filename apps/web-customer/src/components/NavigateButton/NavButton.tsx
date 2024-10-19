import { useRouter } from 'next/router'
import React, { PropsWithChildren } from 'react'

interface Props {
    className?: string
}

export const BackButton: React.FC<PropsWithChildren<Props>> = ({ children, className }) => {
    const router = useRouter()
    return (
        <button className={className} onClick={() => router.back()}>{children}</button>
    )
}
