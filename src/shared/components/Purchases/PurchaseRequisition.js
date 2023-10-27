import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { FORM_LABELS } from "../../Constants/index";
import { ErrorMessage, Container } from "./PurchaseRequisition.styles";
import { v4 as uuidv4 } from 'uuid';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Autocomplete from '@mui/material/Autocomplete';

import { Box, Typography, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
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
import Grid from '@mui/material/Grid';

import editIcon from "../../../assets/img/edit.png";
import deleteIcon from "../../../assets/img/delete.png";

export const PurchaseRequisition = () => {
    const PharmacologicalNamesList = [
        { name: 'dolo' },
        { name: 'paracetomol' }
    ];
    const [showNewVendorModal, setNewVendorModal] = useState(false);
    const [rows, updateRows] = useState([]);
    const [vendorName, setVendorName] = useState('');
    const [requisitionId, setRequisitionId] = useState('');
    const BrandNamesList = [];
    const [tableData, setTableData] = useState([]);
    const [allVendors, setAllVendors] = useState([]);
    const [open, setLoader] = useState(false);
    const {
        register: vendorDetails,
        handleSubmit: handleVendorDetails,
        watch,
        formState: { errors },
    } = useForm();

    const {
        register: requistionDetails,
        handleSubmit: handleRiquistionDetails,
        reset,
        setValue,
        formState: { errors: requisitionErrors }
    } = useForm();

    useEffect(() => {
        getVendors();
        getRequestionList();
    }, []);

    const getRequestionList = async () => {
        setLoader(true);
        try {
            let data = await PurchaseService.getRequestionData()
            setTableData(data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (e) {
            console.log(e, "=> get requestion list")
        }
    }

    const getVendors = async () => {
        setLoader(true);
        try {
            let data = await PurchaseService.getAllVendors();
            setAllVendors(data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id })));
            setLoader(false);
            console.log(allVendors, 'allVendors');
        } catch (e) {
            setLoader(false);
            console.log(e, 'error allVendors')
        }
    }

    const resetForm = () => {
        reset();
    }

    const handleChange = (event) => {
        setVendorName(event.target.value);
        setRequisitionId(uuidv4());
    };

    const onSubmit = (data) => console.log(watch);

    useEffect(() => {
        console.log(tableData);
    }, [tableData]);
    const onSubmitRequestionDetails = async (data) => {
        setTableData(prevData => [...prevData, data]);
        reset();
    }

    const addNewVendorHandler = () => {
        setNewVendorModal(!showNewVendorModal);
        if (showNewVendorModal) getVendors();
    }

    const savingRequisitionData = async () => {
        setLoader(true);
        tableData.forEach(e => {
            e['vendorName'] = setVendorName;
            e['requisitionId'] = setRequisitionId;
        });
        try {
            await PurchaseService.addRequisitionData(tableData);
            setLoader(false);
        } catch (e) {
            setLoader(false);
            console.log(e, "=> add requestion error");
        }
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const editHandler = (data) => {
        console.log(data, 'editableData');
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
                    <Box sx={{ flexGrow: 1,
                    alignItems: 'center'}}>
                        <Grid container spacing={2}>
                            <Grid item sm={2}>
                                <Autocomplete
                                    freeSolo
                                    id="free-solo-2-demo"
                                    size='small'
                                    sx={{ width: 240, backgroundColor: '#FFFFFFFF' }}
                                    options={PharmacologicalNamesList.map((option) => option.name)}
                                    renderInput={(params) => (
                                        <TextField
                                            error={requisitionErrors.pharmacologicalName?.type === "required"}
                                            {...requistionDetails("pharmacologicalName", { required: true })}
                                            {...params}
                                            label={FORM_LABELS.PHARMACOLOGICAL_NAME}
                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'search',
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item sm={2}>
                                <Autocomplete
                                    freeSolo
                                    id="free-solo-2-demo"
                                    size='small'
                                    sx={{ width: 240, backgroundColor: '#FFFFFFFF' }}
                                    options={BrandNamesList.map((option) => option.name)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            error={requisitionErrors.brandName?.type === "required"}
                                            {...requistionDetails("brandName", { required: true })}
                                            label={FORM_LABELS.BRAND_NAME}
                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'search',
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item sm={2}>
                                <TextField error={requisitionErrors.dose?.type === "required"} id="outlined-basic"
                                    {...requistionDetails("dose", { required: true })} label={FORM_LABELS.DOSE} variant="outlined" size="small"
                                    sx={{ backgroundColor: '#FFFFFFFF' }} />
                            </Grid>
                            <Grid item sm={2}>
                                <TextField error={requisitionErrors.form?.type === "required"} id="outlined-basic"
                                    {...requistionDetails("form", { required: true })} label={FORM_LABELS.FORM} variant="outlined" size="small"
                                    sx={{ backgroundColor: '#FFFFFFFF' }} />
                            </Grid>
                            <Grid item sm={2}>
                                <TextField type='number' error={requisitionErrors.quantity?.type === "required"} id="outlined-basic"
                                    {...requistionDetails("quantity", { required: true })} label={FORM_LABELS.QUANTITY} variant="outlined" size="small"
                                    sx={{ backgroundColor: '#FFFFFFFF' }} />
                            </Grid>
                            <Grid item sm={2}>
                                <Box sx={{ display: 'flex' }}>
                                    <input type="submit" value={`+ Add`} />
                                    <input type="reset" value={`Clear`} />
                                </Box>
                            </Grid>
                        </Grid>
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
                            {tableData?.map((data, index) => (
                                <StyledTableRow key={data.index}>
                                    <StyledTableCell>
                                        {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{data.pharmacologicalName} / {data.brandName}</StyledTableCell>
                                    <StyledTableCell align="center">{data.dose}</StyledTableCell>
                                    <StyledTableCell align="center">{data.form}</StyledTableCell>
                                    <StyledTableCell align="center">{data.quantity}</StyledTableCell>
                                    <StyledTableCell>
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}>
                                            <img onClick={() => editHandler(data)} className='icon_table' src={editIcon} alt='edit' />
                                            <img className='icon_table' src={deleteIcon} alt='delete' />
                                        </Box>
                                    </StyledTableCell>
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
                <input type="submit" value={`Save`} onClick={savingRequisitionData} />
                <input type="submit" value={`Print`} />
                <input type="submit" value={'Email'} />
            </Box>
            <AddVendor showModal={showNewVendorModal} action={addNewVendorHandler} />
            <Loader open={open} />
        </Container>
    )
}