import { StaticImageData } from "next/image";
interface Props {
  icon: StaticImageData;
  title: string;
  link: string;
}

import {
  ContactFacebook,
  ContactTwitter,
  ContactInstagram,
  ContactLocation,
  ContactMail,
  ContactPhone,
} from "../../../../../../assets";

export const SocialMediaMock: Props[] = [
  {
    icon: ContactFacebook,
    title: "Facebook",
    link: "https://www.facebook.com/",
  },
  {
    icon: ContactTwitter,
    title: "Twitter",
    link: "https://www.twitter.com/",
  },
  {
    icon: ContactInstagram,
    title: "Instagram",
    link: "https://www.instagram.com/",
  },
];

interface ContactProps {
  icon: StaticImageData;
  title: string;
  subTitle: string;
}

export const ContactMock: ContactProps[] = [
  {
    icon: ContactLocation,
    title: "Location",
    subTitle: "1700 Eureka Rd Ste 155 <br/> Roseville, California 95661",
  },
  {
    icon: ContactPhone,
    title: "Contact Number",
    subTitle: "1-866-800-3030",
  },
  {
    icon: ContactMail,
    title: "Email Address",
    subTitle: "info@nclexpower.com",
  },
];
