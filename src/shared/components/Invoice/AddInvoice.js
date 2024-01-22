import React, { useState, useEffect } from 'react';
import { FORM_LABELS } from "../../Constants/index";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


import { Box, Typography } from "@mui/material";
import { Form } from "../Forms/index";
// import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
// import { AddVendor } from "./AddVendorModal";
import PurchaseService from "../../services/Purchase.service";
import { Table } from "../Table";
import { Container } from './AddInvoice.styles'



export const AddInvoice = () => {
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
            },
            {
                title: FORM_LABELS.BATCH_NO,
                type: 'text',
                name: 'batchNo',
                validationProps: {
                    required: ` ${FORM_LABELS.BATCH_NO} is required`
                },
            },
            {
                title: FORM_LABELS.HSN_CODE,
                type: 'text',
                name: 'hsnCode',
                validationProps: {
                    required: `${FORM_LABELS.HSN_CODE} is required`
                },
            },
            {
                title: FORM_LABELS.EXPIRY,
                type: 'number',
                name: 'expiry',
                validationProps: {
                    required: `${FORM_LABELS.EXPIRY} is required`
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
                title: FORM_LABELS.NO_OF_STRIPS,
                type: 'text',
                name: 'noOfStrips',
                validationProps: {
                    required: ` ${FORM_LABELS.NO_OF_STRIPS} is required`
                },
            },
            {
                title: FORM_LABELS.FREE_STRIPS,
                type: 'text',
                name: 'freeStrips',
                validationProps: {
                    required: `${FORM_LABELS.FREE_STRIPS} is required`
                },
            },
            {
                title: FORM_LABELS.MRP_PER_STRIP,
                type: 'number',
                name: 'mrpPerStrip',
                validationProps: {
                    required: `${FORM_LABELS.MRP_PER_STRIP} is required`
                },
            },
            {
                title: FORM_LABELS.DISCOUNT,
                type: 'text',
                name: 'discount',
                validationProps: {
                    required: ` ${FORM_LABELS.DISCOUNT} is required`
                },
            },
            {
                title: FORM_LABELS.PRICE_PER_STRIP,
                type: 'text',
                name: 'pricePerStrip',
                validationProps: {
                    required: `${FORM_LABELS.PRICE_PER_STRIP} is required`
                },
            },
            {
                title: FORM_LABELS.GST,
                type: 'number',
                name: 'gst',
                validationProps: {
                    required: `${FORM_LABELS.GST} is required`
                },
            },
            {
                title: FORM_LABELS.NET_PRICE,
                type: 'number',
                name: 'netPrice',
                validationProps: {
                    required: `${FORM_LABELS.NET_PRICE} is required`
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

    const card1 = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }}>
                    Gross Amount
                </Typography>
                <Typography sx={{ fontSize: 14 }}>

                </Typography>
            </CardContent>
        </React.Fragment>
    );
    const card2 = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }}>
                    Total Discount Amount
                </Typography>
                <Typography sx={{ fontSize: 14 }}>

                </Typography>
            </CardContent>
        </React.Fragment>
    );
    const card3 = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }}>
                    Total Tax Amount
                </Typography>
                <Typography sx={{ fontSize: 14 }}>

                </Typography>
            </CardContent>
        </React.Fragment>
    );
    const card4 = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }}>
                    Round Off
                </Typography>
                <Typography sx={{ fontSize: 14 }}>

                </Typography>
            </CardContent>
        </React.Fragment>
    );
    const card5 = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }}>
                    Total Amount
                </Typography>
                <Typography sx={{ fontSize: 14 }}>

                </Typography>
            </CardContent>
        </React.Fragment>
    );

    const vendor_details_style = {
        display: "flex",
        gap: "28px 30px",
        // justifyContent: "space-around"
    };
    const medicine_details_style = {
        display: "flex",
        gap: "0px 28px",
        flexWrap: 'wrap'
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
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-around',
                marginTop: '20px'
            }}>
                <Box>
                    <Card variant="outlined" sx={{ backgroundColor: '#C6F8FF9E' }}>{card1}</Card>
                </Box>
                <Box>
                    <Card variant="outlined" sx={{ backgroundColor: '#FEF6F1FF' }}>{card2}</Card>
                </Box>
                <Box>
                    <Card variant="outlined" sx={{ backgroundColor: '#F1F4FDFF' }}>{card3}</Card>
                </Box>
                <Box>
                    <Card variant="outlined" sx={{ backgroundColor: '#FDF2F2FF' }}>{card4}</Card>
                </Box>
                <Box>
                    <Card variant="outlined" sx={{ backgroundColor: '#FEF9EEFF' }}>{card5}</Card>
                </Box>
            </Box>
            <Box sx={{ marginTop: 3 }}>
                <Table headArray={headArray} gridArray={rows} />
            </Box>
            <div>
                {rows.length > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '10px ' }}>
                        <Button variant="contained">Save</Button>
                    </Box>
                )}

            </div>
        </Box>

    )
}