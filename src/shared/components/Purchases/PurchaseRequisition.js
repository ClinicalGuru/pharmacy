import { useForm } from "react-hook-form";
import { FORM_LABELS } from "../../Constants/index";
import { FormWrapper, ErrorMessage, } from "./PurchaseRequisition.styles";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Box, Typography } from "@mui/material";
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

export const PurchaseRequisition = () => {
    const [rows, updateRows] = useState([]);
    const {
        register: vendorDetails,
        handleSubmit: handleVendorDetails,
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
            <Box>
                <Typography fontSize={"20px"}
                mb={3}> PURCHASE REQUISITION</Typography>
            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <form onSubmit={handleVendorDetails(onSubmit)}>
                    <Box sx={{
                        display: 'flex',
                    }}>
                        <FormWrapper mr= {"20"}>
                            <label>{FORM_LABELS.VENDOR_NAME}</label>
                            <input placeholder="name" {...vendorDetails("vendor name")} />
                        </FormWrapper>
                        <Box sx={{
                            marginLeft: "2rem"
                        }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker 
                                    PopperProps={{
                                        sx: {
                                            '& .MuiPaper-root': {
                                                backgroundColor: 'red',
                                                border: '1px solid black',
                                            }
                                        }
                                    }} label="Order Date" />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Box>

                    </Box>

                    {/* <input type="submit" value="Add"/> */}
                </form>

                <Box>
                    <input type="submit" value={`+ Add New Vendor`} />
                </Box>
            </Box>
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
                            <label>{FORM_LABELS.DOSE}</label>
                            <input placeholder="" {...medicineDetails("dose", { required: true })}
                                aria-invalid={MedicineErrors.dose ? "true" : "false"} />
                            {MedicineErrors.dose?.type === "required" && (
                                <ErrorMessage role="alert">{FORM_LABELS.DOSE}  is required</ErrorMessage>
                            )}
                        </FormWrapper>
                        <FormWrapper>
                            <label>{FORM_LABELS.FORM}</label>
                            <input placeholder="" {...medicineDetails("form", { required: true })}
                                aria-invalid={MedicineErrors.form ? "true" : "false"} />
                            {MedicineErrors.form?.type === "required" && (
                                <ErrorMessage role="alert">{FORM_LABELS.FORM}  is required</ErrorMessage>
                            )}
                        </FormWrapper>
                        <FormWrapper>
                            <label>{FORM_LABELS.QUANTITY}</label>
                            <input placeholder="" {...medicineDetails("quantity", { required: true })}
                                aria-invalid={MedicineErrors.price ? "true" : "false"} />
                            {MedicineErrors.quantity?.type === "required" && (
                                <ErrorMessage role="alert">{FORM_LABELS.QUANTITY}  is required</ErrorMessage>
                            )}
                        </FormWrapper>
                        <Box sx={{ display: 'flex' }}>
                            <input type="submit" value={`+ Add`} />
                            <input type="reset" value={`Clear`} />
                        </Box>
                    </Box>
                </form>
            </Box >
            <Box sx={{ marginTop: 3 }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>S No</StyledTableCell>
                                <StyledTableCell align="center">Drug Details/ Medicine Name</StyledTableCell>
                                <StyledTableCell align="center">Dose</StyledTableCell>
                                <StyledTableCell align="center">Form</StyledTableCell>
                                <StyledTableCell align="center">Qty/ Strips</StyledTableCell>
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
                                    <StyledTableCell align="center">{row.dose}</StyledTableCell>
                                    <StyledTableCell align="center">{row.form}</StyledTableCell>
                                    <StyledTableCell align="center">{row.quantity}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box >
    )
}