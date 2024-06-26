import React, { useState, useEffect } from 'react';
import { FORM_LABELS } from "../../../Constants/index";

import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box } from "@mui/material";
import { Form } from "../../Forms/index";
// import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import { CButton } from '../../Button';
// import { AddVendor } from "./AddVendorModal";
import PurchaseService from "../../../services/Purchase.service";
import { Table } from "../../Table";
import { Container, InvalidInput } from './SalesReports.styles'
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
export const SalesReports = () => {
   
    const [modalOpen, setModalOpen] = useState(false);
    const [vendorDetails, SetVendorDetails] = useState([]);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [rows, setRows] = useState([]);
    const headArray = [
        {
            'head': 'Patient Name',
            'fieldName': 'patientName'
        },
        {
            'head': 'Medicine Name',
            'fieldName': 'medicineName'
        },
        {
            'head': 'Quantity',
            'fieldName': 'quantity'
        },
        {
            'head': 'MRP',
            'fieldName': 'mrp'
        },
        {
            'head': 'Price',
            'fieldName': 'price'
        },
        {
            'head': 'Total MRP',
            'fieldName': 'totalMrp'
        },
        {
            'head': 'Total Price',
            'fieldName': 'totalPrice'
        },
        {
            'head': 'Discount',
            'fieldName': 'discount '
        },
        {
            'head': 'Profit Margin',
            'fieldName': 'profitMargin '
        },
        {
            'head': 'OTC/Rx',
            'fieldName': 'otc '
        },
        {
            'head': 'Cash/UPI',
            'fieldName': 'cash '
        },
        {
            'head': 'Action',
            'fieldName': ''
        }
    ]
    let salesReports_details_template = {
        title: '',
        submitButttonText: 'Log in',
        formStyles: {
            backgroundColor: "#eee",
        },
        fields: [
            {
                title: 'Search',
                type: 'text',
                name: 'text',
                validationProps: {
                    required: ""
                },
                style: {
                    width: "194px"
                }
            },
            {
                title: 'Select Date',
                type: 'date',
                name: 'date',
                validationProps: {
                    required: "Date is required"
                },
                style: {
                    width: "194px"
                }
            },

            {

                title: 'Select Options',
                type: 'select',
                name: 'select',
                options: [
                    {
                        value: "none",
                        name: "OTC/Rx",
                    },
                    {
                        value: "none",
                        name: "margin",
                    },
                    {
                        value: "none",
                        name: "Discount",
                    },
                    {
                        value: "none",
                        name: "Patient List( all patients list is there)",
                    },
                    {
                        value: "none",
                        name: "Cash",
                    },
                    {
                        value: "none",
                        name: "UPI",
                    },
                    {
                        value: "none",
                        name: "Sales return",
                    },
                    
                ],
                validationProps: {
                    required: ""
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
        // alignItems: "center"
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
            console.log(salesReports_details_template, 'vendor_details_template', result)
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
                    template={salesReports_details_template}
                    onSubmit={onSubmit}
                    validate={validate}
                    showSubmitButton={false}
                    form_styles={vendor_details_style}
                    btn_styles={btn_styles}
                />
                < CButton
                    type="input"
                    variant='contained'
                    style={{marginRight:'370px'}}
                    buttonHandler={() => setModalOpen(true)}
                    text="Go"
                 />
                
                <CButton 
                type="button"
                 component="label" 
                variant="contained" 
                // style={{ color: '#56EBFF', border: '2px solid #56EBFF', backgroundColor: 'white',marginTo:'10px' }} 
                startIcon={<CloudUploadIcon />}
                text="Export as Excel"
                >
                <VisuallyHiddenInput type="file" />
                </CButton>

                {/* <Button style={{marginRight:'450px'}} variant="contained">
                    Go
                </Button>
                
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Export as Excel
                    <VisuallyHiddenInput type="file" />
                </Button> */}
            </Container>
            <Box sx={{ marginTop: 3 }}>
                <Table headArray={headArray} gridArray={rows} />
            </Box>
            <div>
                {rows.length > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '10px' }}>
                        <Button variant="contained">Save</Button>
                    </Box>
                )}

            </div>
        </Box>

    )
}