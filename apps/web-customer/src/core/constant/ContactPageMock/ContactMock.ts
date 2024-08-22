import { StaticImageData } from "next/image";
interface Props {
  icon: StaticImageData;
  title: string;
  subTitle: string;
}

import location from "../../../assets/contact/location.png";
import mail from "../../../assets/contact/mail.png";
import phone from "../../../assets/contact/phone.png";

export const ContactMock: Props[] = [
  {
    icon: location,
    title: "Location",
    subTitle: "1700 Eureka Rd Ste 155 Roseville, California 95661"
  },
  {
    icon: phone,
    title: "Contact Number",
    subTitle: "1-866-800-3030",
  },
  {
    icon: mail,
    title: "Email Address",
    subTitle: "info@nclexpower.com",
  },
]