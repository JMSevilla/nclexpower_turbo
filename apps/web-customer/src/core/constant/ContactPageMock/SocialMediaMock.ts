import { StaticImageData } from "next/image";
interface Props {
  icon: StaticImageData;
  title: string;
  link: string;
}

import facebook from "../../../assets/contact/facebook.png";
import twitter from "../../../assets/contact/twitter.png";
import instagram from "../../../assets/contact/instagram.png";

export const SocialMediaMock: Props[] = [
  {
    icon: facebook,
    title: "Facebook",
    link: "https://www.facebook.com/",
  },
  {
    icon: twitter,
    title: "Twitter",
    link: "https://www.twitter.com/",
  },
  {
    icon: instagram,
    title: "Instagram",
    link: "https://www.instagram.com/",
  },
]
