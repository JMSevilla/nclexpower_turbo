import { styled } from '@mui/system';
import { TiltDividerShape } from '../Icons/TiltDividerShape';

const CustomTiltDivider = styled('div')({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  overflow: 'hidden',
  lineHeight: 0,
  transform: 'rotate(180deg)',
  '& svg': {
    position: 'relative',
    display: 'block',
    width: 'calc(100% + 1.3px)',
    height: '250px',
  },
  '& .shape-fill': {
    fill: '#FFFFFF',
  },
});

export const TiltDivider = () => (
  <CustomTiltDivider>
    <TiltDividerShape />
  </CustomTiltDivider>
);

