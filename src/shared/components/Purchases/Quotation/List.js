import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';

export const List = ({ showModal, action, requisitions, getRequisitionId }) => {
    console.log(requisitions, 'requisitions./')
    const handleClose = () => {
        action(!showModal);
    };
    const requisitionHandler = (id) => {
        console.log(id, 'id')
        getRequisitionId(id);
        action(!showModal);
    }
    return (
        <Box>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={showModal}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Purchage requisitions
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    {<Box
                        component="div"
                    >
                        {
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Vendor Name</th>
                                        <th scope="col">Ordered Date</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requisitions?.map((item, i) => {
                                        return (
                                            <tr>
                                                <th scope="row">{i + 1}</th>
                                                <td>{item?.vendorName}</td>
                                                <td>{item?.date}</td>
                                                <td>{item?.status}</td>
                                                <td><a onClick={() => requisitionHandler(item?.requesitionId)}>Get Details</a></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        }
                    </Box>}
                </DialogContent>
            </Dialog>
        </Box>
    )
}