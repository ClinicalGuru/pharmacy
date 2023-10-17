import { useForm } from "react-hook-form";
import { FORM_LABELS } from "../../../Constants/index";

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

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { StyledTableRow, StyledTableCell } from "../../../Styles/CommonStyles";
import { Header } from '../../Header/index'
import { Container } from './PurchaseOrders.styles'



export const PurchaseOrders = () => {
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
    const onSubmit = (data) => console.log(watch);;

    return (
        <Container>
            <Header></Header>
            <Box sx={{
                padding: 2,
            }}>
                <Box>
                    <Typography fontSize={"20px"}
                        mb={3}> PURCHASE ORDERS</Typography>
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
                    </form>

                    <Box sx={{
                        display: "flex"
                    }}>
                        <input type="submit" value={`L1 List`} />
                        <input type="submit" value={`Total PO`} />
                        <input type="submit" value={`Total Invoices`} />
                        <input type="submit" value={`Remarks`} />
                        <input type="submit" value={`Reorder`} />
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
                    <input type="submit" value={`Save Order`} />
                    <input type="submit" value={`Print`} />
                    <input type="submit" value={'Email'} />
                </Box>
            </Box >
        </Container>

    )
}