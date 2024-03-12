import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export const AlertMessage = ({ type, title, message }) => {
    return (
        <Stack sx={{ width: '80%', margin: "4rem auto" }} spacing={2}>
            <Alert severity={type}>
                <AlertTitle>{title}</AlertTitle>
                {message}
            </Alert>
        </Stack>
    );
}