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
import { useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import * as React from 'react';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { StyledTableRow, StyledTableCell } from "../../../Styles/CommonStyles";

import { Header } from '../../Header/index';
import { Container } from './MasterList.styles'



export const MasterList = () => {
    const [vendorName, setVendorName] = React.useState('');
    const [selectList, setSelectList] = React.useState('');
    const handleChange = (event) => {
        setVendorName(event.target.value);
    };

    const handleList = (event) => {
        setSelectList(event.target.value);
    };

    const [rows, updateRows] = useState([]);
    const {
        register: vendorDetails,
        handleSubmit: handleVendorDetails,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => console.log(watch);;
    
    return (
        <Container>
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
                                    <MenuItem value="none">
                                        <em>None</em>
                                    </MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                                <InputLabel id="demo-select-small-label">Select List</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={selectList}
                                    label="Select List"
                                    onChange={handleList}
                                >
                                    <MenuItem value="l1"><em>L1</em></MenuItem>
                                    <MenuItem value="l2"><em>L2</em></MenuItem>
                                    <MenuItem value="l3"><em>L3</em></MenuItem>
                                    <MenuItem value="l4"><em>L4</em></MenuItem>
                                    <MenuItem value="l5"><em>L5</em></MenuItem>
                                </Select>
                            </FormControl>
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
                    <input type="submit" value={'Email'} />
                </Box>
            </Box >
        </Container>
    )
}