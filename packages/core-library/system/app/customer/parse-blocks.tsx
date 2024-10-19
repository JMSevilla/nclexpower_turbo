/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import withAuth from "../../../core/utils/withAuth";
import { ParseBlocksProps } from "../internal/types";
import { Home } from "./blocks/unauth-page";
// improvement > centralized imports
import { LoginFormBlock } from "./blocks/unauth-page/login";
import { AboutUsBlock } from "./blocks/unauth-page/about-us/AboutUsBlock";
import { ContactUsBlock } from "./blocks/unauth-page/contact-us/ContactUsBlock";

const ParseBlocks: React.FC<ParseBlocksProps> = (props) => {
  const { blocks } = props;
  switch (blocks) {
    case "CustomerLandingPage":
      return <Home />;
    case "CustomerLoginPage":
      return <LoginFormBlock />;
    case "CustomerAboutUsPage":
      return <AboutUsBlock />;
    case "CustomerContactUsPage":
      return <ContactUsBlock />;
    default:
      return null;
  }
};

export default ParseBlocks;
