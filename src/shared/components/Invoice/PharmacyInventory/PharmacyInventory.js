

import React, { useState, useEffect, props } from 'react';
import { Box, } from "@mui/material";
import { Form } from "../../Forms/index";
// import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
// import { AddVendor } from "./AddVendorModal";
import PurchaseService from "../../../services/inventory.service";
import EnhancedTable from './denseTable'
import { Container } from "./PharmacyInventory.styles";
import { useLocation } from 'react-router-dom';
import inventoryService from '../../../services/inventory.service';

export const PharmacyInventory = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [vendorDetails, SetVendorDetails] = useState([]);
    const [rowToEdit, setRowToEdit] = useState(null);
    let [rows, setRows] = useState([]);
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
    const location = useLocation();
    let state = location.state

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
    // const handleDeleteRow = (targetIndex) => {
    //     setRows(rows.filter((_, idx) => idx !== targetIndex));
    // };

    const handleEditRow = (idx) => {
        setRowToEdit(idx);
        setModalOpen(true);
    };


    useEffect(() => {
        const getInventory = async () => {
            try {
                const data = await inventoryService.getAllInventory();
                const result = data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id }));
                setRows(result);
            } catch (err) {
                console.log(err, 'error getting inventory')
            }
        }
        getInventory();
    }, [])


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
                <EnhancedTable data = {rows}/>
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