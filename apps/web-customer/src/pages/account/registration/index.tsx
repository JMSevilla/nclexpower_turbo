/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import CSPHead from "core-library/components/CSPHead";
import { GetServerSideProps } from "next";
import { withCSP } from "core-library";
import { RegistrationBlock } from "../../../components/blocks/RegistrationBlock/RegistrationBlock";

interface Props {
  generatedNonce: string;
}

 const RegistrationPage:React.FC<Props> = ({generatedNonce})=> {
  return (
    <>
      <CSPHead nonce={generatedNonce} />
      <RegistrationBlock/>
    </>
);
}

export const getServerSideProps: GetServerSideProps = withCSP();

export default RegistrationPage;