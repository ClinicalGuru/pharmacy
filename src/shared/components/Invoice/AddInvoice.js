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
import { EditableTable } from "../EditableTable/index";
import { Container } from './AddInvoice.styles'
import { useNavigate } from 'react-router-dom';



export const AddInvoice = () => {
    const navigate = useNavigate();
    const [vendorDetails, SetVendorDetails] = useState([]);
    let [passing_data_from_addinvoice_to_pharmacyinventory, setpdfatp] = useState([]);
    const [rows, setRows] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
    const [invoiceDetails, setInvoiceDetails] = useState({});
    const columns = [
        {
            'Header': 'Medicine Details',
            'accessor': 'brandName',
            editEnable: true,
        },
        {
            'Header': 'HSN Code',
            'accessor': 'hsnCode',
            editEnable: true,
        },
        {
            'Header': 'Expiry',
            'accessor': 'expiry',
            editEnable: true,
        },
        {
            'Header': 'Units / Strips',
            'accessor': 'quantity',
            editEnable: true,
        },
        {
            'Header': 'Total Strips',
            'accessor': 'noOfStrips',
            editEnable: true,
        },
        {
            'Header': 'MRP per Strip',
            'accessor': 'mrpPerStrip',
            editEnable: true,
        },
        {
            'Header': 'Price per Strip',
            'accessor': 'pricePerStrip',
            editEnable: true,
        },
        {
            'Header': 'GST',
            'accessor': 'gst',
            editEnable: true,
        },
        {
            'Header': 'Tax in',
            'accessor': '',
            editEnable: true,
        },
        {
            'Header': 'Total Price',
            'accessor': 'netPrice',
            editEnable: true,
        },
        {
            Header: "Actions",
            id: "actions",
            disableSortBy: true,
            Cell: ({ row, column, cell }) =>
                row.original.isEditing ? (
                    <>
                        <button onClick={() => handleButtonClick("save", row.original)}>
                            Save
                        </button>
                        <button onClick={() => handleButtonClick("cancel", row.original)}>
                            Cancel
                        </button>
                    </>
                ) : (
                    <button disabled={dataFetched} onClick={() => handleButtonClick("edit", row.original)}>
                        Edit
                    </button>
                ),
        },
    ];

    let vendor_details_template = {
        title: '',
        submitButttonText: 'Log in',
        formStyles: {
            backgroundColor: "#eee",
        },
        watchFields: ['invoiceDate', 'invoiceNumber', 'poNumber', 'vendorName'],
        fields: [
            {

                title: 'Invoice Number',
                type: 'autoComplete',
                name: 'invoiceNumber',
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
                type: 'autoComplete',
                name: 'poNumber',
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
                type: 'autoComplete',
                name: 'vendorId',
                options: [
                    {
                        value: "none",
                        name: "None",
                    },
                    ...vendorDetails.map(vendor => ({
                        value: vendor.id,
                        label: vendor.name,
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
                name: 'invoiceDate',
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

    const handleButtonClick = (action, row) => {
        const newData = rows.map((rowData) => {
            if (rowData.id === row.id) {
                if (action === "edit") {
                    return { ...rowData, isEditing: true, prevData: { ...rowData } };
                } else if (action === "cancel") {
                    return { ...rowData, isEditing: false, ...rowData.prevData };
                } else if (action === "save") {
                    const { prevData, ...updatedRowData } = rowData;
                    return { ...updatedRowData, isEditing: false };
                }
            }
            return rowData;
        });
        setRows(newData);
    };

    const btn_styles = { display: "flex", justifyContent: "end" };
    const onSubmit = (formData) => {


    };

    const saveInvoice = () => {
        const data = {
            ...invoiceDetails,
            rows
        }
        // console.log('save method', passing_data_from_addinvoice_to_pharmacyinventory);
        // navigate("/landing/inventory/pharmacyInventory", { state: { passing_data_from_addinvoice_to_pharmacyinventory: passing_data_from_addinvoice_to_pharmacyinventory } })
    }
    const validate = (watchValues, errorMethods) => {
        const invoiceInfo = {
            "invoiceDate": watchValues?.invoiceDate,
            "poNumber": watchValues?.poNumber,
            "vendorId": watchValues?.vendorId,
            "invoiceNumber": watchValues?.invoiceNumber
        };
        setInvoiceDetails(invoiceInfo);
    };

    const getVendors = async () => {
        // setLoader(true);
        try {
            let data = await PurchaseService.getAllVendors();
            const result = data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id }));
            SetVendorDetails(result);
        } catch (e) {
            // setLoader(false);
            console.log(e, 'error allVendors')
        }
    };
    const invoiceHandler = (formData) => {
        const { brandName, pharmacologicalName } = formData;
        const transformedObject = {
            ...formData,
            brandName: brandName?.label,
            pharmacologicalName: pharmacologicalName?.label
        };
        // const updateRows = {
        //     medicineDetails: [...rows, transformedObject]
        // }
        setRows([...rows, transformedObject]);
        // console.log(updateRows, 'updatedRows');
    }

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
            <Container>
                <AddInvoiceForm
                    onSubmit={invoiceHandler}
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

            </Box>
            <Box sx={{ marginTop: 3 }}>
                <EditableTable
                    columns={columns}
                    data={rows}
                    setData={setRows}
                    handleButtonClick={handleButtonClick}
                />
            </Box>
            <div>
                {rows.length > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '10px ' }}>
                        <Button variant="contained" onClick={() => saveInvoice()}>Save</Button>
                    </Box>
                )}

            </div>
        </Box>
    )
}