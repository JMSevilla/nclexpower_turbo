import * as Icon from '@mui/icons-material';
import { SvgIconComponent } from '@mui/icons-material';

interface ContactInfoType {
  title: string;
  subTitle: string;
  icon: SvgIconComponent;
  socialMediaIcon: SvgIconComponent;
}

export const ContactMock: ContactInfoType[] = [
  {
    icon: Icon.Business,
    title: 'Business Address',
    subTitle: 'Example Address 48120, Philippines',
    socialMediaIcon: Icon.Facebook
  },
  {
    icon: Icon.AccessTime,
    title: 'Operating Hours',
    subTitle: '8:00 am ~ 12:00pm',
    socialMediaIcon: Icon.X
  },
  {
    icon: Icon.Phone,
    title: 'Phone Number',
    subTitle: '09571234921',
    socialMediaIcon: Icon.Instagram
  },
  {
    icon: Icon.Email,
    title: 'Email Address',
    subTitle: 'nclexpowerexample@gmail.com',
    socialMediaIcon: Icon.LinkedIn
  }
];
