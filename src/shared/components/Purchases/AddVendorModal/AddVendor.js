import { useState, useContext } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import { useForm } from "react-hook-form";
import { FORM_LABELS } from "../../../Constants/index";
import { Box } from "@mui/material";
import { Input } from "./AddVendor.styles";
import PurchaseService from "../../../services/Purchase.service";
import { Loader } from "../../../components/Loader";
import { RefreshVendorsDetailsContext } from "../../../../context/RefreshVendorDetailsContext";
import { CButton } from '../../Button/index';
import TextField from '@mui/material/TextField';
import useLocalStorage from "../../../../hooks/UseLocalstorage";

export const AddVendor = ({ showModal, action }) => {
    const [pharmacyId] = useLocalStorage('pharmacyId');
    const { setRefreshVDetails } = useContext(RefreshVendorsDetailsContext);
    const [open, setOpen] = useState(false);
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
            await PurchaseService.addVendor({ ...data, pharmacyId: pharmacyId });
            action(!showModal);
            reset();
            setRefreshVDetails(true);
        } catch (e) {
            setOpen(false);
            console.log(e, 'error')
        }
    };
    const buttonHandler = () => {
        onSubmitVendorDetails();
    }
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
                        <Box sx={{ display: 'flex', marginBottom: '1rem' }}>
                            <div style={{ marginRight: '1rem' }}>
                                <div style={{ marginBottom: '10px' }}>
                                    <label>Vendor Name</label>
                                    <Input error={vendorDetailsErrors.vendorName?.type === "required"} id="outlined-basic"  {...vendorDetails("name", { required: true })} label={FORM_LABELS.VENDOR_NAME} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    <label>GST</label>
                                    <Input error={vendorDetailsErrors.gst?.type === "required"} id="outlined-basic"  {...vendorDetails("gst", { required: true })} label={FORM_LABELS.GST} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                                </div>
                                <div>
                                    <label>Mobile Number</label>
                                    <Input type='number' error={vendorDetailsErrors.phone?.type === "required"} id="outlined-basic"
                                        {...vendorDetails("phone", { required: true, maxLength: 10 })} label={FORM_LABELS.PHONE} variant="outlined"
                                        size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                                </div>
                            </div>
                            <div>
                                <div style={{ marginBottom: '10px' }}>
                                    <label>Email</label>
                                    <Input error={vendorDetailsErrors.vendorName?.type === "required"} id="outlined-basic"  {...vendorDetails("email", { required: true })} label={FORM_LABELS.EMAIL} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                                </div>
                                <div >
                                    <label>Address</label> <br />
                                    <TextField error={vendorDetailsErrors.address?.type === "required"} {...vendorDetails("address", { required: true })}
                                        id="outlined-multiline-static"
                                        // label={FORM_LABELS.ADDRESS}
                                        multiline
                                        rows={3}
                                        sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }}
                                    />
                                </div>
                            </div>


                        </Box>

                    </DialogContent>
                    <DialogActions>
                        <Box sx={{ display: 'flex' }}>
                            <CButton type="submit" variant='contained' style={{ marginRight: '10px' }} text="+ Add" />
                            <CButton type="reset" variant='outlined' text="Close" />
                            {/* <input type="submit" value={`+ Add`} style={{ marginRight: '15px' }} /> */}
                        </Box>
                    </DialogActions>
                </form>
            </Dialog>
            <Loader open={open} />
        </Box>

    )
}