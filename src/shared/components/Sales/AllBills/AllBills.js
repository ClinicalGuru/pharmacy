import { useForm } from "react-hook-form";
import { FORM_LABELS } from "../../../Constants/index";
import { FormWrapper, Form, ErrorMessage, InvalidInput } from "./AllBills.styles";

//material ui
import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from "react";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#DEE1E6FF",
        color: "#171A1FFF",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        color: "#171A1FFF"
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    // createData('S No', 159, 6.0, 24, 4.0),
    // createData('Medicine Name', 237, 9.0, 37, 4.3),
    // createData('Batch', 262, 16.0, 24, 6.0),
    // createData('HSN Code', 305, 3.7, 67, 4.3),
    // createData('Price', 356, 16.0, 49, 3.9),
    // createData('Quantity', 159, 6.0, 24, 4.0),
    // createData('Total', 237, 9.0, 37, 4.3),
    // createData('Discount', 262, 16.0, 24, 6.0),
    // createData('Amount', 305, 3.7, 67, 4.3),
    // createData('Action', 356, 16.0, 49, 3.9),
];

export const AllBills = () => {
    const [rows, updateRows] = useState([]);
    const {
        register: patientDetails,
        handleSubmit: handlePatientDetails,
        watch,
        formState: { errors },
    } = useForm();

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
        console.log(data, "Medicines");
        rows.push(data);
        updateRows(rows);
        console.log(rows, "Medicines");
    }
    return (
        <Box sx={{
            padding: 2,
        }}>
            <form onSubmit={handlePatientDetails(onSubmit)}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <FormWrapper>
                        <label>{FORM_LABELS.PATIENT_NAME}</label>
                        <input placeholder="name" {...patientDetails("patient name")} />
                    </FormWrapper>
                    <FormWrapper>
                        <label>{FORM_LABELS.GENDER}</label>
                        <input {...patientDetails("gender")} />
                    </FormWrapper>
                    <FormWrapper>
                        <label>{FORM_LABELS.AGE}</label>
                        <input placeholder="name" {...patientDetails("age")} />
                    </FormWrapper>
                    <FormWrapper>
                        <label>{FORM_LABELS.PHONE}</label>
                        <input placeholder="name" {...patientDetails("phone")} />
                    </FormWrapper>
                    <FormWrapper>
                        <label>{FORM_LABELS.EMAIL}</label>
                        <input placeholder="name" {...patientDetails("email")} />
                    </FormWrapper>
                    <FormWrapper>
                        <label>{FORM_LABELS.REFERED_DOCTOR}</label>
                        <input placeholder="name" {...patientDetails("referedDoctor")} />
                    </FormWrapper>
                    <FormWrapper>
                        <label>{FORM_LABELS.OTCRX}</label>
                        <input placeholder="name" {...patientDetails("otc/rx")} />
                    </FormWrapper>
                </Box>

                {/* <input type="submit" value="Add"/> */}
            </form>
            <Box sx={{
                backgroundColor: '#DEE1E6FF',
                borderRadius: '4px',
                padding: 2,
                marginTop: 4
            }}>
                <form onSubmit={handleMedicineDetails(onSubmitMedicineDetails)}>
                    <Box sx={{
                        display: 'flex',
                        flexWrap: "wrap",
                        justifyContent: "space-between"
                    }}>
                        <FormWrapper >
                            <label>{FORM_LABELS.PHARMACOLOGICAL_NAME}</label>
                            <input placeholder="name" {...medicineDetails("pharmacologicalName", { required: true })}
                                aria-invalid={MedicineErrors.pharmacologicalName ? "true" : "false"} />
                            {MedicineErrors.pharmacologicalName?.type === "required" && (
                                <ErrorMessage role="alert">{FORM_LABELS.PHARMACOLOGICAL_NAME}  is required</ErrorMessage>
                            )}
                        </FormWrapper>
                        <FormWrapper>
                            <label>{FORM_LABELS.MEDICINE_NAME}</label>
                            <input {...medicineDetails("medicineName", { required: true })}
                                aria-invalid={MedicineErrors.medicineName ? "true" : "false"} />
                            {MedicineErrors.medicineName?.type === "required" && (
                                <ErrorMessage role="alert">{FORM_LABELS.MEDICINE_NAME}  is required</ErrorMessage>
                            )}
                        </FormWrapper>
                        <FormWrapper>
                            <label>{FORM_LABELS.BATCH_NO}</label>
                            <input placeholder="" {...medicineDetails("batchNumber", { required: true })}
                                aria-invalid={MedicineErrors.batchNumber ? "true" : "false"} />
                            {MedicineErrors.batchNumber?.type === "required" && (
                                <ErrorMessage role="alert">{FORM_LABELS.BATCH_NO}  is required</ErrorMessage>
                            )}
                        </FormWrapper>
                        <FormWrapper>
                            <label>{FORM_LABELS.HSN_CODE}</label>
                            <input placeholder="" {...medicineDetails("hsnCode", { required: true })}
                                aria-invalid={MedicineErrors.hsnCode ? "true" : "false"} />
                            {MedicineErrors.hsnCode?.type === "required" && (
                                <ErrorMessage role="alert">{FORM_LABELS.HSN_CODE}  is required</ErrorMessage>
                            )}
                        </FormWrapper>
                        <FormWrapper>
                            <label>{FORM_LABELS.PRICE}</label>
                            <input placeholder="" {...medicineDetails("price", { required: true })}
                                aria-invalid={MedicineErrors.price ? "true" : "false"} />
                            {MedicineErrors.price?.type === "required" && (
                                <ErrorMessage role="alert">{FORM_LABELS.PRICE}  is required</ErrorMessage>
                            )}
                        </FormWrapper>
                        <FormWrapper>
                            <label>{FORM_LABELS.QUANTITY}</label>
                            <input placeholder="" {...medicineDetails("quantity", { required: true })}
                                aria-invalid={MedicineErrors.price ? "true" : "false"} />
                            {MedicineErrors.quantity?.type === "required" && (
                                <ErrorMessage role="alert">{FORM_LABELS.PRICE}  is required</ErrorMessage>
                            )}
                        </FormWrapper>
                        <FormWrapper>
                            <label>{FORM_LABELS.TOTAL}</label>
                            <input placeholder="" {...medicineDetails("total", { required: true })}
                                aria-invalid={MedicineErrors.total ? "true" : "false"} />
                            {MedicineErrors.total?.type === "required" && (
                                <ErrorMessage role="alert">{FORM_LABELS.TOTAL}  is required</ErrorMessage>
                            )}
                        </FormWrapper>

                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex'}}>
                            <FormWrapper>
                                <label>{FORM_LABELS.DISCOUNT}</label>
                                <input placeholder="" {...medicineDetails("discount", { required: true })}
                                    aria-invalid={MedicineErrors.discount ? "true" : "false"} />
                                {MedicineErrors.discount?.type === "required" && (
                                    <ErrorMessage role="alert">{FORM_LABELS.DISCOUNT}  is required</ErrorMessage>
                                )}
                            </FormWrapper>
                            <FormWrapper>
                                <label>{FORM_LABELS.AMOUNT}</label>
                                <input placeholder="" {...medicineDetails("amount", { required: true })}
                                    aria-invalid={MedicineErrors.amount ? "true" : "false"} />
                                {MedicineErrors.amount?.type === "required" && (
                                    <ErrorMessage role="alert">{FORM_LABELS.AMOUNT}  is required</ErrorMessage>
                                )}
                            </FormWrapper>
                        </Box>
                        <Box sx = {{display: 'flex'}}>
                            <input type="submit" value={`+ Add`} />
                            <input type="reset" value={`Clear`} />
                        </Box>
                    </Box>
                </form>
            </Box>
            <Box sx={{
                backgroundColor: '#DEE1E6FF',
                borderRadius: '4px',
                padding: 2,
                marginTop: 4
            }}>
                <form onSubmit={handleTotalBillDetails(onSubmit)}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <FormWrapper>
                            <label>{FORM_LABELS.DISCOUNT}</label>
                            <input placeholder="name" {...totalBillDetails("discount")} />
                        </FormWrapper>
                        <FormWrapper>
                            <label>{FORM_LABELS.GST}</label>
                            <input {...totalBillDetails("gst")} />
                        </FormWrapper>
                        <FormWrapper>
                            <label>{FORM_LABELS.NET_PRICE}</label>
                            <input placeholder="name" {...totalBillDetails("netPrice")} />
                        </FormWrapper>
                        <FormWrapper>
                            <label>{FORM_LABELS.ROUND_OFF}</label>
                            <input placeholder="name" {...totalBillDetails("roundOff")} />
                        </FormWrapper>
                        <FormWrapper>
                            <label>{FORM_LABELS.BILL_AMOUNT}</label>
                            <input placeholder="name" {...totalBillDetails("billAount")} />
                        </FormWrapper>
                        <FormWrapper>
                            <label>{FORM_LABELS.PAID_AMOUNT}</label>
                            {/* <input placeholder="name" {...totalBillDetails("paintAmount")} /> */}
                            <Box sx={{ display: "flex" }}>
                                <select {...totalBillDetails("paymentMode")}>
                                    <option>--select--</option>
                                    <option value={`cash`}>Cash</option>
                                    <option value={`card`}>Card</option>
                                    <option value={`upi`}>UPI</option>
                                </select>
                                <input placeholder="name" {...totalBillDetails("paintAmount")} />
                            </Box>
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