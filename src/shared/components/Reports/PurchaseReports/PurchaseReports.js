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
import { Container } from './PurchaseReports.styles'
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
export const PurchaseReports = () => {
   
    const [modalOpen, setModalOpen] = useState(false);
    const [vendorDetails, SetVendorDetails] = useState([]);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [rows, setRows] = useState([]);
    const headArray = [
        {
            'head': 'PR No',
            'fieldName': 'prNo'
        },
        {
            'head': 'Quotation No',
            'fieldName': 'quotationNo'
        },
        {
            'head': 'PO No',
            'fieldName': 'poNo'
        },
        {
            'head': 'Invoice No',
            'fieldName': 'invoiceNo'
        },
        {
            'head': 'Invoice Amount',
            'fieldName': 'invoiceAmount'
        },
        {
            'head': 'Due Date',
            'fieldName': 'dueDate'
        },
        {
            'head': 'Payment Status',
            'fieldName': 'paymentStatus'
        },
        {
            'head': 'Remarks',
            'fieldName': 'remarks '
        },
        {
            'head': 'Action',
            'fieldName': ''
        }
    ]
    let purchaseReports_details_template = {
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
                        name: "None",
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
            console.log(purchaseReports_details_template, 'vendor_details_template', result)
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
                    template={purchaseReports_details_template}
                    onSubmit={onSubmit}
                    validate={validate}
                    showSubmitButton={false}
                    form_styles={vendor_details_style}
                    btn_styles={btn_styles}
                />
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
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