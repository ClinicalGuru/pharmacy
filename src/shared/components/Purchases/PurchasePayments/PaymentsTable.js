import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import paymentData from '../../../../mock/paymentsData.json';
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'rgb(222, 225, 230)',
        color: theme.palette.common.black,
        fontWeight: 'bold'

    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function PaymentTable() {
    const [rows, setRows] = useState(paymentData.paymentData);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Due Invoice No</StyledTableCell>
                        <StyledTableCell >Vendor Name</StyledTableCell>
                        <StyledTableCell >Due Date</StyledTableCell>
                        <StyledTableCell >Invoice Amount</StyledTableCell>
                        <StyledTableCell >Paid Amount</StyledTableCell>
                        <StyledTableCell >Due Amount</StyledTableCell>
                        <StyledTableCell >Payment Status</StyledTableCell>
                        <StyledTableCell ></StyledTableCell>
                        <StyledTableCell ></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.dueInvoiceNo}>
                            <StyledTableCell component="th" scope="row">
                                {row.dueInvoiceNo}
                            </StyledTableCell>
                            <StyledTableCell >{row.vendorName}</StyledTableCell>
                            <StyledTableCell >{row.dueDate}</StyledTableCell>
                            <StyledTableCell style={{ color: '#1DD75BFF' }}>{row.invoiceAmount}</StyledTableCell>
                            <StyledTableCell style={{ color: '#4069E5FF' }}>{row.paidAmount}</StyledTableCell>
                            <StyledTableCell style={{ color: '#DE3B40FF' }}>{row.dueAmount}</StyledTableCell>
                            <StyledTableCell >{row.paymentStatus}</StyledTableCell>
                            <StyledTableCell ><Link onClick>Add Payment Details</Link></StyledTableCell>
                            <StyledTableCell ><Link> Payment Hostory</Link></StyledTableCell>

                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
