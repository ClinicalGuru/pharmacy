import { useForm } from "react-hook-form";
import { FORM_LABELS } from "../../../Constants/index";
import { FormWrapper, ErrorMessage, } from "./PharmacyInventory.styles";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import SearchIcon from '@mui/icons-material/Search';

// import { SearchIconWrapper, Search, StyledInputBase, TypographyWrapper } from "./PharmacyInventory.styles";

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
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import { Header } from '../../Header/index';
import { Container } from "./PharmacyInventory.styles";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#eef0f3",
        color: "#171A1FFF",
        boxShadow: 'none!important'
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

export const PharmacyInventory = () => {
    const [rows, updateRows] = useState([]);
    const {
        register: vendorDetails,
        handleSubmit: handleVendorDetails,
        watch,
        formState: { errors },
    } = useForm();

    const [vendorName, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

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
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container>
            <Header></Header>
            <Box sx={{
                padding: 2,
            }}>
                <Box>
                    <Typography fontSize={"20px"}
                        mb={3}> PHARMACY INVENTORY</Typography>
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
                            {/* <Box sx={{ marginRight: 4 }}>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon sx={{ color: '#BDC1CAFF' }} />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        sx={{ color: '#BDC1CAFF' }}
                                        placeholder="Search…"
                                        inputProps={{ 'aria-label': 'search', backgroundColor: "#F3F4F6FF" }}
                                    />
                                </Search>
                            </Box> */}
                            <Box sx={{
                                marginLeft: "2rem",
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DemoContainer components={['DatePicker']} sx={{marginRight:'35px'}}>
                                        <DatePicker
                                            PopperProps={{
                                                sx: {
                                                    '& .MuiPaper-root': {
                                                        backgroundColor: 'red',
                                                        border: '1px solid black',
                                                    }
                                                }
                                            }} label="Total Qty & value" />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DemoContainer components={['DatePicker']} sx={{marginRight:'35px'}}>
                                        <DatePicker
                                            PopperProps={{
                                                sx: {
                                                    '& .MuiPaper-root': {
                                                        backgroundColor: 'red',
                                                        border: '1px solid black',
                                                    }
                                                }
                                            }} label="Consumption Qty & value" />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <input type="submit" value={`Minimal Quantity`} />
                            </Box>

                        </Box>

                        {/* <input type="submit" value="Add"/> */}
                    </form>

                </Box>
                <Box sx={{ marginTop: 3 }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>S No</StyledTableCell>
                                    <StyledTableCell align="center">Medicine Name</StyledTableCell>
                                    <StyledTableCell align="center">Invoice No</StyledTableCell>
                                    <StyledTableCell align="center">Batch No</StyledTableCell>
                                    <StyledTableCell align="center">Expiry</StyledTableCell>
                                    <StyledTableCell align="center">MRP Per Pack</StyledTableCell>
                                    <StyledTableCell align="center">Discount(%)</StyledTableCell>
                                    <StyledTableCell align="center">Price Per Pack</StyledTableCell>
                                    <StyledTableCell align="center">Units Per Pack</StyledTableCell>
                                    <StyledTableCell align="center">Price per Unit</StyledTableCell>
                                    <StyledTableCell align="center">Units in Stock</StyledTableCell>
                                    <StyledTableCell align="center">GST(%)</StyledTableCell>
                                    <StyledTableCell align="center">Return</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <StyledTableRow key={row.index}>
                                        <StyledTableCell>
                                            {index + 1}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.pharmacologicalName},&nbsp;{row.brandName}</StyledTableCell>
                                        
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box >
        </Container>

    )
}