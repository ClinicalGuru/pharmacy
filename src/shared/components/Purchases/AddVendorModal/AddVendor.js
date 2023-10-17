import { useState } from 'react';
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
import PurchaseService from "../../../services/Purchase.service";
import { Loader } from "../../../components/Loader";


export const AddVendor = ({ showModal, action }) => {
    const [open, setOpen] = useState(false);
    const {
        register: vendorDetails,
        handleSubmit: handleVendorDetails,
        formState: { errors: vendorDetailsErrors },
    } = useForm();
    const handleClose = () => {
        action(!showModal);
    };
    const resetForm = () => {
        action(!showModal);
    }
    const onSubmitVendorDetails = async (data) => {
        setOpen(true);
        try {
            setOpen(false);
            await PurchaseService.addVendor(data);
            action(!showModal);
        } catch (e) {
            setOpen(false);
            console.log(e, 'error')
        }
    };
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
                <form onSubmit={handleVendorDetails(onSubmitVendorDetails)} onReset={resetForm}>
                    <DialogContent dividers>
                        <Box sx={{
                            display: 'flex',
                            flexWrap: "wrap",
                            justifyContent: "space-between"
                        }}>
                            <div>
                                <TextField error={vendorDetailsErrors.vendorName?.type === "required"} id="outlined-basic"  {...vendorDetails("vendorName", { required: true })} label={FORM_LABELS.VENDOR_NAME} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                            </div>
                            <div>
                                <TextField error={vendorDetailsErrors.gst?.type === "required"} id="outlined-basic"  {...vendorDetails("gst", { required: true })} label={FORM_LABELS.GST} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                            </div>
                            <div>
                                <TextField error={vendorDetailsErrors.vendorName?.type === "required"} id="outlined-basic"  {...vendorDetails("email", { required: true })} label={FORM_LABELS.EMAIL} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                            </div>
                            <div>
                                <TextField error={vendorDetailsErrors.phone?.type === "required"} id="outlined-basic"  {...vendorDetails("phone", { required: true })} label={FORM_LABELS.PHONE} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                            </div>
                            <div>
                                <TextField error={vendorDetailsErrors.address?.type === "required"} id="outlined-basic"  {...vendorDetails("address", { required: true })} label={FORM_LABELS.ADDRESS} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                            </div>
                        </Box>

                    </DialogContent>
                    <DialogActions>
                        <Box sx={{ display: 'flex' }}>
                            <input type="submit" value={`+ Add`} />
                            <input type="reset" value={`Close`} />
                        </Box>
                    </DialogActions>
                </form>
            </Dialog>
            <Loader open={open} />
        </Box>

    )
}