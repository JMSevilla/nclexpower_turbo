/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import {
  AboutUsBanner,
  CarouselOne,
  CarouselThree,
  CarouselTwo,
  ContactUsBanner,
  CoreZigmaLogo,
  CroppedCoreZigma,
  FlipCardOne,
  FlipCardOneBack,
  FlipCardThree,
  FlipCardThreeBack,
  FlipCardTwo,
  FlipCardTwoBack,
  LoginBG,
  NCLEXBlueLogo,
  NCLEXYellowLogo,
  PNBackground,
  PracticeTest,
  RNBackground,
  StudyCards,
  TransparentCoreZigma,
  WatchVideos,
} from "../../../../../../../../../../assets";

type CardDataType = {
  title: string;
  bgColor: string;
  imgSrc: string | StaticImport;
  imgAlt: string;
  imgStyle?: React.CSSProperties; // Optional, as imgStyle might not be present in all objects
};

export interface imageCollectionType {
  id: number;
  title: string;
  content: Content[];
}

interface Content {
  category: string;
  fixedCount: number;
  list: List[];
}

export interface List {
  title: string;
  image: string;
}

export const LogoData: CardDataType[] = [
  {
    title: "Dark Logo",
    bgColor: "#404040",
    imgSrc: NCLEXYellowLogo,
    imgAlt: "NCLEXYellowLogo",
  },
  {
    title: "White Logo",
    bgColor: "#ffffff",
    imgSrc: NCLEXBlueLogo,
    imgAlt: "NCLEXBlueLogo",
  },
  {
    title: "Core Zigma Logo",
    bgColor: "#ffffff",
    imgSrc: CoreZigmaLogo,
    imgAlt: "CoreZigmaLogo",
    imgStyle: { height: "70px", width: "70px" },
  },
];

export const cardItems = [
  { title: "Image Gallery", content: "Images" },
  { title: "Web Customer", content: "Web Customer" },
  // { title: "Web Backoffice", content: "Web Backoffice" }, // This is for preparation if Backoffice will also have an Image
];

export const WCGenericRouteWithImages: imageCollectionType[] = [
  {
    id: 1,
    title: "Homepage",
    content: [
      {
        category: "Revo Banner",
        fixedCount: 0,
        list: [
          {
            title: "Carousel 1",
            image: CarouselOne,
          },
          {
            title: "Carousel 2",
            image: CarouselTwo,
          },
          {
            title: "Carousel 3",
            image: CarouselThree,
          },
        ],
      },
      {
        category: "Core Zigma Flippable Cards",
        fixedCount: 0,
        list: [
          {
            title: "Flip Card Front 1",
            image: FlipCardOne,
          },
          {
            title: "Flip Card Back 1",
            image: FlipCardOneBack,
          },
          {
            title: "Flip Card Front 2",
            image: FlipCardTwo,
          },
          {
            title: "Flip Card Back 2",
            image: FlipCardTwoBack,
          },
          {
            title: "Flip Card Front 3",
            image: FlipCardThree,
          },
          {
            title: "Flip Card Back 3",
            image: FlipCardThreeBack,
          },
        ],
      },
      {
        category: "How It Works Card",
        fixedCount: 0,
        list: [
          {
            title: "Card 1",
            image: WatchVideos,
          },
          {
            title: "Card 2",
            image: StudyCards,
          },
          {
            title: "Card 3",
            image: PracticeTest,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "About Us",
    content: [
      {
        category: "Hero Banner",
        fixedCount: 1,
        list: [
          {
            title: "About Us Banner",
            image: AboutUsBanner,
          },
        ],
      },
      {
        category: "FAQ Background Image",
        fixedCount: 1,
        list: [
          {
            title: "Background One",
            image: CroppedCoreZigma,
          },
          {
            title: "Background Two",
            image: TransparentCoreZigma,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Contact",
    content: [
      {
        category: "Hero Banner",
        fixedCount: 1,
        list: [
          {
            title: "Contact Us Banner",
            image: ContactUsBanner,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Login",
    content: [
      {
        category: "Left Panel Image",
        fixedCount: 1,
        list: [
          {
            title: "Login Image",
            image: LoginBG,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Payment Checkout",
    content: [
      {
        category: "Background Image",
        fixedCount: 1,
        list: [
          {
            title: "PN Background",
            image: RNBackground,
          },
          {
            title: "RN Background",
            image: PNBackground,
          },
        ],
      },
    ],
  },
];
