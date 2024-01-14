
import React, { useState, useEffect } from 'react';
import { FORM_LABELS } from "../../../Constants/index";

import { Box } from "@mui/material";
import { Form } from "../../Forms/index";
// import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import { Container } from "./MasterList.styles";
// import { AddVendor } from "./AddVendorModal";
import PurchaseService from "../../../services/Purchase.service";
import { Table } from "../../Table";

// export const MasterList = () => {
//     const [vendorName, setVendorName] = React.useState('');
//     const [selectList, setSelectList] = React.useState('');
//     const handleChange = (event) => {
//         setVendorName(event.target.value);
//     };

//     const handleList = (event) => {
//         setSelectList(event.target.value);
//     };

//     const [rows, updateRows] = useState([]);
//     const {
//         register: vendorDetails,
//         handleSubmit: handleVendorDetails,
//         watch,
//         formState: { errors },
//     } = useForm();

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
//                             justifyContent: 'space-between',
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

//                             <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
//                                 <InputLabel id="demo-select-small-label">Select List</InputLabel>
//                                 <Select
//                                     labelId="demo-select-small-label"
//                                     id="demo-select-small"
//                                     value={selectList}
//                                     label="Select List"
//                                     onChange={handleList}
//                                 >
//                                     <MenuItem value="l1"><em>L1</em></MenuItem>
//                                     <MenuItem value="l2"><em>L2</em></MenuItem>
//                                     <MenuItem value="l3"><em>L3</em></MenuItem>
//                                     <MenuItem value="l4"><em>L4</em></MenuItem>
//                                     <MenuItem value="l5"><em>L5</em></MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Box>

//                     </form>
//                     <Box>
//                         <input type="submit" value={`Master List`} />
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
//                                     <StyledTableCell align="center">MRP</StyledTableCell>
//                                     <StyledTableCell align="center">PTR</StyledTableCell>
//                                     <StyledTableCell align="center">PTS</StyledTableCell>
//                                     <StyledTableCell align="center">GST</StyledTableCell>
//                                     <StyledTableCell align="center">Discount</StyledTableCell>
//                                     <StyledTableCell align="center">L1,L2,L3 Order</StyledTableCell>
//                                     <StyledTableCell align="center">All Vendors</StyledTableCell>
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
//                                         <StyledTableCell align="center">{row.mrp}</StyledTableCell>
//                                         <StyledTableCell align="center">{row.ptr}</StyledTableCell>
//                                         <StyledTableCell align="center">{row.pts}</StyledTableCell>
//                                         <StyledTableCell align="center">{row.gst}</StyledTableCell>
//                                         <StyledTableCell align="center">{row.gst}</StyledTableCell>
//                                         <StyledTableCell align="center">{row.leastPriceOrders}</StyledTableCell>
//                                         <StyledTableCell align="center">{row.vendorName}</StyledTableCell>
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
//                     <input type="submit" value={`Print`} />
//                     <input type="submit" value={'Email'} />
//                 </Box>
//             </Box >
//         </Container>
//     )
// }


export const MasterList = () => {
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
            'head': 'MRP',
            'fieldName': 'mrp'
        },
        {
            'head': 'PTR',
            'fieldName': 'ptr'
        },
        {
            'head': 'PTS',
            'fieldName': 'pts'
        },
        {
            'head': 'GST',
            'fieldName': 'gst'
        },
        {
            'head': 'Discount',
            'fieldName': 'discount'
        },
        {
            'head': 'L1,L2,L3 order ',
            'fieldName': 'leastPriceOrder'
        },
        {
            'head': 'All Vendors',
            'fieldName': 'allVendors'
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
            },
            {

                title: 'Select List',
                type: 'select',
                name: 'select',
                options: [
                    {
                        value: "none",
                        name: "None",
                    },
                    
                ],
                validationProps: {
                    required: "This field is required"
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
                <div>
                    <Button variant="contained">Master List</Button>

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