import React, { useState, useEffect } from 'react';
import { AddInvoiceForm } from './addInvoiceForm';
import { Notification } from '../Notification/index';
import { Box } from "@mui/material";
import { Form } from "../Forms/index";
import Button from '@mui/material/Button';
import PurchaseService from "../../services/Purchase.service";
import InventoryService from "../../services/inventory.service";
import { Container } from './AddInvoice.styles';
import { getUndefinded } from '../../../utils/helper'
import { Loader } from "../Loader/index";
import { Table } from '../Table/index'

export const AddInvoice = () => {
    const [loader, setLoader] = useState(false);
    const [vendorDetails, SetVendorDetails] = useState([]);
    const [rows, setRows] = useState([]);
    const [invoiceDetails, setInvoiceDetails] = useState({});
    const [reset, setRestForm] = useState(false);
    const [notification, setNotification] = useState(false);
    const [pharmacologicalNames, setPharmacologicalNames] = useState([]);
    const [brandNames, setBrandNames] = useState([]);
    const [editingRow, setEditngRow] = useState({});
    const [editingIndex, setEditngIndex] = useState(-1);
    const [resetVendorForm, setResetVendorForm] = useState(false);
    const [resetInvoiceForm, setResetInvoiceForm] = useState(false);
    const [notificationMsg, setNotificationMsg] = useState({
        message: '',
        severity: ''
    });
    const columns = [
        {
            'Header': 'Medicine Details',
            'accessor': 'brandName',
        },
        {
            'Header': 'Batch No',
            'accessor': 'batchno',
        },
        {
            'Header': 'HSN Code',
            'accessor': 'hsnCode',
        },
        {
            'Header': 'Expiry',
            'accessor': 'expiry',
        },
        {
            'Header': 'Units / Strips',
            'accessor': 'quantity',
        },
        {
            'Header': 'Total Strips',
            'accessor': 'noOfStrips',
        },
        {
            'Header': 'MRP per Strip',
            'accessor': 'mrpPerStrip',
        },
        {
            'Header': 'Price per Strip',
            'accessor': 'pricePerStrip',
        },
        {
            'Header': 'GST',
            'accessor': 'gst',
        },
        {
            'Header': 'Tax in',
            'accessor': '',
        },
        {
            'Header': 'Total Price',
            'accessor': 'netPrice',
        },
        {
            Header: "Actions",
            id: "actions",
            // disableSortBy: true,
            // Cell: ({ row, column, cell }) =>
            //     row.original.isEditing ? (
            //         <>
            //             <button onClick={() => handleButtonClick("save", row.original)}>
            //                 Save
            //             </button>
            //             <button onClick={() => handleButtonClick("cancel", row.original)}>
            //                 Cancel
            //             </button>
            //         </>
            //     ) : (
            //         <button disabled={dataFetched} onClick={() => handleButtonClick("edit", row.original)}>
            //             Edit
            //         </button>
            //     ),
        },
    ];

    let vendor_details_template = {
        title: '',
        submitButttonText: 'Log in',
        formStyles: {
            backgroundColor: "#eee",
        },
        watchFields: ['invoiceDate', 'invoiceNumber', 'poNumber', 'vendorName', 'invoicedueDate'],
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
                    width: '194px'
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
            {
                title: 'Invoice Due Date',
                type: 'date',
                name: 'invoiceDueDate',
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
    };

    const btn_styles = { display: "flex", justifyContent: "end" };
    const onSubmit = (formData) => {

    };
    const alertState = () => {
        setNotification(!notification);
    };
    const saveInvoice = async () => {
        const rslt = getUndefinded(invoiceDetails)
        if (rslt?.length > 0) {
            setNotification(true);
            setNotificationMsg({
                message: `Please fill manditory fields ${rslt.join(',')}`,
                severity: "error"
            });
            return;
        }
        const data = {
            ...invoiceDetails,
            medicines: rows
        }
        setLoader(true);
        try {
            await InventoryService.addInvoice(data);
            await InventoryService.addInventory(rows);
            setNotification(true);
            setNotificationMsg({
                message: 'Invoice created successfully',
                severity: 'success'
            });
            setNotificationMsg({
                message: 'Medicines added to inventory',
                severity: 'success'
            });
            setRows([]);
            setResetVendorForm(true); // Trigger the reset

            setLoader(false);
        } catch (err) {
            setLoader(false);
            setNotificationMsg({
                message: 'Something went wrong',
                severity: 'error'
            });
            console.log(err, 'error while saving invoive data!');
        }
    }
    const validate = (watchValues, errorMethods) => {
        const invoiceInfo = {
            "invoiceDate": watchValues?.invoiceDate,
            "poNumber": watchValues?.poNumber?.value,
            "vendorId": watchValues?.vendorId?.value,
            "invoiceNumber": watchValues?.invoiceNumber?.value
        };
        setInvoiceDetails(invoiceInfo);
    };

    const invoiceHandler = (formData) => {
        setLoader(true);
        const { brandName, pharmacologicalName } = formData;
        const transformedObject = {
            ...formData,
            brandName: brandName?.label,
            pharmacologicalName: pharmacologicalName?.label,
            medicineId: brandName?.value
        };
        if (+transformedObject.pricePerStrip > +transformedObject.mrpPerStrip) {
            alert('Price per strip canbot be more than Mrp per strip');
            setLoader(false);
            return;
        }
        console.log(transformedObject, 'fhencvhjfnvchjfncvhfenhfnhn');
        const isDuplicate = rows.some(row =>
            row.pharmacologicalName === transformedObject.pharmacologicalName &&
            row.brandName === transformedObject.brandName &&
            row.batchNo === transformedObject.batchNo &&
            row.hsnCode === transformedObject.hsnCode &&
            row.expiry === transformedObject.expiry &&
            row.quantity === transformedObject.quantity &&
            row.pricePerStrip === transformedObject.pricePerStrip &&
            row.mrpPerStrip === transformedObject.mrpPerStrip &&
            row.noOfStrips === transformedObject.noOfStrips &&
            row.freeStrips === transformedObject.freeStrips &&
            row.discount === transformedObject.discount &&
            row.gst === transformedObject.gst
        );

        if (isDuplicate) {
            setNotification(true);
            setNotificationMsg({
                message: 'Duplicate data cannot be added.',
                severity: 'error'
            });
            setLoader(false);
            return;
        }
        if (editingIndex !== -1) {
            let newArray = [...rows.slice(0, editingIndex), transformedObject, ...rows.slice(editingIndex + 1)];
            setRows([...newArray]);
        } else {
            setRows([...rows, transformedObject]);
        }
        setResetInvoiceForm(true);
        setLoader(false);
        setEditngIndex(-1);
    }



    useEffect(() => {
        const getMedicines = async () => {
            // setShowLoader(true);
            try {
                let data = await PurchaseService.getAllMedicines();
                const result = data?.docs?.map((doc) => ({ ...doc?.data(), id: doc?.id }));
                setPharmacologicalNames(result?.map((item) => ({ value: item?.id, name: item?.pharmacologicalName })));
                setBrandNames(result?.map((item) => ({ value: item?.id, name: item?.brandName })));
                // setShowLoader(false);
            } catch (e) {
                console.log(e, 'error allVendors');
                // setShowLoader(false);
            }
        };
        const getVendors = async () => {
            setLoader(true);
            try {
                let data = await PurchaseService.getAllVendors();
                const result = data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id }));
                SetVendorDetails(result);
                setLoader(false);
            } catch (e) {
                setLoader(false);
                console.log(e, 'error allVendors')
            }
        };
        getMedicines();
        getVendors();
    }, []);

    const dataCallback = (row, i) => {
        setEditngRow(row);
        setEditngIndex(i);
    }
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
                    resetTrigger={resetVendorForm}
                />
            </Container>
            <Container>
                <AddInvoiceForm
                    onSubmit={invoiceHandler}
                    resetTrigger={resetInvoiceForm}
                    pData={pharmacologicalNames}
                    bData={brandNames}
                    data={editingRow}
                />
            </Container>
            <Box sx={{ marginTop: 3 }}>
                <Table
                    headArray={columns}
                    gridArray={rows}
                    setData={setRows}
                    dataCallback={dataCallback}
                />
            </Box>
            <div>
                {rows.length > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '10px ' }}>
                        <Button disabled={editingIndex >= 0} variant="contained"
                            type="submit" onClick={() => saveInvoice()}>Save</Button>
                    </Box>
                )}
            </div>
            <Loader open={loader} />
            {notification && <Notification severity={notificationMsg?.severity} message={notificationMsg?.message} action={alertState} />}
        </Box>
    )
}