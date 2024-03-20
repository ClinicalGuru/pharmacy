
import React, { useState, useEffect, useMemo } from 'react';
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
    const [initialVendorFormState, setInitialVendorFormState] = useState([]);

    let filter = {};
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
        watchFields: ['vendorId', 'listType', 'medicinesList'],
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
            },
            {

                title: 'Medicines List',
                type: 'autoComplete',
                name: 'medicinesList',
                options: [
                    ...initialVendorFormState
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
        console.log(watchValues, 'watchValues');
        let { vendorId, listType, medicinesList } = watchValues;
        console.log(vendorId, listType, medicinesList);
        getMedicineById(medicinesList?.value)
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
    const getMedicines = async () => {
        setShowLoader(true);
        try {
            let data = await PurchaseService.getAllMedicines();
            const result = data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id }));
            result.unshift({ id: 'select', brandName: '--Select--' });
            console.log(result.map((item) => ({ value: item?.id, label: item?.brandName })), 'result');
            setInitialVendorFormState(result.map((item) => ({ value: item?.id, label: item?.brandName })));
            setShowLoader(false);
        } catch (e) {
            console.log(e, 'error allVendors');
            setShowLoader(false);
        }
    }

    useEffect(() => {
        getVendors();
        getMedicines();
    }, []);

    const getMedicineById = async (id) => {
        setShowLoader(true);
        try {
            let data = await PurchaseService.medicineById(id);
            console.log(data, 'data')
        } catch (err) {
            console.log(err, 'Master list get medicines by id');
        }
    }
    // useEffect(() => {
    //     console.log(filter, 'val');
    //     let { vendorId, listType, medicineList } = filter;
    //     // getMedicineById(medicineList?.value);
    // }, [filter])

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