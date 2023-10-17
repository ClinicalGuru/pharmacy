import { useForm } from "react-hook-form";
import { FORM_LABELS } from "../../Constants/index";
import { FormWrapper, ErrorMessage } from "./Sales.styles";

//material ui
import { Box } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { StyledTableRow, StyledTableCell } from "../../Styles/CommonStyles";



export const Sales = () => {
    const [rows, updateRows] = useState([]);
    const {
        register: patientDetails,
        handleSubmit: handlePatientDetails,
        watch,
        formState: { errors },
    } = useForm();

    const [otcrx, setOtcRx] = useState('')
    const handleChange = (event) => {
        setOtcRx(event.target.value);
    };

    const [gender, setGender] = useState('')
    const handleGender = (e) => {
        setGender(e.target.value);
    }

    const [pharmacologicalName, setPharmacologicalName] = useState('')
    const handlePharmacologicalName = (e) => {
        setPharmacologicalName(e.target.value)
    };

    const [medicineName, setMedicineName] = useState('')
    const handleMedicineName = (e) => {
        setMedicineName(e.target.value)
    }

    const [paidAmount, setPaidAmount] = useState('')
    const handlePaidAmount = (e) => {
        setPaidAmount(e.target.value)
    }

    const {
        register: medicineDetails,
        handleSubmit: handleMedicineDetails,
        formState: { errors: MedicineErrors },
    } = useForm();

    const {
        register: totalBillDetails,
        handleSubmit: handleTotalBillDetails,
    } = useForm();

    const onSubmit = (data) => console.log(watch);;
    const onSubmitMedicineDetails = (data) => {
        rows.push(data);
        updateRows(rows);
    }
    return (
        <Box sx={{
            padding: 2,
        }}>
            <form onSubmit={handlePatientDetails(onSubmit)}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline'
                }}>
                    <TextField id="outlined-basic" label={FORM_LABELS.PATIENT_NAME} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginRight: '15px' }} />
                    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                        <InputLabel id="demo-select-small-label">{FORM_LABELS.GENDER}</InputLabel>
                        <Select
                            size="small"
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={gender}
                            label={FORM_LABELS.GENDER}
                            onChange={handleGender}
                        >
                            <MenuItem value="male"><em>Male</em></MenuItem>
                            <MenuItem value="female"><em>Female</em></MenuItem>
                            <MenuItem value="others"><em>Others</em></MenuItem>
                        </Select>
                    </FormControl>
                    <TextField id="outlined-basic" label={FORM_LABELS.AGE} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginRight: '15px' }} />
                    <TextField id="outlined-basic" label={FORM_LABELS.PHONE} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginRight: '15px' }} />
                    <TextField id="outlined-basic" label={FORM_LABELS.EMAIL} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginRight: '15px' }} />
                    <TextField id="outlined-basic" label={FORM_LABELS.REFERED_DOCTOR} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginRight: '15px' }} />
                    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                        <InputLabel id="demo-select-small-label">{FORM_LABELS.OTCRX}</InputLabel>
                        <Select
                            size="small"
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={otcrx}
                            label={FORM_LABELS.OTCRX}
                            onChange={handleChange}
                        >
                            <MenuItem value="otc"><em>OTC</em></MenuItem>
                            <MenuItem value="rx"><em>RX</em></MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* <input type="submit" value="Add"/> */}
            </form>
            <Box sx={{
                backgroundColor: '#eef0f3',
                borderRadius: '4px',
                padding: 2,
                marginTop: 4
            }}>
                <form onSubmit={handleMedicineDetails(onSubmitMedicineDetails)}>
                    <Box sx={{
                        display: 'flex',
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: 'center'
                    }}>
                        <FormControl sx={{ m: 1, minWidth: 220, backgroundColor: '#FFFFFFFF' }} size="small">
                            <InputLabel id="demo-select-small-label">{FORM_LABELS.PHARMACOLOGICAL_NAME}</InputLabel>
                            <Select
                                size="small"
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={pharmacologicalName}
                                label={FORM_LABELS.PHARMACOLOGICAL_NAME}
                                onChange={handlePharmacologicalName}
                            >
                                <MenuItem value="none"><em>None</em></MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 200, backgroundColor: '#FFFFFFFF' }} size="small">
                            <InputLabel id="demo-select-small-label">{FORM_LABELS.MEDICINE_NAME}</InputLabel>
                            <Select
                                size="small"
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={medicineName}
                                label={FORM_LABELS.MEDICINE_NAME}
                                onChange={handleMedicineName}
                            >
                                <MenuItem value="none"><em>None</em></MenuItem>
                            </Select>
                        </FormControl>
                        <FormWrapper>
                            <TextField id="outlined-basic" label={FORM_LABELS.BATCH_NO} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginBottom: '15px' }} />
                            {MedicineErrors.batchNumber?.type === "required" && (
                                <ErrorMessage role="alert">{FORM_LABELS.BATCH_NO}  is required</ErrorMessage>
                            )}
                        </FormWrapper>
                        <FormWrapper>
                            <TextField id="outlined-basic" label={FORM_LABELS.HSN_CODE} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginBottom: '15px' }} />
                            {MedicineErrors.hsnCode?.type === "required" && (
                                <ErrorMessage role="alert">{FORM_LABELS.HSN_CODE}  is required</ErrorMessage>
                            )}
                        </FormWrapper>
                        <FormWrapper>
                            <TextField id="outlined-basic" label={FORM_LABELS.PRICE} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginBottom: '15px' }} />
                            {MedicineErrors.price?.type === "required" && (
                                <ErrorMessage role="alert">{FORM_LABELS.PRICE}  is required</ErrorMessage>
                            )}
                        </FormWrapper>
                        <FormWrapper>
                            <TextField id="outlined-basic" label={FORM_LABELS.QUANTITY} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginBottom: '15px' }} />
                            {MedicineErrors.quantity?.type === "required" && (
                                <ErrorMessage role="alert">{FORM_LABELS.QUANTITY}  is required</ErrorMessage>
                            )}
                        </FormWrapper>
                        <FormWrapper>
                            <TextField id="outlined-basic" label={FORM_LABELS.TOTAL} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginBottom: '15px' }} />
                            {MedicineErrors.total?.type === "required" && (
                                <ErrorMessage role="alert">{FORM_LABELS.TOTAL}  is required</ErrorMessage>
                            )}
                        </FormWrapper>
                        <FormWrapper>
                            <TextField id="outlined-basic" label={FORM_LABELS.DISCOUNT} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginBottom: '15px' }} />
                            {MedicineErrors.discount?.type === "required" && (
                                <ErrorMessage role="alert">{FORM_LABELS.DISCOUNT}  is required</ErrorMessage>
                            )}
                        </FormWrapper>
                        <FormWrapper>
                            <TextField id="outlined-basic" label={FORM_LABELS.AMOUNT} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginBottom: '15px' }} />
                            {MedicineErrors.amount?.type === "required" && (
                                <ErrorMessage role="alert">{FORM_LABELS.AMOUNT}  is required</ErrorMessage>
                            )}
                        </FormWrapper>
                        <Box sx={{ display: 'flex' }}>
                            <input type="submit" value={`+ Add`} />
                            <input type="reset" value={`Clear`} />
                        </Box>
                    </Box>
                </form>
            </Box>
            <Box sx={{
                backgroundColor: '#eef0f3',
                borderRadius: '4px',
                padding: 2,
                marginTop: 4
            }}>
                <form onSubmit={handleTotalBillDetails(onSubmit)}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <FormWrapper>
                            <TextField id="outlined-basic" label={FORM_LABELS.DISCOUNT} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginRight: '15px' }} />
                        </FormWrapper>
                        <FormWrapper>
                            <TextField id="outlined-basic" label={FORM_LABELS.GST} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginRight: '15px' }} />
                        </FormWrapper>
                        <FormWrapper>
                            <TextField id="outlined-basic" label={FORM_LABELS.NET_PRICE} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginRight: '15px' }} />
                        </FormWrapper>
                        <FormWrapper>
                            <TextField id="outlined-basic" label={FORM_LABELS.ROUND_OFF} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginRight: '15px' }} />
                        </FormWrapper>
                        <FormWrapper>
                            <TextField id="outlined-basic" label={FORM_LABELS.BILL_AMOUNT} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginRight: '5px' }} />
                        </FormWrapper>
                        <FormControl sx={{ m: 1, minWidth: 220, backgroundColor: '#FFFFFFFF' }} size="small">
                            <InputLabel id="demo-select-small-label">{FORM_LABELS.PAID_AMOUNT}</InputLabel>
                            <Select
                                size="small"
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={paidAmount}
                                label={FORM_LABELS.PAID_AMOUNT}
                                onChange={handlePaidAmount}
                            >
                                <MenuItem value="cash"><em>Cash</em></MenuItem>
                                <MenuItem value="card"><em>Card</em></MenuItem>
                                <MenuItem value="upi"><em>UPI</em></MenuItem>
                            </Select>
                        </FormControl>
                        <FormWrapper>
                            <TextField id="outlined-basic" label="Remarks" variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginRight: '15px' }} />
                        </FormWrapper>


                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                        <input type="submit" value={`Save`} />
                        <input type="submit" value={`Print`} />

                    </Box>
                </form>
            </Box>
            <Box sx={{ marginTop: 3 }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>S No</StyledTableCell>
                                <StyledTableCell align="center">Medicine Name</StyledTableCell>
                                <StyledTableCell align="center">Batch</StyledTableCell>
                                <StyledTableCell align="center">HSN Code</StyledTableCell>
                                <StyledTableCell align="center">Price</StyledTableCell>
                                <StyledTableCell align="center">Quantity</StyledTableCell>
                                <StyledTableCell align="center">Total</StyledTableCell>
                                <StyledTableCell align="center">Discount</StyledTableCell>
                                <StyledTableCell align="center">Amount</StyledTableCell>
                                <StyledTableCell align="center">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <StyledTableRow key={row.index}>
                                    <StyledTableCell>
                                        {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.pharmacologicalName},&nbsp;{row.medicineName}</StyledTableCell>
                                    <StyledTableCell align="center">{row.batchNumber}</StyledTableCell>
                                    <StyledTableCell align="center">{row.hsnCode}</StyledTableCell>
                                    <StyledTableCell align="center">{row.price}</StyledTableCell>
                                    <StyledTableCell align="center">{row.quantity}</StyledTableCell>
                                    <StyledTableCell align="center">{row.total}</StyledTableCell>
                                    <StyledTableCell align="center">{row.discount}</StyledTableCell>
                                    <StyledTableCell align="center">{row.amount}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}