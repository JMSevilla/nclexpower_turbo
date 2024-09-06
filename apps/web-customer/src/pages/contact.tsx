import CSPHead from "core-library/components/CSPHead";
import { ContactFormBlock } from "../components/blocks/ContactBlock/ContactFormBlock";
import { ContactHero } from "../components/blocks/ContactBlock/ContactHero";
import { GetServerSideProps } from "next";
import { withCSP } from "core-library";

interface Props {
  generatedNonce: string;
}

 const ContactPage:React.FC<Props> = ({generatedNonce}) => {
  return (
    <div>
      <CSPHead nonce={generatedNonce} />
      <ContactHero />
      <ContactFormBlock />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withCSP();

export default ContactPage