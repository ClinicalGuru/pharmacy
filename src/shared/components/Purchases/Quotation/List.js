import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';

export const List = ({ showModal, action, requisitions, getRequisitionId }) => {
    console.log(requisitions, 'requisitions./')
    const handleClose = () => {
        action(!showModal);
    };
    const requisitionHandler = (id) => {
        // console.log(id, 'id')
        getRequisitionId(id);
        action(!showModal);
    }

    const noDataAvailable = () => {
        const isFound = requisitions?.findIndex((item) => item.status === "created");
        if (isFound === -1) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <Box>
            <Dialog
                fullWidth={true}
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
                        {requisitions?.length > 0 &&
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
                                    {requisitions?.filter(item => item.status === "created").map((item, i) => {
                                        return (
                                            <tr>
                                                <th scope="row">{i + 1}</th>
                                                <td>{item?.vendorName}</td>
                                                <td>{item?.date}</td>
                                                <td>{item?.status}</td>
                                                <td><span style={{ cursor: 'pointer' }} onClick={() => requisitionHandler(item?.requesitionId)}>Get Details</span></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        }
                        {
                            noDataAvailable() && <Box sx={{
                                textAlign: "center",
                                padding: "1rem 0"
                            }} >No requisitions available for the selected Vendor</Box>
                        }
                    </Box>}
                </DialogContent>
            </Dialog>
        </Box>
    )
}