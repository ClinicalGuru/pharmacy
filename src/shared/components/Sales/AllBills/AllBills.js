import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StyledTableRow, StyledTableCell } from "../../../Styles/CommonStyles";
import CustomCard from '../../Card/Card';
import SalesService from '../../../services/sales.service';
import { Container } from "./AllBills.styles";
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';

export const AllBills = () => {
    const [rows, updateRows] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [totalBillAmount, setTotalBillAmount] = useState(0);
    const [totalCashBillAmount, setTotalCashBillAmount] = useState(0);
    const [totalCardBillAmount, setTotalCardBillAmount] = useState(0);
    const [totalUpiBillAmount, setTotalUpiBillAmount] = useState(0);


    const fetchBillsForDate = async (date) => {
        try {
            const startDate = new Date(date).setHours(0, 0, 0, 0);
            const endDate = new Date(date).setHours(23, 59, 59, 999);
            const allBillsQuerySnapshot = await SalesService.getBillsByTimestamp(startDate, endDate);
            const allBills = allBillsQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            updateRows(allBills);
            calculateTotalBillAmount(allBills);
            totalBillAmountCollectedByCash(allBills);
            totalBillAmountCollectedByCard(allBills);
            totalBillAmountCollectedByUpi(allBills);
        } catch (error) {
            console.error('Error fetching bills:', error);
        }
    };

    const calculateTotalBillAmount = (bills) => {
        const total = bills.reduce((sum, bill) => sum + bill.billAmount, 0);
        setTotalBillAmount(total);
    };

    const totalBillAmountCollectedByCash = (bills) => {
        const totalCash = bills.filter(bill => bill.paymentMode === 'cash').reduce((sum, bill) => sum + bill.billAmount, 0);
        setTotalCashBillAmount(totalCash);
    };

    const totalBillAmountCollectedByCard = (bills) => {
        const totalCardAmount = bills.filter(bill => bill.paymentMode === 'card').reduce((sum, bill) => sum + bill.billAmount, 0);
        setTotalCardBillAmount(totalCardAmount);
    };

    const totalBillAmountCollectedByUpi = (bills) => {
        const totalUpiAmount = bills.filter(bill => bill.paymentMode === 'upi').reduce((sum, bill) => sum + bill.billAmount, 0);
        setTotalUpiBillAmount(totalUpiAmount);
    };

    const onChange = (newDate) => {
        setSelectedDate(newDate);
        // if (newDate) {
        //     fetchBillsForDate(newDate);
        // }
    };
    

    useEffect(() => {
        fetchBillsForDate(new Date().valueOf());
    }, []);

    return (
        <Box sx={{ padding: 2 }}>
            <Container>
                <Box sx={{ width: '300px'}}>
                    <label>Select Date Range</label>
                    <DateRangePicker onChange={onChange} value={selectedDate} />
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginTop: '15px',
                }}>
                    <CustomCard title="Total Bill Amount" content={`${totalBillAmount}`} backgroundColor="#C6F8FF9E" />
                    <CustomCard title="Collected By Cash" content={`${totalCashBillAmount}`} backgroundColor="#FEF6F1FF" />
                    <CustomCard title="Collected By Card" content={`${totalCardBillAmount}`} backgroundColor="#F1F4FDFF" />
                    <CustomCard title="Collected By UPI" content={`${totalUpiBillAmount}`} backgroundColor="#FDF2F2FF" />
                    <CustomCard title="Return By Cash" content="" backgroundColor="#FEF9EEFF" />
                </Box>
            </Container>
            <Box sx={{ marginTop: 2 }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>S No</StyledTableCell>
                                <StyledTableCell align="center">Bill No</StyledTableCell>
                                <StyledTableCell align="center">Customer Name</StyledTableCell>
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
                                <StyledTableRow key={index}>
                                    <StyledTableCell>{index + 1}</StyledTableCell>
                                    <StyledTableCell align="center">{row.orderId}</StyledTableCell>
                                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                                    <StyledTableCell align="center">{row.billAmount}</StyledTableCell>
                                    <StyledTableCell align="center">{row.paidAmount}</StyledTableCell>
                                    <StyledTableCell align="center">{row.balance}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <PrintOutlinedIcon color="primary" fontSize="small" />
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <RotateLeftOutlinedIcon fontSize="small" sx={{ color: 'grey' }} />
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <DeleteOutlineOutlinedIcon fontSize="small" sx={{ color: 'red' }} />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};
