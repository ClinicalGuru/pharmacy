import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { AddInvoiceForm } from './addInvoiceForm';

import { Box, Typography } from "@mui/material";
import { Form } from "../Forms/index";
// import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
// import { AddVendor } from "./AddVendorModal";
import PurchaseService from "../../services/Purchase.service";
import { Table } from "../Table";
import { Container } from './AddInvoice.styles'
import { useNavigate } from 'react-router-dom';



export const AddInvoice = () => {
    const navigate = useNavigate();
    const [vendorDetails, SetVendorDetails] = useState([]);
    const [rows, setRows] = useState([]);
    const headArray = [
        {
            'head': 'Medicine Details',
            'fieldName': 'medicineName'
        },
        {
            'head': 'HSN Code',
            'fieldName': 'hsnCode'
        },
        {
            'head': 'Expiry ',
            'fieldName': 'expiry'
        },
        {
            'head': 'Units / Strips',
            'fieldName': 'quantity'
        },
        {
            'head': 'Total Strips',
            'fieldName': 'totalStrips'
        },
        {
            'head': 'MRP per Strip',
            'fieldName': 'mrpPerStrip'
        },
        {
            'head': 'Discount',
            'fieldName': 'discount'
        },
        {
            'head': 'Price per Strip',
            'fieldName': 'pricePerStrip'
        },
        {
            'head': 'GST',
            'fieldName': 'gst'
        },
        {
            'head': 'Tax in (rs)',
            'fieldName': 'tax'
        },
        {
            'head': 'Total Price',
            'fieldName': 'totalPrice'
        },
        {
            'head': 'Action',
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

                title: 'Invoice Number',
                type: 'select',
                name: 'select',
                options: [
                    {
                        value: "none",
                        name: "None",
                    },
                ],
                validationProps: {
                    required: "Invoice num is required"
                },
                style: {
                    width: "194px"
                }
            },
            {

                title: 'PO Number',
                type: 'select',
                name: 'select',
                options: [
                    {
                        value: "none",
                        name: "None",
                    },
                ],
                validationProps: {
                    required: "PO Num is required"
                },
                style: {
                    width: "194px"
                }
            },
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
                title: 'Invoice Date',
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
    let [passing_data_from_addinvoice_to_pharmacyinventory, setpdfatp] = useState([])
    const onAddMedicine = (formData) => {
        // Check if the HSN code already exists in the rows
        const isDuplicate = rows.some(row => row.hsnCode === formData.hsnCode);
        if (isDuplicate) {
            alert("Duplicates detected. This HSN code already exists.");
        } else {
            // If not a duplicate, add the medicine data to rows
            formData['medicineName'] = formData['brandName']
            const updatedRows = [...rows, formData];
            setpdfatp(passing_data_from_addinvoice_to_pharmacyinventory = updatedRows);
            setRows(updatedRows);
        }
    };
    function save() {
        console.log('save method', passing_data_from_addinvoice_to_pharmacyinventory);
        navigate("/landing/inventory/pharmacyInventory", { state: { passing_data_from_addinvoice_to_pharmacyinventory: passing_data_from_addinvoice_to_pharmacyinventory } })
    }
    const validate = (watchValues, errorMethods) => {
        // console.log(watchValues, 'watchValues')
    };
    const getVendors = async () => {
        // setLoader(true);
        try {
            let data = await PurchaseService.getAllVendors();
            const result = data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id }));
            SetVendorDetails(result);
            console.log(vendor_details_template, 'vendor_details_template', result)
            // setAllVendors(data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id })));
            // setLoader(false);
            // console.log(allVendors, 'allVendors');
        } catch (e) {
            // setLoader(false);
            console.log(e, 'error allVendors')
        }
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
            </Container>
            <Container>
                <AddInvoiceForm />
            </Container>
            <Box
                sx={{
                    backgroundColor: '#eef0f3',
                    borderRadius: '4px',
                    padding: 2,
                    marginTop: '5px'
                }}
            >

            </Box>
            <Box sx={{ marginTop: 3 }}>
                <Table headArray={headArray} gridArray={rows} />
            </Box>
            <div>
                {rows.length > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '10px ' }}>
                        <Button variant="contained" onClick={() => save()}>Save</Button>
                    </Box>
                )}

            </div>
        </Box>
    )
}