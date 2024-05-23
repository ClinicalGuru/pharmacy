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
// import DateRangePicker from '@wojtekmaj/react-daterange-picker';
// import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
// import 'react-calendar/dist/Calendar.css';

export const AllBills = () => {
    const [rows, updateRows] = useState([]);
    const [totals, setTotals] = useState({
        totalBillAmount: 0,
        totalCashBillAmount: 0,
        totalCardBillAmount: 0,
        totalUpiBillAmount: 0
    });
    const [dateFilter, setDateFilter] = useState({
        from: new Date(),
        to: new Date()
    });

    const fetchBillsForDate = async () => {
        try {
            const startDate = new Date(dateFilter?.from).setHours(0, 0, 0, 0).valueOf();
            const endDate = new Date(dateFilter?.to).setHours(23, 59, 59, 999).valueOf();
            const allBillsQuerySnapshot = await SalesService.getBillsByTimestamp(startDate, endDate);
            const bills = allBillsQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log(bills, 'bills')
            updateRows(bills);
            calculateTotals(bills)
            // calculateTotalBillAmount(allBills);
            // totalBillAmountCollectedByCash(allBills);
            // totalBillAmountCollectedByCard(allBills);
            // totalBillAmountCollectedByUpi(allBills);
        } catch (error) {
            console.error('Error fetching bills:', error);
        }
    };
    const calculateTotals = (bills) => {
        const totalBill = bills.reduce((sum, bill) => sum + bill.billAmount, 0);
        const cashBills = bills.filter(bill => bill.paymentMode === 'cash').reduce((sum, bill) => sum + bill.billAmount, 0);
        const cardBills = bills.filter(bill => bill.paymentMode === 'card').reduce((sum, bill) => sum + bill.billAmount, 0);
        const upiBills = bills.filter(bill => bill.paymentMode === 'upi').reduce((sum, bill) => sum + bill.billAmount, 0);
        setTotals({
            totalBillAmount: totalBill,
            totalCashBillAmount: cashBills,
            totalCardBillAmount: cardBills,
            totalUpiBillAmount: upiBills
        });
    }


    useEffect(() => {
        fetchBillsForDate();
    }, []);

    const dateHandler = (e, type) => {
        // const timeStamp = new Date(e.target.value).valueOf();
        setDateFilter(prevState => ({
            ...prevState,
            [type]: e.target.value
        }));
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Container>
                <Box sx={{ width: '300px', display: 'flex' }}>
                    <Box sx={{ marginRight: '10px' }}>
                        <label>From: </label>
                        <input type='date' onChange={(e) => { dateHandler(e, 'from') }} />
                    </Box>
                    <Box>
                        <label>To: </label>
                        <input type='date' onChange={(e) => { dateHandler(e, 'to') }} />
                    </Box>


                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginTop: '15px',
                }}>
                    <CustomCard title="Total Bill Amount" content={`${totals.totalBillAmount}`} backgroundColor="#C6F8FF9E" />
                    <CustomCard title="Collected By Cash" content={`${totals.totalCashBillAmount}`} backgroundColor="#FEF6F1FF" />
                    <CustomCard title="Collected By Card" content={`${totals.totalCardBillAmount}`} backgroundColor="#F1F4FDFF" />
                    <CustomCard title="Collected By UPI" content={`${totals.totalUpiBillAmount}`} backgroundColor="#FDF2F2FF" />
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
                                {/* <StyledTableCell align="center">Customer Name</StyledTableCell> */}
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
                                    {/* <StyledTableCell align="center">{row.name}</StyledTableCell> */}
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
