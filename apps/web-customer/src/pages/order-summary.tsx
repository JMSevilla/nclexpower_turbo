import React from 'react'
import { OrderSummaryBlock } from '../components/blocks';
import CSPHead from 'core-library/components/CSPHead';
import { GetServerSideProps } from 'next';
import { withCSP } from 'core-library';

interface Props {
    generatedNonce: string;
  }

 const OrderSummary:React.FC<Props> = ({generatedNonce}) => {
    return (
    <>
    <CSPHead nonce={generatedNonce} />
    <OrderSummaryBlock />
    </>
)}

export const getServerSideProps: GetServerSideProps = withCSP();

export default OrderSummary
