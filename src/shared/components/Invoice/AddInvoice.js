import { useForm } from "react-hook-form";
import { FORM_LABELS } from "../../Constants/index";
import { Container } from "./AddInvoice.styles";

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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { Header } from '../Header/index';
import { StyledTableRow, StyledTableCell} from '../../Styles/CommonStyles';

export const AddInvoice = () => {
    const [rows, updateRows] = useState([]);
    const {
        register: invoiceDetails,
        handleSubmit: handleInvoiceDetails,
        watch,
        formState: { errors },
    } = useForm();

    const [vendorName, setVendorName] = React.useState('');
    const [poNumber, setPoNumber] = React.useState('');
    const handleChange = (event) => {
        setVendorName(event.target.value);
    };
    const handlePoNumber = (event) => {
        setPoNumber(event.target.value);
    };

    const {
        register: billDetails,
        handleSubmit: handleBillDetails,
        formState: { errors: billErrors },
    } = useForm();

    const onSubmit = (data) => console.log(watch);;
    const onSubmitBillDetails = (data) => {
        console.log(data, "Medicines");
        rows.push(data);
        updateRows(rows);
        console.log(rows, "Medicines");
    }



    const card1 = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }}>
                    Gross Amount
                </Typography>
                <Typography sx={{ fontSize: 14 }}>

                </Typography>
            </CardContent>
        </React.Fragment>
    );
    const card2 = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }}>
                    Total Discount Amount
                </Typography>
                <Typography sx={{ fontSize: 14 }}>

                </Typography>
            </CardContent>
        </React.Fragment>
    );
    const card3 = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }}>
                    Total Tax Amount
                </Typography>
                <Typography sx={{ fontSize: 14 }}>

                </Typography>
            </CardContent>
        </React.Fragment>
    );
    const card4 = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }}>
                    Round Off
                </Typography>
                <Typography sx={{ fontSize: 14 }}>

                </Typography>
            </CardContent>
        </React.Fragment>
    );
    const card5 = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }}>
                    Total Amount
                </Typography>
                <Typography sx={{ fontSize: 14 }}>

                </Typography>
            </CardContent>
        </React.Fragment>
    );

    return (
        <Container>
            <Header></Header>
            <Box sx={{
                padding: 2,
            }}>
                <Box>
                    <Typography fontSize={"20px"}
                        mb={3}> ADD INVOICE</Typography>
                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <form onSubmit={handleInvoiceDetails(onSubmit)}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'baseline'
                        }}>
                            <TextField id="outlined-basic" label={FORM_LABELS.INVOICE_NUMBER} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF' }} />
                            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                                <InputLabel id="demo-select-small-label">{FORM_LABELS.PO_NUMBER}</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={poNumber}
                                    label="PO Number"
                                    onChange={handlePoNumber}
                                >
                                    <MenuItem value="none">
                                        <em>None</em>
                                    </MenuItem>
                                </Select>
                            </FormControl>
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
                                            size="small"
                                            sx={{
                                                '& .MuiFormLabel-root': {
                                                    top: -6
                                                },
                                                '& .MuiOutlinedInput-input': {
                                                    padding: '8.5px 14px'
                                                }
                                            }}
                                            label="Invoice Date" />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>

                        </Box>

                        {/* <input type="submit" value="Add"/> */}
                    </form>
                </Box>
                <Box sx={{
                    backgroundColor: '#eef0f3',
                    borderRadius: '4px',
                    padding: 2,
                    marginTop: 4
                }}>
                    <form onSubmit={handleBillDetails(onSubmitBillDetails)}>
                        <Box sx={{
                            display: 'flex',
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <TextField id="outlined-basic" label={FORM_LABELS.PHARMACOLOGICAL_NAME} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                            <TextField id="outlined-basic" label={FORM_LABELS.MEDICINE_NAME} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                            <TextField id="outlined-basic" label={FORM_LABELS.BATCH_NO} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                            <TextField id="outlined-basic" label={FORM_LABELS.HSN_CODE} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                            <TextField id="outlined-basic" label={FORM_LABELS.EXPIRY} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                            <TextField id="outlined-basic" label={FORM_LABELS.UNITS_STRIPS} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                            <TextField id="outlined-basic" label={FORM_LABELS.NO_OF_STRIPS} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                            <TextField id="outlined-basic" label={FORM_LABELS.FREE_STRIPS} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                            <TextField id="outlined-basic" label={FORM_LABELS.MRP_PER_STRIP} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                            <TextField id="outlined-basic" label={FORM_LABELS.DISCOUNT} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                            <TextField id="outlined-basic" label={FORM_LABELS.PRICE_PER_STRIP} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                            <TextField id="outlined-basic" label={FORM_LABELS.GST} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                            <TextField id="outlined-basic" label={FORM_LABELS.NET_PRICE} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                            <TextField id="outlined-basic" label={FORM_LABELS.ADD_REMARKS} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', mb: '15px' }} />
                            <Box sx={{ display: 'flex' }}>
                                <input type="submit" value={`+ Add`} />
                                <input type="reset" value={`Clear`} />
                            </Box>
                        </Box>
                    </form>
                </Box >
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginTop: '20px'
                }}>
                    <Box>
                        <Card variant="outlined" sx={{ backgroundColor: '#C6F8FF9E' }}>{card1}</Card>
                    </Box>
                    <Box>
                        <Card variant="outlined" sx={{ backgroundColor: '#FEF6F1FF' }}>{card2}</Card>
                    </Box>
                    <Box>
                        <Card variant="outlined" sx={{ backgroundColor: '#F1F4FDFF' }}>{card3}</Card>
                    </Box>
                    <Box>
                        <Card variant="outlined" sx={{ backgroundColor: '#FDF2F2FF' }}>{card4}</Card>
                    </Box>
                    <Box>
                        <Card variant="outlined" sx={{ backgroundColor: '#FEF9EEFF' }}>{card5}</Card>
                    </Box>
                </Box>
                <Box sx={{ marginTop: 3 }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>S No</StyledTableCell>
                                    <StyledTableCell align="center">HSN Code</StyledTableCell>
                                    <StyledTableCell align="center">Mecicine Details</StyledTableCell>
                                    <StyledTableCell align="center">Expiry</StyledTableCell>
                                    <StyledTableCell align="center">Units / Strips</StyledTableCell>
                                    <StyledTableCell align="center">Total Units</StyledTableCell>
                                    <StyledTableCell align="center">MRP Per Strip</StyledTableCell>
                                    <StyledTableCell align="center">Discount(%)</StyledTableCell>
                                    <StyledTableCell align="center">Price per Strip</StyledTableCell>
                                    <StyledTableCell align="center">GST</StyledTableCell>
                                    <StyledTableCell align="center">Tax in(rs)</StyledTableCell>
                                    <StyledTableCell align="center">Total Price</StyledTableCell>
                                    <StyledTableCell align="center">Actios</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <StyledTableRow key={row.index}>
                                        <StyledTableCell>
                                            {index + 1}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.hsnCode}</StyledTableCell>
                                        <StyledTableCell align="center">{row.pharmacologicalName},&nbsp;{row.medicineName}</StyledTableCell>
                                        <StyledTableCell align="center">{row.expiry}</StyledTableCell>
                                        <StyledTableCell align="center">{row.unitsOrStrips}</StyledTableCell>
                                        <StyledTableCell align="center">{row.totalUnits}</StyledTableCell>
                                        <StyledTableCell align="center">{row.mrpPerStrip}</StyledTableCell>
                                        <StyledTableCell align="center">{row.discount}</StyledTableCell>
                                        <StyledTableCell align="center">{row.pricePerStrip}</StyledTableCell>
                                        <StyledTableCell align="center">{row.gst}</StyledTableCell>
                                        <StyledTableCell align="center">{row.tax}</StyledTableCell>
                                        <StyledTableCell align="center">{row.totalPrice}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Box>
                </Box>
                <Box sx={{
                    marginTop: '15px',
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <input type="submit" value={`Save`} />
                    <input type="submit" value={`Print`} />
                </Box>
            </Box >
        </Container>

    )
}