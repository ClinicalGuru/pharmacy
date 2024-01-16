import React, { useState, useEffect } from 'react';
import { FORM_LABELS } from "../../../Constants/index";

import { Box } from "@mui/material";
import { Form } from "../../Forms/index";
// import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
// import { AddVendor } from "./AddVendorModal";
import PurchaseService from "../../../services/Purchase.service";
import { Table } from "../../Table";
import { Container } from './PurchaseOrders.styles'



// export const PurchaseOrders = () => {
//     const [rows, updateRows] = useState([]);
//     const {
//         register: vendorDetails,
//         handleSubmit: handleVendorDetails,
//         watch,
//         formState: { errors },
//     } = useForm();
//     const [vendorName, setVendorName] = useState('');

//     const handleChange = (event) => {
//         setVendorName(event.target.value);
//     };
//     const onSubmit = (data) => console.log(watch);;

//     return (
//         <Container>
//             <Box sx={{
//                 padding: 2,
//             }}>
//                 <Box sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center"
//                 }}>
//                     <form onSubmit={handleVendorDetails(onSubmit)}>
//                         <Box sx={{
//                             display: 'flex',
//                         }}>
//                             <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
//                                 <InputLabel id="demo-select-small-label">{FORM_LABELS.VENDOR_NAME}</InputLabel>
//                                 <Select
//                                     size="small"
//                                     labelId="demo-select-small-label"
//                                     id="demo-select-small"
//                                     value={vendorName}
//                                     label="Vendor Name"
//                                     onChange={handleChange}
//                                 >
//                                     <MenuItem value="none">
//                                         <em>None</em>
//                                     </MenuItem>
//                                 </Select>
//                             </FormControl>
//                             <Box sx={{
//                                 marginLeft: "2rem"
//                             }}>
//                                 <LocalizationProvider dateAdapter={AdapterDayjs} >
//                                     <DemoContainer components={['DatePicker']}>
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
//                                             label="Order Date" />
//                                     </DemoContainer>
//                                 </LocalizationProvider>
//                             </Box>

//                         </Box>
//                     </form>

//                     <Box sx={{
//                         display: "flex"
//                     }}>
//                         <input type="submit" value={`L1 List`} />
//                         <input type="submit" value={`Total PO`} />
//                         <input type="submit" value={`Total Invoices`} />
//                         <input type="submit" value={`Remarks`} />
//                         <input type="submit" value={`Reorder`} />
//                     </Box>
//                 </Box>
//                 <Box sx={{ marginTop: 3 }}>
//                     <TableContainer component={Paper}>
//                         <Table sx={{ minWidth: 700 }} aria-label="customized table">
//                             <TableHead>
//                                 <TableRow>
//                                     <StyledTableCell>S No</StyledTableCell>
//                                     <StyledTableCell align="center">Pharmacological Name</StyledTableCell>
//                                     <StyledTableCell align="center">Brand Name</StyledTableCell>
//                                     <StyledTableCell align="center">Dose</StyledTableCell>
//                                     <StyledTableCell align="center">Form</StyledTableCell>
//                                     <StyledTableCell align="center">Qty/ Strips</StyledTableCell>
//                                     <StyledTableCell align="center">Actions</StyledTableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {rows.map((row, index) => (
//                                     <StyledTableRow key={row.index}>
//                                         <StyledTableCell>
//                                             {index + 1}
//                                         </StyledTableCell>
//                                         <StyledTableCell align="center">{row.pharmacologicalName}</StyledTableCell>
//                                         <StyledTableCell align="center">{row.medicineName}</StyledTableCell>
//                                         <StyledTableCell align="center">{row.dose}</StyledTableCell>
//                                         <StyledTableCell align="center">{row.form}</StyledTableCell>
//                                         <StyledTableCell align="center">{row.quantity}</StyledTableCell>
//                                         {/* <StyledTableCell align="center">{row.quantity}</StyledTableCell> */}
//                                     </StyledTableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </Box>
//                 <Box sx={{
//                     marginTop: '15px',
//                     display: 'flex',
//                     justifyContent: 'flex-end'
//                 }}>
//                     <input type="submit" value={`Save Order`} />
//                     <input type="submit" value={`Print`} />
//                     <input type="submit" value={'Email'} />
//                 </Box>
//             </Box >
//         </Container>

//     )
// }

export const PurchaseOrders = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [vendorDetails, SetVendorDetails] = useState([]);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [rows, setRows] = useState([]);
    const headArray = [
        {
            'head': 'Pharmacological Name',
            'fieldName': 'pharmacologicalName'
        },
        {
            'head': 'Brand Name',
            'fieldName': 'brandName'
        },
        {
            'head': 'Dose',
            'fieldName': 'dose'
        },
        {
            'head': 'Form',
            'fieldName': 'form'
        },
        {
            'head': 'Qantity / Strips',
            'fieldName': 'quantity'
        },
        {
            'head': 'Action',
            'fieldName': ''
        }
    ]
    let vendor_details_template = {
        title: '',
        submitButttonText: 'Log in',
        formStyles: {
            backgroundColor: "#eee",
        },
        fields: [
            {

                title: 'Vendor Name',
                type: 'select',
                name: 'select',
                options: [
                    {
                        value: "none",
                        name: "None",
                    },
                    ...vendorDetails.map(vendor => ({
                        value: vendor.id,
                        name: vendor.name,
                        ...vendor
                    }))
                ],
                validationProps: {
                    required: "Vendor name is required"
                },
                style: {
                    width: "194px"
                }
            }, {

                title: 'PO ID',
                type: 'select',
                name: 'select',
                options: [
                    {
                        value: "none",
                        name: "None",
                    },
                ],
                validationProps: {
                    required: "Vendor name is required"
                },
                style: {
                    width: "194px"
                }
            },
            {
                title: 'Order Date',
                type: 'date',
                name: 'date',
                validationProps: {
                    required: "Date is required"
                },
                style: {
                    width: "194px"
                }
            },

        ],
    };

    const vendor_details_style = {
        display: "flex",
        gap: "28px 30px",
        // justifyContent: "space-around"
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
    const getVendors = async () => {
        try {
            let data = await PurchaseService.getAllVendors();
            const result = data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id }));
            SetVendorDetails(result);
            console.log(vendor_details_template, 'vendor_details_template', result)
        } catch (e) {
            console.log(e, 'error allVendors')
        }
    };
    const refreshVendorNewVendors = () => {
        getVendors();
    };
    useEffect(() => {
        getVendors();
    }, []);
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
                <Box sx={{display: "flex",}}>
                    <Button sx={{marginRight: "10px"}} variant="contained">PO List</Button>
                    <Button sx={{marginRight: "10px"}} variant="contained">L1 List</Button>
                    <Button variant="contained">Re-Order</Button>
                </Box>
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