import * as React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export const ArrowTooltips = ({ children, title }) => {
    return (
        <Tooltip title={title} arrow>
            {children}
        </Tooltip>
    );
}