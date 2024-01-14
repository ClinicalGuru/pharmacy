import React, { useState, useEffect } from 'react';
import { FORM_LABELS } from "../../../Constants/index";

import { Box } from "@mui/material";
import { Form } from "../../Forms/index";
// import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import { Container } from "./Quotations.styles";
// import { AddVendor } from "./AddVendorModal";
import PurchaseService from "../../../services/Purchase.service";
import { Table } from "../../Table";

// export const Quotations = () => {
//     const [rows, updateRows] = useState([]);
//     const {
//         register: vendorDetails,
//         handleSubmit: handleVendorDetails,
//         watch,
//         formState: { errors },
//     } = useForm();

//     const Item = styled(Paper)(({ theme }) => ({
//         backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//         ...theme.typography.body2,
//         padding: theme.spacing(1),
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//     }));

//     const [vendorName, setVendorName] = React.useState('');
//     const [purchaseRequisitionId, setRequisitionId] = React.useState('');

//     const handleChange = (event) => {
//         setVendorName(event.target.value);
//     };
//     const handleRequisitionId = (event) => {
//         setRequisitionId(event.target.value);
//     };

//     const {
//         register: quotationDetails,
//         handleSubmit: handleQuotationDetails,
//         formState: { errors: MedicineErrors },
//     } = useForm();


//     const onSubmit = (data) => console.log(watch);;
//     const onsubmitQuotationDetails = (data) => {
//         rows.push(data);
//         updateRows(rows);
//     }
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
//                             alignItems: 'center'
//                         }}>
//                             <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
//                                 <InputLabel id="demo-select-small-label">{FORM_LABELS.VENDOR_NAME}</InputLabel>
//                                 <Select
//                                     labelId="demo-select-small-label"
//                                     id="demo-select-small"
//                                     value={vendorName}
//                                     label={FORM_LABELS.VENDOR_NAME}
//                                     onChange={handleChange}
//                                 >
//                                     <MenuItem value="none">
//                                         <em>None</em>
//                                     </MenuItem>
//                                 </Select>
//                             </FormControl>
//                             <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
//                                 <InputLabel id="demo-select-small-label">{FORM_LABELS.PURCHASE_REQUISITION_ID}</InputLabel>
//                                 <Select
//                                     labelId="demo-select-small-label"
//                                     id="demo-select-small"
//                                     value={purchaseRequisitionId}
//                                     label={FORM_LABELS.PURCHASE_REQUISITION_ID}
//                                     onChange={handleRequisitionId}
//                                 >
//                                     <MenuItem value="none">
//                                         <em>None</em>
//                                     </MenuItem>
//                                 </Select>
//                             </FormControl>

//                             <TextField id="outlined-basic" label={FORM_LABELS.QUOTATION_ID} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF' }} />

//                         </Box>

//                         {/* <input type="submit" value="Add"/> */}
//                     </form>

//                     <Box>
//                         <input type="submit" value={`Master List`} />
//                     </Box>
//                 </Box>
//                 <Box sx={{
//                     backgroundColor: '#eef0f3',
//                     borderRadius: '4px',
//                     padding: 2,
//                     marginTop: 4
//                 }}>
//                     <form onSubmit={handleQuotationDetails(onsubmitQuotationDetails)}>
//                         <Box sx={{ flexGrow: 1 }}>
//                             <Grid container spacing={2}>
//                                 <Grid item sm={2}>
//                                     <TextField id="outlined-basic" label={FORM_LABELS.PHARMACOLOGICAL_NAME} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginBottom: '10px' }} />
//                                 </Grid>
//                                 <Grid item sm={2}>
//                                     <TextField id="outlined-basic" label={FORM_LABELS.BRAND_NAME} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginBottom: '10px' }} />
//                                 </Grid>
//                                 <Grid item sm={2}>
//                                     <TextField id="outlined-basic" label={FORM_LABELS.DOSE} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginBottom: '10px' }} />
//                                 </Grid>
//                                 <Grid item sm={2}>
//                                     <TextField id="outlined-basic" label={FORM_LABELS.FORM} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginBottom: '10px' }} />
//                                 </Grid>
//                                 <Grid item sm={2}>
//                                     <TextField id="outlined-basic" label={FORM_LABELS.QUANTITY} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginBottom: '10px' }} />
//                                 </Grid>
//                                 <Grid item sm={2}>
//                                     <TextField id="outlined-basic" label={FORM_LABELS.MRP} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginBottom: '10px' }} />
//                                 </Grid>
//                                 <Grid item sm={2}>
//                                     <TextField id="outlined-basic" label={FORM_LABELS.PTR} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginBottom: '10px' }} />
//                                 </Grid>
//                                 <Grid item sm={2}>
//                                     <TextField id="outlined-basic" label={FORM_LABELS.PTS} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginBottom: '10px' }} />
//                                 </Grid>
//                                 <Grid item sm={2}>
//                                     <TextField id="outlined-basic" label={FORM_LABELS.GST} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginBottom: '10px' }} />
//                                 </Grid>
//                                 <Grid item sm={2}>
//                                     <TextField id="outlined-basic" label={FORM_LABELS.DISCOUNT} variant="outlined" size="small" sx={{ backgroundColor: '#FFFFFFFF', marginBottom: '10px' }} />
//                                 </Grid>
//                                 <Grid item sm={3}></Grid>
//                                 <Grid item sm={1}>
//                                     <Box sx={{ display: 'flex' }}>
//                                         <input type="submit" value={`+ Add`} />
//                                         <input type="reset" value={`Clear`} />
//                                     </Box>
//                                 </Grid>
//                             </Grid>
//                         </Box>
//                     </form>
//                 </Box >
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
//                                         {/* <StyledTableCell align="center">{row.quantity}</StyledTableCell> */}
//                                     </StyledTableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </Box>
//             </Box >
//         </Container>
//     )
// }

