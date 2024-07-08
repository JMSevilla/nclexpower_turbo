import * as Icon from '@mui/icons-material';
import { SvgIconComponent } from '@mui/icons-material';

interface ContactInfoType {
  title: string;
  subTitle: string;
  icon: SvgIconComponent;
}

export const ContactMock: ContactInfoType[] = [
  {
    icon: Icon.Business,
    title: 'Business Address',
    subTitle: 'Example Address 48120, Philippines',
  },
  {
    icon: Icon.AccessTime,
    title: 'Operating Hours',
    subTitle: '8:00 am ~ 12:00pm',
  },
  {
    icon: Icon.Phone,
    title: 'Phone Number',
    subTitle: '09571234921',
  },
  {
    icon: Icon.Email,
    title: 'Email Address',
    subTitle: 'nclexpowerexample@gmail.com',
  }
];
