import { withCSP } from 'core-library';
import CSPHead from 'core-library/components/CSPHead';
import withAuth from 'core-library/core/utils/withAuth'
import { GetServerSideProps } from 'next';
import React from 'react'

interface Props {
    generatedNonce: string;
 }

const HubOverview: React.FC<Props> = ({generatedNonce}) => {
    return (
        <>
        <CSPHead nonce={generatedNonce} />
        <div className='flex grow bg-slate-500 items-center justify-center h-screen'>
            Web Customer Hub
        </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = withCSP();

export default withAuth(HubOverview)
