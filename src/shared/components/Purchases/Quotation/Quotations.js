import { useForm } from "react-hook-form";
import { FORM_LABELS } from "../../../Constants/index";

import { Box, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from "react";
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import PurchaseService from "../../../services/Purchase.service";
import { Loader } from "../../../components/Loader";

import { Header } from '../../Header/index';
import { Container } from './Quotations.styles'

import { StyledTableRow, StyledTableCell } from "../../../Styles/CommonStyles";

export const Quotations = () => {
    const [rows, updateRows] = useState([]);
    const {
        register: vendorDetails,
        handleSubmit: handleVendorDetails,
        watch,
        formState: { errors },
    } = useForm();

    const [vendorName, setVendorName] = React.useState('');
    const [allVendors, setAllVendors] = useState([]);
    const [allRequisitionIds, setAllRequisitionIds] = useState([]);
    const [purchaseRequisitionId, setRequisitionId] = React.useState('');
    const [tableData, setTableData] = useState([]);
    const [open, setLoader] = useState(false);

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

    const getRequestionList = async () => {
        setLoader(true);
        try {
            let data = await PurchaseService.getRequestionData()
            setAllRequisitionIds(data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id })));
            setLoader(false);
            console.log(allRequisitionIds, 'requisitionIds');
        } catch (e) {
            console.log(e, "=> get requestion list")
        }
    }

    const handleChange = (event) => {
        setVendorName(event.target.value);
    };
    const handleRequisitionId = (event) => {
        setRequisitionId(event.target.value);
    };

    const {
        register: quotationDetails,
        handleSubmit: handleQuotationDetails,
        setValue,
        reset,
        formState: { errors: quotationErrors },
    } = useForm();

    useEffect(() => {
        getVendors();
        getRequestionList();
    }, []);

    const resetForm = () => {
        reset();
    }


    const onSubmit = (data) => console.log(watch);
    useEffect(() => {
        console.log(tableData);
    }, [tableData]);
    const onsubmitQuotationDetails = async (data) => {
        setTableData(prevData => [...prevData, data]);
        reset();
        
    }
    return (
        <Container>
            <Header></Header>
            <Box sx={{
                padding: 2,
            }}>
                <Box>
                    <Typography fontSize={"20px"}
                        mb={3}> QUOTATIONS</Typography>
                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <form onSubmit={handleVendorDetails(onSubmit)}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center'
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
                            <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
                                <InputLabel id="demo-select-small-label">{FORM_LABELS.PURCHASE_REQUISITION_ID}</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={purchaseRequisitionId}
                                    label={FORM_LABELS.PURCHASE_REQUISITION_ID}
                                    onChange={handleRequisitionId}
                                >
                                   {allRequisitionIds && allRequisitionIds?.map((requisitionId) => <MenuItem value={requisitionId?.id}>
                                        {requisitionId?.requisitionId}
                                    </MenuItem>)}
                                </Select>
                            </FormControl>

                            <TextField id="outlined-basic" label={FORM_LABELS.QUOTATION_ID} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF' }} />

                        </Box>

                        {/* <input type="submit" value="Add"/> */}
                    </form>

                    <Box>
                        <input type="submit" value={`Master List`} />
                    </Box>
                </Box>
                <Box sx={{
                    backgroundColor: '#eef0f3',
                    borderRadius: '4px',
                    padding: 2,
                    marginTop: 4
                }}>
                    <form onSubmit={handleQuotationDetails(onsubmitQuotationDetails)} onReset={resetForm}>
                        <Box sx={{
                            display: 'flex',
                            flexWrap: "wrap",
                            justifyContent: "space-between"
                        }}>
                            <TextField id="outlined-basic" label={FORM_LABELS.PHARMACOLOGICAL_NAME} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginBottom: '20px' }} />
                            <TextField id="outlined-basic" label={FORM_LABELS.BRAND_NAME} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginBottom: '20px' }} />
                            <TextField id="outlined-basic" label={FORM_LABELS.DOSE} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginBottom: '20px' }} />
                            <TextField id="outlined-basic" label={FORM_LABELS.FORM} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginBottom: '20px' }} />
                            <TextField id="outlined-basic" label={FORM_LABELS.QUANTITY} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginBottom: '20px' }} />
                            <TextField id="outlined-basic" label={FORM_LABELS.MRP} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginBottom: '20px' }} />
                            <TextField id="outlined-basic" label={FORM_LABELS.PTR} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginBottom: '20px' }} />
                            <TextField id="outlined-basic" label={FORM_LABELS.PTS} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginBottom: '20px' }} />
                            <TextField id="outlined-basic" label={FORM_LABELS.GST} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginBottom: '20px' }} />
                            <TextField id="outlined-basic" label={FORM_LABELS.DISCOUNT} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginBottom: '20px' }} />
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
                                    <StyledTableCell align="center">Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.map((data, index) => (
                                    <StyledTableRow key={data.index}>
                                        <StyledTableCell>
                                            {index + 1}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{data.pharmacologicalName}</StyledTableCell>
                                        <StyledTableCell align="center">{data.medicineName}</StyledTableCell>
                                        <StyledTableCell align="center">{data.dose}</StyledTableCell>
                                        <StyledTableCell align="center">{data.form}</StyledTableCell>
                                        <StyledTableCell align="center">{data.quantity}</StyledTableCell>
                                        <StyledTableCell align="center">{data.mrp}</StyledTableCell>
                                        <StyledTableCell align="center">{data.ptr}</StyledTableCell>
                                        <StyledTableCell align="center">{data.pts}</StyledTableCell>
                                        <StyledTableCell align="center">{data.gst}</StyledTableCell>
                                        <StyledTableCell align="center">{data.discount}</StyledTableCell>
                                        {/* <StyledTableCell align="center">{data.quantity}</StyledTableCell> */}
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