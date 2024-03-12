import { useState, useEffect, useContext } from 'react';
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
import { RefreshVendorsDetailsContext } from "../../../../context/RefreshVendorDetailsContext";

export const AddVendor = ({ showModal, action }) => {
    const { setRefreshVDetails } = useContext(RefreshVendorsDetailsContext);
    const [open, setOpen] = useState(false);
    const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
    const {
        register: vendorDetails,
        handleSubmit: handleVendorDetails,
        formState: { errors: vendorDetailsErrors },
        reset
    } = useForm();
    const handleClose = () => {
        action(!showModal);
        reset();
    };
    const resetForm = () => {
        action(!showModal);
        reset();
    }
    const onSubmitVendorDetails = async (data) => {
        // data.preventDefault();
        setOpen(true);
        try {
            setOpen(false);
            await PurchaseService.addVendor(data);
            action(!showModal);
            reset();
            setRefreshVDetails(true);
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
                    New Vendor
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
                                <TextField error={vendorDetailsErrors.vendorName?.type === "required"} id="outlined-basic"  {...vendorDetails("name", { required: true })} label={FORM_LABELS.VENDOR_NAME} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                            </div>
                            <div>
                                <TextField error={vendorDetailsErrors.gst?.type === "required"} id="outlined-basic"  {...vendorDetails("gst", { required: true })} label={FORM_LABELS.GST} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                            </div>
                            <div>
                                <TextField error={vendorDetailsErrors.vendorName?.type === "required"} id="outlined-basic"  {...vendorDetails("email", { required: true })} label={FORM_LABELS.EMAIL} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                            </div>
                            <div>
                                <TextField type='number' error={vendorDetailsErrors.phone?.type === "required"} id="outlined-basic"
                                    {...vendorDetails("phone", { required: true, max: 10 })} label={FORM_LABELS.PHONE} variant="outlined"
                                    size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                            </div>
                            <div>
                                <TextField error={vendorDetailsErrors.address?.type === "required"} id="outlined-basic"  {...vendorDetails("address", { required: true })} label={FORM_LABELS.ADDRESS} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                            </div>
                        </Box>

                    </DialogContent>
                    <DialogActions>
                        <Box sx={{ display: 'flex' }}>
                            <input type="submit" value={`+ Add`} style={{ marginRight: '15px' }} />
                            <input type="reset" value={`Close`} />
                        </Box>
                    </DialogActions>
                </form>
            </Dialog>
            <Loader open={open} />
        </Box>

    )
}