import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box } from "@mui/material";
import { Form } from '../../../Forms';
import Button from '@mui/material/Button';
import { CButton } from '../../../Button';
import PurchaseService from '../../../../services/Purchase.service';
import { Table } from '../../../Table';
import { Container } from './SalesReturn.styles';

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
  const { state } = location;
  const { returnQuantities, totalReturnAmount, billNumber, medicineDetails } = state || {};

  console.log('Received state:', state); 

  const [modalOpen, setModalOpen] = useState(false);
  const [vendorDetails, setVendorDetails] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (medicineDetails && returnQuantities) {
      const newRows = medicineDetails.map((medicine) => ({
        date: new Date().toLocaleDateString(),
        billNo: billNumber,
        patientName: '',
        brandName: medicine.brandName,
        batchNo: medicine.batchNo, 
        returnQty: returnQuantities[medicine.brandName] || 0,
        returnAmount: (returnQuantities[medicine.brandName] * medicine.pricePerUnit || 0).toFixed(2),
      }));
      setRows(newRows);
      console.log('New rows:', newRows); 
    }
  }, [medicineDetails, returnQuantities, billNumber]);

  const headArray = [
    { head: 'Date', accessor: 'date' },
    { head: 'Bill No', accessor: 'billNo' },
    { head: 'Patient Name', accessor: 'patientName' },
    { head: 'Brand Name', accessor: 'brandName' },
    { head: 'Batch NO', accessor: 'batchNo' },
    { head: 'Return Qty', accessor: 'returnQty' },
    { head: 'Return Amount', accessor: 'returnAmount' },
  ];

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
        style: { width: "194px" }
      },
    ],
  };

  const vendorDetailsStyle = { display: "flex", gap: "28px 30px" };
  const btnStyles = { display: "flex", justifyContent: "end" };

  const onSubmit = (form) => {
    console.log(form);
  };

  const validate = (watchValues, errorMethods) => {
    // Validation logic
  };

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const getVendors = async () => {
    try {
      let data = await PurchaseService.getAllVendors();
      const result = data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id }));
      setVendorDetails(result);
    } catch (e) {
      console.log(e, 'error allVendors');
    }
  };

  const refreshVendorNewVendors = () => {
    getVendors();
  };

  useEffect(() => {
    getVendors();
  }, []);

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
        <Table headArray={headArray} gridArray={rows} />
      </Box>
      {rows.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '10px' }}>
          <Button variant="contained">Save</Button>
        </Box>
      )}
    </Box>
  );
};