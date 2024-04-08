import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export const CButton = ({ text, variant, buttonHandler = () => { }, type, style = {} }) => {
    return (
        <Stack spacing={2} direction="row">
            <Button style={style} type={type} onClick={buttonHandler} variant={variant}>{text}</Button>
        </Stack>
    );
}