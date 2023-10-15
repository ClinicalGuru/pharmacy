import { useForm } from "react-hook-form";
import { FORM_LABELS } from "../../../Constants/index";
import { FormWrapper, ErrorMessage, } from "./MasterList.styles";

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

export const MasterList = () => {
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
                    mb={3}> MASTER LIST</Typography>
            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <form onSubmit={handleVendorDetails(onSubmit)}>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <FormWrapper mr={"20"}>
                            <label>{FORM_LABELS.VENDOR_NAME}</label>
                            <input placeholder="name" {...vendorDetails("vendor name")} />
                        </FormWrapper>
                        <FormWrapper mr={"20"}>
                            <label>L1 order</label>
                            <input placeholder="L1 to L5" {...vendorDetails("vendor name")} />
                        </FormWrapper>

                    </Box>

                </form>
                <Box>
                    <input type="submit" value={`Master List`} />
                </Box>

            </Box>
            <Box sx={{ marginTop: 3 }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>S No</StyledTableCell>
                                <StyledTableCell align="center">Pharmacological Name</StyledTableCell>
                                <StyledTableCell align="center">Brand Name</StyledTableCell>
                                <StyledTableCell align="center">Dose</StyledTableCell>
                                <StyledTableCell align="center">Form</StyledTableCell>
                                <StyledTableCell align="center">Qty/ Strips</StyledTableCell>
                                <StyledTableCell align="center">MRP</StyledTableCell>
                                <StyledTableCell align="center">PTR</StyledTableCell>
                                <StyledTableCell align="center">PTS</StyledTableCell>
                                <StyledTableCell align="center">GST</StyledTableCell>
                                <StyledTableCell align="center">Discount</StyledTableCell>
                                <StyledTableCell align="center">L1,L2,L3 Order</StyledTableCell>
                                <StyledTableCell align="center">All Vendors</StyledTableCell>
                                <StyledTableCell align="center">Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <StyledTableRow key={row.index}>
                                    <StyledTableCell>
                                        {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.pharmacologicalName}</StyledTableCell>
                                    <StyledTableCell align="center">{row.medicineName}</StyledTableCell>
                                    <StyledTableCell align="center">{row.dose}</StyledTableCell>
                                    <StyledTableCell align="center">{row.form}</StyledTableCell>
                                    <StyledTableCell align="center">{row.quantity}</StyledTableCell>
                                    <StyledTableCell align="center">{row.mrp}</StyledTableCell>
                                    <StyledTableCell align="center">{row.ptr}</StyledTableCell>
                                    <StyledTableCell align="center">{row.pts}</StyledTableCell>
                                    <StyledTableCell align="center">{row.gst}</StyledTableCell>
                                    <StyledTableCell align="center">{row.gst}</StyledTableCell>
                                    <StyledTableCell align="center">{row.leastPriceOrders}</StyledTableCell>
                                    <StyledTableCell align="center">{row.vendorName}</StyledTableCell>
                                    {/* <StyledTableCell align="center">{row.quantity}</StyledTableCell> */}
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box sx={{
                marginTop: '15px',
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                <input type="submit" value={`Print`} />
                <input type= "submit" value={'Email'} />
            </Box>
        </Box >
    )
}