

import React, { useState, useEffect } from 'react';
import { Box,  } from "@mui/material";
import { Form } from "../../Forms/index";
// import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
// import { AddVendor } from "./AddVendorModal";
import PurchaseService from "../../../services/Purchase.service";
import { Table } from "../../Table";
import { Container } from "./PharmacyInventory.styles";




// export const PharmacyInventory = () => {
//     const [rows, updateRows] = useState([]);
//     const {
//         register: inventoryDetails,
//         handleSubmit: handleInventoryDetails,
//         watch,
//         formState: { errors },
//     } = useForm();

//     const onSubmit = (data) => console.log(watch);;

//     return (
//             <Box sx={{
//                 padding: 2,
//             }}>
//                 <Box sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center"
//                 }}>
//                     <form onSubmit={handleInventoryDetails(onSubmit)}>
//                         <Box sx={{
//                             display: 'flex',
//                         }}>
//                             <Box sx={{
//                                 display: 'flex',
//                                 alignItems: 'baseline',
//                                 justifyContent: 'flex-start'
//                             }}>
//                                 <LocalizationProvider dateAdapter={AdapterDayjs} >
//                                     <DemoContainer components={['DatePicker']} sx={{ marginRight: '25px' }}>
//                                         <DatePicker
//                                             size="small"
//                                             sx={{
//                                                 '& .MuiFormLabel-root': {
//                                                     top: -6
//                                                 },
//                                                 '& .MuiOutlinedInput-input': {
//                                                     padding: '8.5px 14px'
//                                                 }
//                                             }}
//                                             label="Total Qty & Value" />
//                                     </DemoContainer>
//                                 </LocalizationProvider>
//                                 <LocalizationProvider dateAdapter={AdapterDayjs} >
//                                     <DemoContainer components={['DatePicker']} sx={{ marginRight: '25px' }}>
//                                         <DatePicker
//                                             size="small"
//                                             sx={{
//                                                 '& .MuiFormLabel-root': {
//                                                     top: -6
//                                                 },
//                                                 '& .MuiOutlinedInput-input': {
//                                                     padding: '8.5px 14px'
//                                                 }
//                                             }}
//                                             label="Consumption Qty & Value" />
//                                     </DemoContainer>
//                                 </LocalizationProvider>
//                                 <input type="submit" value={`Minimal Quantity`} />
//                             </Box>

//                         </Box>

//                         {/* <input type="submit" value="Add"/> */}
//                     </form>

//                 </Box>
//                 <Box sx={{ marginTop: 3 }}>
//                     <TableContainer component={Paper}>
//                         <Table sx={{ minWidth: 700 }} aria-label="customized table">
//                             <TableHead>
//                                 <TableRow>
//                                     <StyledTableCell>S No</StyledTableCell>
//                                     <StyledTableCell align="center">Medicine Name</StyledTableCell>
//                                     <StyledTableCell align="center">Invoice No</StyledTableCell>
//                                     <StyledTableCell align="center">Batch No</StyledTableCell>
//                                     <StyledTableCell align="center">Expiry</StyledTableCell>
//                                     <StyledTableCell align="center">MRP Per Pack</StyledTableCell>
//                                     <StyledTableCell align="center">Discount(%)</StyledTableCell>
//                                     <StyledTableCell align="center">Price Per Pack</StyledTableCell>
//                                     <StyledTableCell align="center">Units Per Pack</StyledTableCell>
//                                     <StyledTableCell align="center">Price per Unit</StyledTableCell>
//                                     <StyledTableCell align="center">Units in Stock</StyledTableCell>
//                                     <StyledTableCell align="center">GST(%)</StyledTableCell>
//                                     <StyledTableCell align="center">Return</StyledTableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {rows.map((row, index) => (
//                                     <StyledTableRow key={row.index}>
//                                         <StyledTableCell>
//                                             {index + 1}
//                                         </StyledTableCell>
//                                         <StyledTableCell align="center">{row.pharmacologicalName},&nbsp;{row.brandName}</StyledTableCell>

//                                     </StyledTableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </Box>
//             </Box >

//     )
// }


export const PharmacyInventory = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [vendorDetails, SetVendorDetails] = useState([]);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [rows, setRows] = useState([]);
    const headArray = [
        {
            'head': 'Medicine Details',
            'fieldName': 'medicineName'
        },
        {
            'head': 'Invoice No',
            'fieldName': 'invoiceNo'
        },
        {
            'head': 'Batch No',
            'fieldName': 'batchNo'  
        },
        {
            'head': 'Expiry ',
            'fieldName': 'expiry'
        },
        {
            'head': 'MRP per Pack',
            'fieldName': 'mrpPerStrip'
        },
        {
            'head': 'Discount(%)',
            'fieldName': 'discount'
        },
        {
            'head': 'Price per Pack',
            'fieldName': 'pricePerStrip'
        },
        {
            'head': 'Units per Pack',
            'fieldName': 'unitsPerPack'
        },
        {
            'head': 'Price per Unit',
            'fieldName': 'pricePerUnit'
        },
        {
            'head': 'Units in Stock',
            'fieldName': 'unitsInStock'
        },
        {
            'head': 'GST',
            'fieldName': 'gst'
        },
        {
            'head': 'Return',
            'fieldName': ''
        }
    ];
    let vendor_details_template = {
        title: '',
        submitButttonText: 'Log in',
        formStyles: {
            backgroundColor: "#eee",
        },
        fields: [
            {
                title: 'Total Qty & Value',
                type: 'date',
                name: 'date',
                validationProps: {
                    required: "Date is required"
                },
                style: {
                    width: "200px"
                }
            },
            {
                title: 'Consumption Qty & Value',
                type: 'date',
                name: 'date',
                validationProps: {
                    required: "Date is required"
                },
                style: {
                    width: "200px"
                }
            },
        ],
    };
    

    const vendor_details_style = {
        display: "flex",
        gap: "28px 30px",
        // justifyContent: "space-between"
    };
    const btn_styles = { display: "flex", justifyContent: "end" };
    const onSubmit = (form) => {
        console.log(form);
    };
    
    const validate = (watchValues, errorMethods) => {
        // console.log(watchValues, 'watchValues')
    };
    const handleDeleteRow = (targetIndex) => {
        setRows(rows.filter((_, idx) => idx !== targetIndex));
    };

    const handleEditRow = (idx) => {
        setRowToEdit(idx);
        setModalOpen(true);
    };
    
   
    
    return (
        <Box sx={{
            padding: 2,
        }}>
            <Container>
                <Form
                    template={vendor_details_template}
                    onSubmit={onSubmit}
                    validate={validate}
                    showSubmitButton={false}
                    form_styles={vendor_details_style}
                    btn_styles={btn_styles}
                />
                <div>
                    <Button variant="contained">Minimal Quantity</Button>

                </div>
            </Container>
            <Box sx={{ marginTop: 3 }}>
                <Table headArray={headArray} gridArray={rows} />
            </Box>
            <div>
                {rows.length > 0 && (
                    <Box sx ={{display: 'flex',justifyContent: 'end', marginTop: '10px'}}>
                        <Button variant="contained">Save</Button>
                    </Box>
                )}
                
            </div>
        </Box>

    )
}