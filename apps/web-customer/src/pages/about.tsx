import { AboutUsBlock } from '@/components/blocks/AboutUsBlock/AboutUsBlock'
import { withCSP } from 'core-library';
import CSPHead from 'core-library/components/CSPHead';
import { GetServerSideProps } from 'next';
import React from 'react'

interface Props {
  generatedNonce: string;
}

const AboutUs:React.FC<Props> = ({generatedNonce}) => {
  return (
  <>
    <CSPHead nonce={generatedNonce} />
    <AboutUsBlock/>
  </>
)
}

export const getServerSideProps: GetServerSideProps = withCSP();

export default AboutUs;
