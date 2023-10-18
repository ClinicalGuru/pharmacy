import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { FORM_LABELS } from "../../Constants/index";
import { ErrorMessage, Container } from "./PurchaseRequisition.styles";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Autocomplete from '@mui/material/Autocomplete';

import { Box, Typography, Button } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { AddVendor } from "./AddVendorModal";
import { StyledTableRow, StyledTableCell } from "../../Styles/CommonStyles";
import PurchaseService from "../../services/Purchase.service";
import { Loader } from "../../components/Loader";

export const PurchaseRequisition = () => {
    const PharmacologicalNamesList = [
        { name: 'dolo' },
        { name: 'paracetomol' }
    ];
    const BrandNamesList = [];
    const [requisitionDetail, setRequisitionDetails] = useState([]);
    const [allVendors, setAllVendors] = useState([]);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        getVendors();
    }, []);
    const getVendors = async () => {
        setOpen(true);
        try {
            let data = await PurchaseService.getAllVendors();
            setAllVendors(data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id })));
            setOpen(false);
            console.log(allVendors, 'allVendors');
        } catch (e) {
            setOpen(false);
            console.log(e, 'error allVendors')
        }
    }

    const resetForm = () => {
        reset();
    }

    const [showNewVendorModal, setNewVendorModal] = useState(false);
    const [rows, updateRows] = useState([]);
    const {
        register: vendorDetails,
        handleSubmit: handleVendorDetails,
        watch,
        formState: { errors },
    } = useForm();

    const [vendorName, setVendorName] = useState('');

    const handleChange = (event) => {
        setVendorName(event.target.value);
    };

    const {
        register: requistionDetails,
        handleSubmit: handleRiquistionDetails,
        reset,
        formState: {errors: requisitionErrors }
    } = useForm();

    const onSubmit = (data) => console.log(watch);;
    const onSubmitRequestionDetails = async (data) => {
        try {
            const requisitionMedicines = await PurchaseService.addRequisitionData(data);
            reset();
        } catch (e) {
            console.log(e, 'error')
        }
    }
    const addNewVendorHandler = () => {
        setNewVendorModal(!showNewVendorModal);
        if (showNewVendorModal) getVendors();
    }
    return (
        <Container>
            <Box>
                <Typography fontSize={"16px"}
                    mb={3}> PURCHASE REQUISITION</Typography>
            </Box>
            <Box sx={{
                padding: 2,
            }}>
                <form onSubmit={handleVendorDetails(onSubmit)}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Box sx={{
                            display: 'flex',
                        }}>
                            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                                <InputLabel id="demo-select-small-label">{FORM_LABELS.VENDOR_NAME}</InputLabel>
                                <Select
                                    size="small"
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={vendorName}
                                    label="Vendor Name"
                                    onChange={handleChange}
                                >
                                    {allVendors && allVendors?.map((vendor) => <MenuItem value={vendor?.id}>
                                        {vendor?.vendorName}
                                    </MenuItem>)}
                                </Select>
                            </FormControl>
                            <Box sx={{
                                marginLeft: "2rem"
                            }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            size="small"
                                            sx={{
                                                '& .MuiFormLabel-root': {
                                                    top: -6
                                                },
                                                '& .MuiOutlinedInput-input': {
                                                    padding: '8.5px 14px'
                                                }
                                            }}
                                            label="Order Date" />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>
                        </Box>
                        <Box>
                            <Button variant="contained" onClick={addNewVendorHandler}> + Add New Vendor</Button>
                        </Box>
                    </Box>
                </form>
            </Box >
            <Box sx={{
                backgroundColor: '#eef0f3',
                borderRadius: '4px',
                padding: 2,
                marginTop: 4
            }}>
                <form onSubmit={handleRiquistionDetails(onSubmitRequestionDetails)} onReset={resetForm}>
                    <Box sx={{
                        display: 'flex',
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <Autocomplete
                            freeSolo
                            id="free-solo-2-demo"
                            disableClearable
                            size='small'
                            sx={{ width: 240, backgroundColor: '#FFFFFFFF' }}
                            options={PharmacologicalNamesList.map((option) => option.name)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    {...requistionDetails("pharmacologicalName", { required: true })}
                                    label={FORM_LABELS.PHARMACOLOGICAL_NAME}
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                            )}
                        />
                        <Autocomplete
                            freeSolo
                            id="free-solo-2-demo"
                            disableClearable
                            size='small'
                            sx={{ width: 240, backgroundColor: '#FFFFFFFF' }}
                            options={BrandNamesList.map((option) => option.name)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    {...requistionDetails("brandName", { required: true })}
                                    label={FORM_LABELS.BRAND_NAME}
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                            )}
                        />
                        <div>
                            <TextField error={requisitionErrors.dose?.type === "required"} id="outlined-basic"
                                {...requistionDetails("dose", { required: true })} label={FORM_LABELS.DOSE} variant="outlined" size="small"
                                sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                        </div>
                        <div>
                            <TextField error={requisitionErrors.form?.type === "required"} id="outlined-basic"
                                {...requistionDetails("form", { required: true })} label={FORM_LABELS.FORM} variant="outlined" size="small"
                                sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                        </div>
                        <div>
                            <TextField error={requisitionErrors.quantity?.type === "required"} id="outlined-basic"
                                {...requistionDetails("quantity", { required: true })} label={FORM_LABELS.QUANTITY} variant="outlined" size="small"
                                sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                        </div>
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
            <AddVendor showModal={showNewVendorModal} action={addNewVendorHandler} />
            <Loader open={open} />
        </Container >
    )
}