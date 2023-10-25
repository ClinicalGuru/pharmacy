
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export const Loader = ({ open }) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: 99999 }}
            open={open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}