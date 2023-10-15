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

import { Header } from '../Header/index';
import { Container } from "./PurchaseRequisition.styles";

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

export const PurchaseRequisition = () => {
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
                            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                                <InputLabel id="demo-select-small-label">{FORM_LABELS.VENDOR_NAME}</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={vendorName}
                                    label="Vendor Name"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="none">
                                        <em>None</em>
                                    </MenuItem>
                                </Select>
                            </FormControl>
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
                        <input type="submit" onClick={handleClickOpen} value={`+ Add New Vendor`} />
                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
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
                                <form onSubmit={handleMedicineDetails(onSubmitMedicineDetails)}>
                                    <Box sx={{
                                        display: 'flex',
                                        flexWrap: "wrap",
                                        justifyContent: "space-between"
                                    }}>
                                        <FormWrapper>
                                            <label>{FORM_LABELS.VENDOR_NAME}</label>
                                            <input placeholder="" {...medicineDetails("vendorName", { required: true })}
                                                aria-invalid={MedicineErrors.vendorName ? "true" : "false"} />
                                            {MedicineErrors.vendorName?.type === "required" && (
                                                <ErrorMessage role="alert">{FORM_LABELS.VENDOR_NAME}  is required</ErrorMessage>
                                            )}
                                        </FormWrapper>
                                        <FormWrapper>
                                            <label>{FORM_LABELS.GST}</label>
                                            <input placeholder="" {...medicineDetails("gst", { required: true })}
                                                aria-invalid={MedicineErrors.gst ? "true" : "false"} />
                                            {MedicineErrors.gst?.type === "required" && (
                                                <ErrorMessage role="alert">{FORM_LABELS.GST}  is required</ErrorMessage>
                                            )}
                                        </FormWrapper>
                                        <FormWrapper>
                                            <label>{FORM_LABELS.EMAIL}</label>
                                            <input placeholder="" {...medicineDetails("email", { required: true })}
                                                aria-invalid={MedicineErrors.email ? "true" : "false"} />
                                            {MedicineErrors.email?.type === "required" && (
                                                <ErrorMessage role="alert">{FORM_LABELS.EMAIL}  is required</ErrorMessage>
                                            )}
                                        </FormWrapper>
                                        <FormWrapper>
                                            <label>{FORM_LABELS.PHONE}</label>
                                            <input placeholder="" {...medicineDetails("phone", { required: true })}
                                                aria-invalid={MedicineErrors.phone ? "true" : "false"} />
                                            {MedicineErrors.phone?.type === "required" && (
                                                <ErrorMessage role="alert">{FORM_LABELS.PHONE}  is required</ErrorMessage>
                                            )}
                                        </FormWrapper>
                                        <FormWrapper>
                                            <label>{FORM_LABELS.ADDRESS}</label>
                                            <input placeholder="" {...medicineDetails("address", { required: true })}
                                                aria-invalid={MedicineErrors.address ? "true" : "false"} />
                                            {MedicineErrors.address?.type === "required" && (
                                                <ErrorMessage role="alert">{FORM_LABELS.ADDRESS}  is required</ErrorMessage>
                                            )}
                                        </FormWrapper>
                                    </Box>
                                </form>

                            </DialogContent>
                            <DialogActions>
                                <Box sx={{ display: 'flex' }}>
                                    <input type="submit" value={`+ Add`} />
                                    <input type="reset" value={`Clear`} />
                                </Box>
                            </DialogActions>
                        </BootstrapDialog>
                    </Box>
                </Box>
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
                            alignItems: "center"
                        }}>
                            
                            <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
                                <InputLabel id="demo-select-small-label">{FORM_LABELS.PHARMACOLOGICAL_NAME}</InputLabel>
                                <Select sx={{backgroundColor: '#FFFFFFFF'}}
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    label={FORM_LABELS.PHARMACOLOGICAL_NAME}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="none">
                                        <em>None</em>
                                    </MenuItem>
                                    {MedicineErrors.pharmacologicalName?.type === "required" && (
                                        <ErrorMessage role="alert">{FORM_LABELS.PHARMACOLOGICAL_NAME}  is required</ErrorMessage>
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
                                <InputLabel id="demo-select-small-label">{FORM_LABELS.BRAND_NAME}</InputLabel>
                                <Select sx={{backgroundColor: '#FFFFFFFF'}}
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    label={FORM_LABELS.BRAND_NAME}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="none">
                                        <em>None</em>
                                    </MenuItem>
                                    {MedicineErrors.brandName?.type === "required" && (
                                        <ErrorMessage role="alert">{FORM_LABELS.BRAND_NAME}  is required</ErrorMessage>
                                    )}
                                </Select>
                            </FormControl>
                            <TextField id="outlined-basic" label={FORM_LABELS.DOSE} variant="outlined" size ="small" sx= {{backgroundColor:'#FFFFFFFF'}}/>
                            <TextField id="outlined-basic" label={FORM_LABELS.FORM} variant="outlined" size ="small" sx= {{backgroundColor:'#FFFFFFFF'}}/>
                            <TextField id="outlined-basic" label={FORM_LABELS.QUANTITY} variant="outlined" size ="small" sx= {{backgroundColor:'#FFFFFFFF'}}/>
                            {/* <FormWrapper>
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
                            </FormWrapper> */}
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
                                    <StyledTableCell align="center">Drug Details / Brand Name</StyledTableCell>
                                    <StyledTableCell align="center">Dose</StyledTableCell>
                                    <StyledTableCell align="center">Form</StyledTableCell>
                                    <StyledTableCell align="center">Qty / Strips</StyledTableCell>
                                    <StyledTableCell align="center">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <StyledTableRow key={row.index}>
                                        <StyledTableCell>
                                            {index + 1}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.pharmacologicalName},&nbsp;{row.brandName}</StyledTableCell>
                                        <StyledTableCell align="center">{row.dose}</StyledTableCell>
                                        <StyledTableCell align="center">{row.form}</StyledTableCell>
                                        <StyledTableCell align="center">{row.quantity}</StyledTableCell>
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
                    <input type="submit" value={`Save`} />
                    <input type="submit" value={`Print`} />
                    <input type="submit" value={'Email'} />
                </Box>
            </Box >
        </Container>

    )
}