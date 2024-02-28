import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const Notification = ({ type, message, notificationState, action }) => {
    // const [open, setOpen] = React.useState(false);

    // const handleClose = () => {
    //     setOpen(false);
    // };
    // const handleClick = () => {
    //     setOpen(true);
    // };
    return (
        <>
            <Snackbar open={action} autoHideDuration={3000} onClose={action}>
                <Alert
                    onClose={action}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </>);
}
