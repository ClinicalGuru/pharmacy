import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
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
import { SaleReturnModal } from '../SaleReturnModal'
import salesService from '../../../services/sales.service';
import { Loader } from "../../Loader/index";
import { getTodayDate } from "../../../../utils/helper";
import { PdfFile } from "../../Pdf/index";

export const AllBills = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [rows, updateRows] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBill, setSelectedBill] = useState({});
    const [returnAmount, setReturnAmount] = useState({});
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
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
        setShowLoader(true);
        try {
            const startDate = new Date(dateFilter?.from).setHours(0, 0, 0, 0).valueOf();
            const endDate = new Date(dateFilter?.to).setHours(23, 59, 59, 999).valueOf();
            const allBillsQuerySnapshot = await SalesService.getBillsByTimestamp(startDate, endDate);
            const bills = allBillsQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log(bills, 'bills')
            updateRows(bills);
            calculateTotals(bills);
            setShowLoader(false);
        } catch (error) {
            console.error('Error fetching bills:', error);
            setShowLoader(false);
        }
    };
    const calculateTotals = (bills) => {
        const totalBill = bills.reduce((sum, bill) => sum + parseFloat(bill.billAmount), 0).toFixed(2);
        const cashBills = bills.filter(bill => bill.paymentMode === 'cash').reduce((sum, bill) => sum + parseFloat(bill.billAmount), 0).toFixed(2);
        const cardBills = bills.filter(bill => bill.paymentMode === 'card').reduce((sum, bill) => sum + parseFloat(bill.billAmount), 0).toFixed(2);
        const upiBills = bills.filter(bill => bill.paymentMode === 'upi').reduce((sum, bill) => sum + parseFloat(bill.billAmount), 0).toFixed(2);
        setTotals({
            totalBillAmount: totalBill,
            totalCashBillAmount: cashBills,
            totalCardBillAmount: cardBills,
            totalUpiBillAmount: upiBills
        });
    }



    useEffect(() => {
        fetchBillsForDate();
    }, [dateFilter]);

    useEffect(() => {
        setFromDate(getTodayDate());
        setToDate(getTodayDate());
    }, []);

    const dateHandler = (e, type) => {
        if (type === "from") setFromDate(e.target.value);
        else setToDate(e.target.value);

        setDateFilter(prevState => ({
            ...prevState,
            [type]: e.target.value
        }));
    }

    const saleReturn = (row) => {
        setModalOpen(true);
        setSelectedBill(row);
    }

    const updatedQuantity = (returnQuantities) => {
        let medicineDetails = selectedBill.medicineDetails;
        selectedBill['billReturnDate'] = new Date();
        selectedBill['amountReturned'] = returnAmount;
        let returnBillDetails = {};
        for (let key in returnQuantities) {
            let filteredItems = selectedBill.medicineDetails = medicineDetails?.filter((bill) => {
                if (bill.brandName === key && returnQuantities[key] > 0) {
                    bill['returnQuantity'] = returnQuantities[key];
                    return true
                }
                return true;
            });
            if (filteredItems && filteredItems.length > 0) returnBillDetails[key] = filteredItems;
        };
        selectedBill.medicineDetails = medicineDetails?.filter((bill) => Object.values(returnBillDetails).flat().includes(bill));
        salesService.addReturnBill(selectedBill);
    }

    const returnAmountHandler = (amount) => {
        setReturnAmount(amount);
    }

    const pdfHandler = (bill) => {
        let patientDetails = {
            name: "",
            phone: ""
        }
        return (<PdfFile data={bill?.medicineDetails} vendorDetails={patientDetails} />)
    }
    return (
        <Box sx={{ padding: 2 }}>
            <Container>
                <Box sx={{ width: '300px', display: 'flex' }}>
                    <Box sx={{ marginRight: '10px' }}>
                        <label>From: </label>
                        <input value={fromDate} type='date' onChange={(e) => { dateHandler(e, 'from') }} />
                    </Box>
                    <Box>
                        <label>To: </label>
                        <input value={toDate} type='date' onChange={(e) => { dateHandler(e, 'to') }} />
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
                                    <StyledTableCell align="center">{row?.billNumber}</StyledTableCell>
                                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.billAmount}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.paidAmount}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.balance}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <PrintOutlinedIcon onClick={() => pdfHandler(row)} color="primary" fontSize="small" />
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <RotateLeftOutlinedIcon onClick={() => saleReturn(row)} fontSize="small" sx={{ color: 'grey' }} />
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
            {modalOpen && <SaleReturnModal
                data={selectedBill}
                showModal={modalOpen}
                action={() => setModalOpen(!modalOpen)}
                updatedQuantity={updatedQuantity}
                returnAmount={returnAmountHandler}
            />}
            <Loader open={showLoader} />
        </Box>

    );
};
