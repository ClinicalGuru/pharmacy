import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import { useForm } from "react-hook-form";
import { FORM_LABELS } from "../../../Constants/index";
import { Box } from "@mui/material";
import { ErrorMessage, } from "./AddVendor.styles";
import TextField from '@mui/material/TextField';


export const AddVendor = ({ showModal, action }) => {
    const {
        register: vendorDetails,
        handleSubmit: handleVendorDetails,
        formState: { errors: vendorDetailsErrors },
    } = useForm();
    const handleClose = () => {
        action(!showModal);
    };
    const onSubmitVendorDetails = (data) => {
        // console.log(data, "vendors");
    }
    return (
        <Box>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={showModal}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Add New Vendor
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
                    <form onSubmit={handleVendorDetails(onSubmitVendorDetails)}>
                        <Box sx={{
                            display: 'flex',
                            flexWrap: "wrap",
                            justifyContent: "space-between"
                        }}>
                            <div>
                                <TextField id="outlined-basic" label={FORM_LABELS.VENDOR_NAME} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                                {vendorDetailsErrors.vendorName?.type === "required" && (
                                    <ErrorMessage role="alert">{FORM_LABELS.VENDOR_NAME}  is required</ErrorMessage>
                                )}
                            </div>
                            <div>
                                <TextField id="outlined-basic" label={FORM_LABELS.GST} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                                {vendorDetailsErrors.gst?.type === "required" && (
                                    <ErrorMessage role="alert">{FORM_LABELS.GST}  is required</ErrorMessage>
                                )}
                            </div>
                            <div>
                                <TextField id="outlined-basic" label={FORM_LABELS.EMAIL} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                                {vendorDetailsErrors.email?.type === "required" && (
                                    <ErrorMessage role="alert">{FORM_LABELS.EMAIL}  is required</ErrorMessage>
                                )}
                            </div>
                            <div>
                                <TextField id="outlined-basic" label={FORM_LABELS.PHONE} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                                {vendorDetailsErrors.phone?.type === "required" && (
                                    <ErrorMessage role="alert">{FORM_LABELS.PHONE}  is required</ErrorMessage>
                                )}
                            </div>
                            <div>
                                <TextField id="outlined-basic" label={FORM_LABELS.ADDRESS} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                                {vendorDetailsErrors.address?.type === "required" && (
                                    <ErrorMessage role="alert">{FORM_LABELS.ADDRESS}  is required</ErrorMessage>
                                )}
                            </div>
                        </Box>
                    </form>

                </DialogContent>
                <DialogActions>
                    <Box sx={{ display: 'flex' }}>
                        <input type="submit" value={`+ Add`} />
                        <input type="reset" value={`Clear`} />
                    </Box>
                </DialogActions>
            </Dialog>
        </Box>
    )
}