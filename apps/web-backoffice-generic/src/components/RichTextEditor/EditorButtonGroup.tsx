
import { Box, IconButton } from '@mui/material';
import { MenuButtonType } from '../../core/types/editor-type';
import React from 'react';



export const EditorButtonGroup = ({ menus }: { menus: MenuButtonType[] }) => {
    return menus.map((button, index) =>
        <Box key={index} sx={{ backgroundColor: button.isActive ? 'purple' : '' }} borderRadius='5px'  >
            <IconButton sx={{
                color: button.isActive ? 'white' : '#333',
                height: '30px',
                fontSize: '12px',
            }}
                onClick={button.onClick}
                disabled={button.disabled} >
                {button.icon ?? button.label}
            </IconButton>
        </Box>
    )
}