export const Quotations = () => {
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

                title: FORM_LABELS.PURCHASE_REQUISITION_ID,
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
                title: FORM_LABELS.QUOTATION_ID,
                type: 'text',
                name: 'quotationId',
                validationProps: {
                    required: "Quotation Id is required"
                },
                style: {
                    width: "194px"
                }
            },

        ],
    };
    const medicine_details_template = {
        title: '',
        submitButttonText: '+ Add',
        clearFormBtnText: "Clear",
        formStyles: {
            backgroundColor: "#FFFFFF",
        },
        isBlockLevelBtns: false,
        fields: [
            {
                title: FORM_LABELS.PHARMACOLOGICAL_NAME,
                type: 'autoComplete',
                name: 'pharmacologicalName',
                validationProps: {
                    required: `${FORM_LABELS.PHARMACOLOGICAL_NAME} is required`
                },
                options: [

                ],
                // style: {
                //     width: "194px"
                // }
            },
            {

                title: FORM_LABELS.MEDICINE_NAME,
                type: 'autoComplete',
                name: 'brandName',
                validationProps: {
                    required: ` ${FORM_LABELS.MEDICINE_NAME} is required`
                },
                options: [

                ],
                // style: {
                //     width: "194px"
                // }
            },
            {
                title: FORM_LABELS.DOSE,
                type: 'text',
                name: 'dose',
                validationProps: {
                    required: ` ${FORM_LABELS.DOSE} is required`
                },
            },
            {
                title: FORM_LABELS.FORM,
                type: 'text',
                name: 'form',
                validationProps: {
                    required: `${FORM_LABELS.FORM} is required`
                },
            },
            {
                title: FORM_LABELS.QUANTITY,
                type: 'number',
                name: 'quantity',
                validationProps: {
                    required: `${FORM_LABELS.QUANTITY} is required`
                },
            },
            {
                title: FORM_LABELS.MRP,
                type: 'number',
                name: 'mrp',
                validationProps: {
                    required: ` ${FORM_LABELS.MRP} is required`
                },
            },
            {
                title: FORM_LABELS.PTR,
                type: 'text',
                name: 'ptr',
                validationProps: {
                    required: `${FORM_LABELS.PTR} is required`
                },
            },
            {
                title: FORM_LABELS.PTS,
                type: 'number',
                name: 'pts',
                validationProps: {
                    required: `${FORM_LABELS.PTS} is required`
                },
            },
            {
                title: FORM_LABELS.GST,
                type: 'text',
                name: 'gst',
                validationProps: {
                    required: `${FORM_LABELS.GST} is required`
                },
            },
            {
                title: FORM_LABELS.DISCOUNT,
                type: 'number',
                name: 'discount',
                validationProps: {
                    required: `${FORM_LABELS.DISCOUNT} is required`
                },
            },
        ],
        btns: [
            {
                btn_text: "+ Add",
            },
            {
                btn_text: "Clear",
            }
        ]
    };

    const vendor_details_style = {
        display: "flex",
        gap: "28px 30px",
        // justifyContent: "space-around"
    };
    const medicine_details_style = {
        display: "flex",
        flexWrap: 'wrap',
        gap: "0px 28px",
        // justifyContent: 'space-between'
    };
    const btn_styles = { display: "flex", justifyContent: "end" };
    const onSubmit = (form) => {
        console.log(form);
    };
    const onAddMedicine = (formData) => {
        const updatedRows = [...rows, formData]
        setRows(updatedRows);
        console.log(rows, 'medicine added');
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

            <Box
                sx={{
                    backgroundColor: '#eef0f3',
                    borderRadius: '4px',
                    padding: 2,
                    marginTop: '5px'
                }}
            >
                <Form
                    template={medicine_details_template}
                    onSubmit={onAddMedicine}
                    validate={validate}
                    showSubmitButton={true}
                    showClearFormButton={true}
                    form_styles={medicine_details_style}
                    btn_styles={btn_styles}
                />
            </Box>
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