import React from 'react';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import { CustomDialog, CustomDialogProps } from './CustomDialog';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

export const UnauthorizedDialog: React.FC<CustomDialogProps> = ({ open }) => {

  const router = useRouter();
  const { handleSubmit } = useForm();

  const onSubmit = () => {
    router.push({
      pathname: '/',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomDialog
        open={open}
        aria-labelledby="responsive-dialog-title"
        icon={<GppMaybeIcon fontSize='large' />}
        title={'Unauthorized'}
        className='unauthorized'
        contentText={'Access token was not present, you are accessing the simulator unauthorized.'}
        button={
          <Button
            endIcon={<KeyboardReturnIcon />}
            variant="outlined"
            autoFocus
            fullWidth
            sx={{ height: 60, color: '#B21E35' }}
            onClick={handleSubmit(onSubmit)} >
            Back to Access Page
          </Button>
        }
      />
    </form>
  );
};