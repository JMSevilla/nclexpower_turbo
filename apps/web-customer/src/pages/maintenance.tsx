import { MaintenanceBlock } from "../components/blocks/MaintenanceBlock/MaintenanceBlock";
import CSPHead from "core-library/components/CSPHead";
import { GetServerSideProps } from "next";
import { withCSP } from "core-library";

interface Props {
  generatedNonce: string;
}

 const MaintenancePage : React.FC<Props> = ({generatedNonce}) => {
  return (
    <>
    <CSPHead nonce={generatedNonce} />
    <MaintenanceBlock />
  </>
)}

export const getServerSideProps: GetServerSideProps = withCSP();

export default MaintenancePage
