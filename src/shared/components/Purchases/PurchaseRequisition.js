import React, { useState, useEffect, useCallback } from 'react';
import { FORM_LABELS } from "../../Constants/index";

import { Box } from "@mui/material";
import { Form } from "../Forms/index";
// import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import { Container } from "./PurchaseRequisition.styles";
import { AddVendor } from "./AddVendorModal";
import PurchaseService from "../../services/Purchase.service";
import { Table } from "../Table";
export const PurchaseRequisition = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [vendorDetails, SetVendorDetails] = useState([]);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [rows, setRows] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState({})
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

                title: 'Vendor Name',
                type: 'select',
                name: 'vendorName',
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
                title: 'Date',
                type: 'date',
                name: 'date',
                validationProps: {
                    required: "Date is required"
                },
                style: {
                    width: "194px"
                }
            }
        ],
        watchFields: ['vendorName', 'date']
    };
    const medicine_details_template = {
        title: '',
        submitButttonText: '+ Add',
        clearFormBtnText: "Clear",
        formStyles: {
            backgroundColor: "#FFFFFF",
        },
        isBlockLevelBtns: false,
        watchFields: [],
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
                style: {
                    width: "200px"
                }
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
                style: {
                    width: "200px"
                }
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
        // gap: "28px 28px",
        justifyContent: 'space-between'
    };
    const btn_styles = { display: "flex", justifyContent: "end" };
    const onSubmit = (form) => {
        console.log(form);
    };
    const onAddMedicine = (formData) => {
        const updatedRows = [...rows, formData];
        setRows(updatedRows);
        console.log(rows, 'medicine added');
    };
    const validate = useCallback((watchValues, errorMethods) => {
        setSelectedVendor(prevState => ({
            ...prevState,
            vendorId: watchValues.vendorName?.id || '',
            date: watchValues.date || ''
        }));
        console.log('selectedVendor')
    }, []);

    // const handleDeleteRow = (targetIndex) => {
    //     setRows(rows.filter((_, idx) => idx !== targetIndex));
    // };

    // const handleEditRow = (idx) => {
    //     setRowToEdit(idx);
    //     setModalOpen(true);
    // };
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
    });
    const savePurchageRequisition = () => {
        // const data = {
        //     vendorDetails: form
        // }
    }
    const printPurchageRequisition = () => {

    }
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
                    <Button variant="contained" onClick={() => setModalOpen(true)}>+ Add Vendor</Button>

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
            {modalOpen && <AddVendor showModal={modalOpen} action={() => setModalOpen(!modalOpen)} refreshVendorNewVendors={() => refreshVendorNewVendors} />}
            {rows.length > 0 && <Box>
                <Button variant="contained" onClick={() => savePurchageRequisition()}>Save</Button>
                <Button variant="contained" onClick={() => printPurchageRequisition()}>Print</Button>
            </Box>}
        </Box>
    )
}