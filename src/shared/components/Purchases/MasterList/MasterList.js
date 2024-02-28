
import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import { Form } from "../../Forms/index";
import Button from '@mui/material/Button';
import { Container } from "./MasterList.styles";
import PurchaseService from "../../../services/Purchase.service";
import { Table } from "../../Table";
import { Loader } from "../../Loader/index";

export const MasterList = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [vendorDetails, SetVendorDetails] = useState([]);
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
    ];
    let vendor_details_template = {
        title: '',
        formStyles: {
            backgroundColor: "#eee",
        },
        fields: [
            {

                title: 'Vendor Name',
                type: 'select',
                name: 'vendorId',
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
                name: 'listType',
                options: [
                    {
                        value: "none",
                        name: "None",
                    },
                    {
                        value: "l1",
                        name: "L1",
                    }, {
                        value: "l2",
                        name: "L2",
                    }, {
                        value: "l3",
                        name: "L3",
                    }, {
                        value: "l4",
                        name: "L4",
                    }, {
                        value: "l5",
                        name: "L5",
                    },
                ],
                validationProps: {
                    required: "This field is required"
                },
                style: {
                    width: "194px"
                }
            }
        ]
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
        console.log(watchValues, 'watchValues')
    };

    const getVendors = async () => {
        setShowLoader(true);
        try {
            let data = await PurchaseService.getAllVendors();
            const result = data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id }));
            SetVendorDetails(result);
            setShowLoader(false);
        } catch (e) {
            console.log(e, 'error allVendors');
            setShowLoader(false);
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
                    onValidate={validate}
                    showSubmitButton={false}
                    form_styles={vendor_details_style}
                    btn_styles={btn_styles}
                />
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