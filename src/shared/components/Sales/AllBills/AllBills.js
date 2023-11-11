

//material ui
import { Box, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from "react";
import { StyledTableRow, StyledTableCell } from "../../../Styles/CommonStyles";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';

import { SearchIconWrapper, Search, StyledInputBase } from "./AllBills.styles";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const AllBills = () => {
    const [rows, updateRows] = useState([]);
    const card1 = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }}>
                    Total Billed
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
                    Collected By Cash
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
                    Collected By Card
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
                    Collected By UPI
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
                    Return By Cash
                </Typography>
                <Typography sx={{ fontSize: 14 }}>

                </Typography>
            </CardContent>
        </React.Fragment>
    );






    return (
        <Box sx={{
            padding: 2,
        }}>
            <Box>
                <Typography fontSize={"20px"}
                    mb={3}> ALL BILLS</Typography>
            </Box>
            <Box>
                <Box sx={{
                    marginLeft: ""
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
                                label="Select Date" />
                        </DemoContainer>
                    </LocalizationProvider>
                </Box>
                <Box sx={{ marginRight: 4 }}>
                    {/* <Search>
                        <SearchIconWrapper>
                            <SearchIcon sx={{ color: '#BDC1CAFF' }} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            sx={{ color: '#BDC1CAFF' }}
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search', backgroundColor: "#F3F4F6FF" }}
                        />
                    </Search> */}
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-around',
                marginTop: '40px',
                marginBottom: '100px',
                // marginLeft:'50px'
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
                                <StyledTableCell align="center">Order Id</StyledTableCell>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Total Amount</StyledTableCell>
                                <StyledTableCell align="center">Paid Amount</StyledTableCell>
                                <StyledTableCell align="center">Balance</StyledTableCell>
                                <StyledTableCell align="center">Print</StyledTableCell>
                                <StyledTableCell align="center">Return</StyledTableCell>
                                <StyledTableCell align="center">Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <StyledTableRow key={row.index}>
                                    <StyledTableCell>
                                        {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.pharmacologicalName},&nbsp;{row.medicineName}</StyledTableCell>
                                    <StyledTableCell align="center">{row.batchNumber}</StyledTableCell>
                                    <StyledTableCell align="center">{row.hsnCode}</StyledTableCell>
                                    <StyledTableCell align="center">{row.price}</StyledTableCell>
                                    <StyledTableCell align="center">{row.quantity}</StyledTableCell>
                                    <StyledTableCell align="center">{row.total}</StyledTableCell>
                                    <StyledTableCell align="center">{row.discount}</StyledTableCell>
                                    <StyledTableCell align="center">{row.amount}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}