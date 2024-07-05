import { useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import { Box } from "@mui/material";
import { CButton } from "../Button/index"
import { Notification } from '../Notification/index';
import { useNavigate } from 'react-router-dom'; 

export const SaleReturnModal = ({ showModal, action, data, updatedQuantity }) => {
    const navigate = useNavigate();
    const {
        billNumber,
        medicineDetails
    } = data;
    const [notification, setNotification] = useState(false);
    const [qntyExceedAlert, setQntyExceedAlert] = useState(false);
    const [totalReturnAmount, setTotalReturnAmount] = useState(0);
    const [notificationMsg, setNotificationMsg] = useState({
        message: '',
        severity: ''
    });
    const [returnQuantities, setReturnQuantities] = useState(() =>
        medicineDetails.reduce((acc, curr) => {
            acc[curr.brandName] = 0;
            return acc;
        }, {})
    );

    const handleQuantityChange = (e, medicine) => {
        const { brandName, pricePerUnit, quantity } = medicine;
        console.log(e, brandName)
        const value = parseInt(e.target.value, 10) || 0;
        if (value === '') return;
        if (value > quantity) {
            setQntyExceedAlert(true);
            setNotification(true);
            setNotificationMsg({
                message: `Return quantity should not exceed original quantity`,
                severity: "error"
            });
            return;
        }
        setQntyExceedAlert(false);
        setReturnQuantities(prevQuantities => ({
            ...prevQuantities,
            [brandName]: value
        }));
        setTotalReturnAmount(prev => ({
            ...prev,
            [brandName]: value * pricePerUnit
        }))
    };

    const totalReturnQuantity = Object.values(returnQuantities).reduce((sum, val) => sum + +val, 0);
    const amountToBeReturned = Object.values(totalReturnAmount).reduce((sum, val) => sum + +val, 0).toFixed(2);

    useState(() => {
        console.log(returnQuantities, 'returnQuantities', medicineDetails, totalReturnQuantity)
    }, [returnQuantities]);

    const handleClose = () => {
        action(!showModal);
    };
    const alertState = () => {
        setNotification(!notification);
    };
    const handleConfirm = () => {
        action(!showModal);
        updatedQuantity(returnQuantities);
        navigate('/landing/reports/sales/salesReturn', { state: { returnQuantities, totalReturnAmount, billNumber, medicineDetails } });
    }
    return (
        <Box>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={showModal}
                minWidth="md"
                fullWidth
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Sale Return
                </DialogTitle>
                <DialogContent dividers>
                    <Box sx={{ marginBottom: '10px' }}>Bill No: {billNumber}</Box>
                    <table sx={{ minWidth: 650 }} aria-label="simple table">
                        <thead>
                            <tr>
                                <th>Brand Name</th>
                                <th align="right">Price</th>
                                <th align="right">Quantity</th>
                                <th align="right">Discount</th>
                                <th align="right">Return Quanity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicineDetails?.map((row) => (
                                <tr
                                    key={row?.brandName
                                    }
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <td component="th" >
                                        {row?.brandName
                                        }
                                    </td>
                                    <td align="right">{row.pricePerUnit}</td>
                                    <td align="right">{row.quantity}</td>
                                    <td align="right">{row.discount}</td>
                                    <td align="right"><input
                                        type="number"
                                        value={returnQuantities[row?.brandName] || 0}
                                        onChange={(e) => handleQuantityChange(e, row)}
                                    /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </DialogContent>
                <DialogActions sx={{
                    justifyContent: 'space-between',
                    padding: '1rem'
                }}>
                    <Box>Return Amount: {amountToBeReturned}</Box>
                    <CButton
                        type="button"
                        variant='contained'
                        buttonHandler={handleConfirm}
                        text="Confirm"
                        disabled={qntyExceedAlert}
                    />
                </DialogActions>
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
            </Dialog>
            {notification && <Notification severity={notificationMsg?.severity} message={notificationMsg?.message} action={alertState} />}
        </Box>
    )
}