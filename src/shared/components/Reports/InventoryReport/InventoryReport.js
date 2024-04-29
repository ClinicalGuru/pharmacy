import React, { useState, useEffect } from 'react';
import { FORM_LABELS } from "../../../Constants/index";

import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box } from "@mui/material";
import { Form } from "../../Forms/index";
// import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
// import { AddVendor } from "./AddVendorModal";
import PurchaseService from "../../../services/Purchase.service";
import { Table } from "../../Table";
import { Container } from './InventoryReport.styles'
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
export const InventoryReport = () => {
   
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
            'head': 'Medicine Name',
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
            'head': 'Invoice Amount',
            'fieldName': 'invoiceAmount'
        },
        {
            'head': 'Total Qty',
            'fieldName': 'totalQuantity'
        },
        {
            'head': 'Price',
            'fieldName': 'price'
        },
        {
            'head': 'MRP',
            'fieldName': 'mrp '
        },
        {
            'head': 'Units inStock',
            'fieldName': 'unitsInStock'
        },
        {
            'head': 'Expiry',
            'fieldName': 'expiry '
        },
        {
            'head': 'GST',
            'fieldName': 'gst'
        },
        {
            'head': 'Minimal Order Qty',
            'fieldName': 'minimalOrderQuantity'
        },
        {
            'head': 'Return',
            'fieldName': ''
        }
    ]
    let inventoryReports_details_template = {
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
                        name: "Total Quantity",
                    },
                    {
                        value: "none",
                        name: "Daily Consumption",
                    },
                    {
                        value: "none",
                        name: "Minimal Order Qty",
                    },
                    {
                        value: "none",
                        name: "Daily/Monthly Physical Audit",
                    },
                    {
                        value: "none",
                        name: "Stock Adjustment",
                    },
                    {
                        value: "none",
                        name: "GST",
                    },
                    {
                        value: "none",
                        name: "Vendor List",
                    },
                    {
                        value: "none",
                        name: "Near Expiry",
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
            console.log(inventoryReports_details_template, 'vendor_details_template', result)
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
                    template={inventoryReports_details_template}
                    onSubmit={onSubmit}
                    validate={validate}
                    showSubmitButton={false}
                    form_styles={vendor_details_style}
                    btn_styles={btn_styles}
                    
                />
                <Button style={{marginRight: '450px'}} variant="contained" >
                    Go
                </Button>
                
                <Button   component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Export as Excel
                    <VisuallyHiddenInput type="file" />
                </Button>
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