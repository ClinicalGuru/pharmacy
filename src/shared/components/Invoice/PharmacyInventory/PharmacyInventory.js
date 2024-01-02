import { useForm } from "react-hook-form";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
import { StyledTableRow, StyledTableCell} from '../../../Styles/CommonStyles';

import { Header } from '../../Header/index';
import { Container } from "./PharmacyInventory.styles";




export const PharmacyInventory = () => {
    const [rows, updateRows] = useState([]);
    const {
        register: inventoryDetails,
        handleSubmit: handleInventoryDetails,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => console.log(watch);;

    return (
            <Box sx={{
                padding: 2,
            }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <form onSubmit={handleInventoryDetails(onSubmit)}>
                        <Box sx={{
                            display: 'flex',
                        }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'baseline',
                                justifyContent: 'flex-start'
                            }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DemoContainer components={['DatePicker']} sx={{ marginRight: '25px' }}>
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
                                            label="Total Qty & Value" />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DemoContainer components={['DatePicker']} sx={{ marginRight: '25px' }}>
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
                                            label="Consumption Qty & Value" />
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

    )
}