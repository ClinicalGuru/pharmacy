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


export const AddVendor = ({ showModal, action }) => {
    const {
        register: vendorDetails,
        handleSubmit: handleVendorDetails,
        formState: { errors: MedicineErrors },
    } = useForm();
    const handleClose = () => {
        action(!showModal);
    };
    const onSubmitMedicineDetails = (data) => {
        console.log(data, "Medicines");
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
                    <form onSubmit={handleVendorDetails(onSubmitMedicineDetails)}>
                        <Box sx={{
                            display: 'flex',
                            flexWrap: "wrap",
                            justifyContent: "space-between"
                        }}>
                            <div>
                                <label>{FORM_LABELS.VENDOR_NAME}</label>
                                <Input size="small" placeholder="" {...vendorDetails("vendorName", { required: true })}
                                    aria-invalid={MedicineErrors.vendorName ? "true" : "false"} />
                                {MedicineErrors.vendorName?.type === "required" && (
                                    <ErrorMessage role="alert">{FORM_LABELS.VENDOR_NAME}  is required</ErrorMessage>
                                )}
                            </div>
                            <div>
                                <label>{FORM_LABELS.GST}</label>
                                <Input size="small" placeholder="" {...vendorDetails("gst", { required: true })}
                                    aria-invalid={MedicineErrors.gst ? "true" : "false"} />
                                {MedicineErrors.gst?.type === "required" && (
                                    <ErrorMessage role="alert">{FORM_LABELS.GST}  is required</ErrorMessage>
                                )}
                            </div>
                            <div>
                                <label>{FORM_LABELS.EMAIL}</label>
                                <input placeholder="" {...vendorDetails("email", { required: true })}
                                    aria-invalid={MedicineErrors.email ? "true" : "false"} />
                                {MedicineErrors.email?.type === "required" && (
                                    <ErrorMessage role="alert">{FORM_LABELS.EMAIL}  is required</ErrorMessage>
                                )}
                            </div>
                            <div>
                                <label>{FORM_LABELS.PHONE}</label>
                                <input placeholder="" {...vendorDetails("phone", { required: true })}
                                    aria-invalid={MedicineErrors.phone ? "true" : "false"} />
                                {MedicineErrors.phone?.type === "required" && (
                                    <ErrorMessage role="alert">{FORM_LABELS.PHONE}  is required</ErrorMessage>
                                )}
                            </div>
                            <div>
                                <label>{FORM_LABELS.ADDRESS}</label>
                                <input placeholder="" {...vendorDetails("address", { required: true })}
                                    aria-invalid={MedicineErrors.address ? "true" : "false"} />
                                {MedicineErrors.address?.type === "required" && (
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