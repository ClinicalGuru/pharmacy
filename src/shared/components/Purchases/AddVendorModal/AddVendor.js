import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import { useForm } from "react-hook-form";
import { FORM_LABELS } from "../../../Constants/index";
import { Box } from "@mui/material";
import { Input } from '@mui/material';
import { ErrorMessage, } from "./AddVendor.styles";
import PurchaseService from "../../../services/Purchase.service";


export const AddVendor = ({ showModal, action }) => {
    const {
        register: vendorDetails,
        handleSubmit: handleVendorDetails,
        formState: { errors: VendorErrors },
    } = useForm();
    const handleClose = () => {
        action(!showModal);
    };
    const onSubmitVendorDetails = async (data) => {
        console.log(data, "vendors");
        try {
            await PurchaseService.addVendor(data);
            
        } catch (e) {
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
                <form onSubmit={handleVendorDetails(onSubmitVendorDetails)}>
                    <DialogContent dividers>
                        <Box sx={{
                            display: 'flex',
                            flexWrap: "wrap",
                            justifyContent: "space-between"
                        }}>
                            <div>
                                <label>{FORM_LABELS.VENDOR_NAME}</label>
                                <Input size="small" placeholder="" {...vendorDetails("vendorName", { required: true })}
                                    aria-invalid={VendorErrors.vendorName ? "true" : "false"} />
                                {VendorErrors.vendorName?.type === "required" && (
                                    <ErrorMessage role="alert">{FORM_LABELS.VENDOR_NAME}  is required</ErrorMessage>
                                )}
                            </div>
                            <div>
                                <label>{FORM_LABELS.GST}</label>
                                <Input size="small" placeholder="" {...vendorDetails("gst", { required: true })}
                                    aria-invalid={VendorErrors.gst ? "true" : "false"} />
                                {VendorErrors.gst?.type === "required" && (
                                    <ErrorMessage role="alert">{FORM_LABELS.GST}  is required</ErrorMessage>
                                )}
                            </div>
                            <div>
                                <label>{FORM_LABELS.EMAIL}</label>
                                <input placeholder="" {...vendorDetails("email", { required: true })}
                                    aria-invalid={VendorErrors.email ? "true" : "false"} />
                                {VendorErrors.email?.type === "required" && (
                                    <ErrorMessage role="alert">{FORM_LABELS.EMAIL}  is required</ErrorMessage>
                                )}
                            </div>
                            <div>
                                <label>{FORM_LABELS.PHONE}</label>
                                <input placeholder="" {...vendorDetails("phone", { required: true })}
                                    aria-invalid={VendorErrors.phone ? "true" : "false"} />
                                {VendorErrors.phone?.type === "required" && (
                                    <ErrorMessage role="alert">{FORM_LABELS.PHONE}  is required</ErrorMessage>
                                )}
                            </div>
                            <div>
                                <label>{FORM_LABELS.ADDRESS}</label>
                                <input placeholder="" {...vendorDetails("address", { required: true })}
                                    aria-invalid={VendorErrors.address ? "true" : "false"} />
                                {VendorErrors.address?.type === "required" && (
                                    <ErrorMessage role="alert">{FORM_LABELS.ADDRESS}  is required</ErrorMessage>
                                )}
                            </div>
                        </Box>

                    </DialogContent>
                    <DialogActions>
                        <Box sx={{ display: 'flex' }}>
                            <input type="submit" value={`+ Add`} />
                            <input type="reset" value={`Clear`} />
                        </Box>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    )
}