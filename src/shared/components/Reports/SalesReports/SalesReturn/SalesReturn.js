import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { CButton } from '../../../Button';
import { Container } from './SalesReturn.styles';
import { useLocation } from 'react-router-dom';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import salesService from '../../../../services/sales.service';
import { Form } from 'react-router-dom';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const SalesReturn = () => {
  const location = useLocation();
  const { state } = location || {};
  const { billNumber, medicineDetails, patientName } = state || {};

  const [openRows, setOpenRows] = useState({});
  const [bills, setBills] = useState([]);
  const [todayDate, setTodayDate] = useState('');

  useEffect(() => {
    const fetchReturnBills = async () => {
      const returnBills = await salesService.getReturnBills();
      console.log('returnbills',returnBills)
      const sortedReturnBills = returnBills.sort((a, b) => a.billReturnDate.seconds - b.billReturnDate.seconds);
      console.log('sortedReturnbills',sortedReturnBills)
      setBills(sortedReturnBills);
    };

    fetchReturnBills();

    const today = new Date();
    const formattedToday = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
    setTodayDate(formattedToday);
  }, []);

  const toggleRow = (returnBillDocId) => {
    setOpenRows((prev) => ({
      ...prev,
      [returnBillDocId]: !prev[returnBillDocId],
    }));
  };

  const formatFirestoreTimestamp = (timestamp) => {
    if (!timestamp || !timestamp.seconds) return '';

    const dateObject = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    return dateObject.toLocaleDateString('en-GB'); 
  };

  const computeTotalReturnQuantity = (medicineDetails) => {
    if (!medicineDetails || medicineDetails.length === 0) {
      return 0; 
    }
  
    const validMedicines = medicineDetails.filter(medicine => medicine.returnQuantity !== undefined && medicine.returnQuantity !== null && medicine.returnQuantity !== '');
    
    const totalReturnQuantity = validMedicines.reduce((total, medicine) => {
      const returnQuantity = parseFloat(medicine.returnQuantity) || 0; 
      return total + returnQuantity;
    }, 0);
  
    return totalReturnQuantity;
  };

  const computeTotalReturnAmount = (medicineDetails) => {
    if (!medicineDetails || medicineDetails.length === 0) {
      return 0;
    }
    const totalReturnAmount = medicineDetails.reduce((total, medicine) => {
      const returnAmount = (medicine.returnQuantity * medicine.pricePerUnit) || 0;
      return total + returnAmount;
    }, 0);
  
    return totalReturnAmount.toFixed(2);
  };

  const amountToBeReturned = computeTotalReturnAmount(medicineDetails);

  
  const Row = ({ bill }) => {
    console.log('bill',bill)
    const { returnBillDocId, billNumber, billReturnDate, name, medicineDetails } = bill;
    const isOpen = openRows[returnBillDocId];
    const formattedReturnDate = formatFirestoreTimestamp(billReturnDate);
    const totalReturnQuantity = computeTotalReturnQuantity(medicineDetails);
    const totalReturnAmount = computeTotalReturnAmount(medicineDetails);

    return (
      <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => toggleRow(returnBillDocId)}
            >
              {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{formattedReturnDate}</TableCell>
          <TableCell>{billNumber}</TableCell>
          <TableCell>{name}</TableCell>
          <TableCell align="center">{totalReturnQuantity}</TableCell>
          <TableCell align="center">{computeTotalReturnAmount(medicineDetails)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Return List
                </Typography>
                <Table size="small" aria-label="medicines">
                  <TableHead>
                    <TableRow>
                      <TableCell>S.No</TableCell>
                      <TableCell>Brand Name</TableCell>
                      <TableCell>Batch No</TableCell>
                      <TableCell align="center">Return Quantity</TableCell>
                      <TableCell align="center">Return Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {medicineDetails.map((medicine, index) => (
                      medicine.returnQuantity > 0 && ( 
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{medicine.brandName}</TableCell>
                          <TableCell>{medicine.batchNo}</TableCell>
                          <TableCell align="center">{medicine.returnQuantity}</TableCell>
                          <TableCell align="center">{(medicine.returnQuantity * medicine.pricePerUnit).toFixed(2)}</TableCell> 
                        </TableRow>
                      )
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  const salesReturnDetailsTemplate = {
    title: '',
    submitButttonText: 'Log in',
    formStyles: { backgroundColor: "#eee" },
    fields: [
      {
        title: 'Search',
        type: 'text',
        name: 'text',
        validationProps: { required: "" },
        style: { width: "194px" }
      },
      {
        title: 'Select Date',
        type: 'date',
        name: 'date',
        validationProps: { required: "Date is required" },
        style: { width: "194px" },
      },
    ],
  };

  const onSubmit = (form) => {
    console.log(form);
  };

  const validate = (watchValues, errorMethods) => {
  };

  const vendorDetailsStyle = { display: "flex", gap: "28px 30px" };
  const btnStyles = { display: "flex", justifyContent: "end" };

  const filteredBills = bills.filter(bill =>
    bill.medicineDetails.some(medicine => medicine.returnQuantity > 0)
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Container>
        <Form
          template={salesReturnDetailsTemplate}
          onSubmit={onSubmit}
          validate={validate}
          showSubmitButton={false}
          form_styles={vendorDetailsStyle}
          btn_styles={btnStyles}
        />
        <CButton
          type="button"
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          text="Export as Excel"
        >
          <VisuallyHiddenInput type="file" />
        </CButton>
      </Container>
      <Box sx={{ marginTop: 3 }}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Bill Return Date</TableCell>
                <TableCell>Bill No</TableCell>
                <TableCell>Patient Name</TableCell>
                <TableCell align="center">Total Return Quantity</TableCell>
                <TableCell align="center">Total Return Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBills.map((bill, index) => (
                <Row key={index} bill={bill} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {filteredBills.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '10px' }}>
          <Button variant="contained">Save</Button>
        </Box>
      )}
    </Box>
  );
};
