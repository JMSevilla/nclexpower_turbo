import { SvgIconComponent } from "@mui/icons-material"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

interface Props{
  icon: SvgIconComponent
}

export const SocialMediaMock: Props[] = [
  {
    icon: FacebookIcon
  },
  {
    icon: InstagramIcon
  },
  {
    icon: XIcon
  },
  {
    icon: LinkedInIcon
  },
]