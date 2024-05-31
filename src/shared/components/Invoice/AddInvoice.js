import React, { useState, useEffect } from 'react';
import { AddInvoiceForm } from './addInvoiceForm';
import { Notification } from '../Notification/index';
import { Box, Button } from "@mui/material";
import { Form } from "../Forms/index";
import PurchaseService from "../../services/Purchase.service";
import InventoryService from "../../services/inventory.service";
import { Container } from './AddInvoice.styles';
import { getUndefinded } from '../../../utils/helper';
import { Loader } from "../Loader/index";
import { Table } from '../Table/index';

const columns = [
    { Header: 'Medicine Details', accessor: 'brandName' },
    { Header: 'Batch No', accessor: 'batchNo' },
    { Header: 'HSN Code', accessor: 'hsnCode' },
    { Header: 'Expiry', accessor: 'expiry' },
    { Header: 'Units / Strips', accessor: 'quantity' },
    { Header: 'Total Strips', accessor: 'noOfStrips' },
    { Header: 'MRP per Strip', accessor: 'mrpPerStrip' },
    { Header: 'Price per Strip', accessor: 'pricePerStrip' },
    { Header: 'GST', accessor: 'gst' },
    { Header: 'Tax in', accessor: '' },
    { Header: 'Total Price', accessor: 'netPrice' },
    { Header: "Actions", id: "actions" },
];

const vendorDetailsTemplate = {
    title: '',
    submitButttonText: 'Log in',
    formStyles: { backgroundColor: "#eee" },
    watchFields: ['invoiceDate', 'invoiceNumber', 'poNumber', 'vendorName', 'invoicedueDate'],
    fields: [
        {
            title: 'Invoice Number', type: 'autoComplete', name: 'invoiceNumber',
            options: [{ value: "none", name: "None" }],
            validationProps: { required: "Invoice num is required" }, style: { width: '194px' }
        },
        {
            title: 'PO Number', type: 'autoComplete', name: 'poNumber',
            options: [{ value: "none", name: "None" }],
            validationProps: { required: "PO Num is required" }, style: { width: "194px" }
        },
        {
            title: 'Vendor Name', type: 'autoComplete', name: 'vendorId',
            options: [{ value: "none", name: "None" }],
            validationProps: { required: "Vendor name is required" }, style: { width: "194px" }
        },
        {
            title: 'Invoice Date', type: 'date', name: 'invoiceDate',
            validationProps: { required: "Date is required" }, style: { width: "194px" }
        },
        {
            title: 'Invoice Due Date', type: 'date', name: 'invoiceDueDate',
            validationProps: { required: "Date is required" }, style: { width: "194px" }
        },
    ],
};

const vendorDetailsStyle = { display: "flex", gap: "28px 30px" };
const btnStyles = { display: "flex", justifyContent: "end" };

export const AddInvoice = () => {
    const [loader, setLoader] = useState(false);
    const [vendorDetails, setVendorDetails] = useState([]);
    const [rows, setRows] = useState([]);
    const [invoiceDetails, setInvoiceDetails] = useState({});
    const [resetVendorForm, setResetVendorForm] = useState(false);
    const [resetInvoiceForm, setResetInvoiceForm] = useState(false);
    const [notification, setNotification] = useState(false);
    const [notificationMsg, setNotificationMsg] = useState({ message: '', severity: '' });
    const [pharmacologicalNames, setPharmacologicalNames] = useState([]);
    const [brandNames, setBrandNames] = useState([]);
    const [editingRow, setEditingRow] = useState({});
    const [editingIndex, setEditingIndex] = useState(-1);

    useEffect(() => {
        const fetchData = async () => {
            setLoader(true);
            try {
                const [medicinesData, vendorsData] = await Promise.all([
                    PurchaseService.getAllMedicines(),
                    PurchaseService.getAllVendors()
                ]);

                const medicines = medicinesData.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                const vendors = vendorsData.docs.map(doc => ({ ...doc.data(), id: doc.id }));

                setPharmacologicalNames(medicines.map(item => ({ value: item.id, name: item.pharmacologicalName })));
                setBrandNames(medicines.map(item => ({ value: item.id, name: item.brandName })));
                setVendorDetails(vendors);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoader(false);
            }
        };
        fetchData();
    }, []);

    const onSubmit = (formData) => {
        // Form submission logic
    };

    const validate = (watchValues) => {
        setInvoiceDetails({
            invoiceDate: watchValues?.invoiceDate,
            poNumber: watchValues?.poNumber?.value,
            vendorId: watchValues?.vendorId?.value,
            invoiceNumber: watchValues?.invoiceNumber?.value,
        });
    };

    const saveInvoice = async () => {
        const missingFields = getUndefinded(invoiceDetails);
        if (missingFields?.length > 0) {
            setNotificationMsg({
                message: `Please fill mandatory fields: ${missingFields.join(', ')}`,
                severity: "error"
            });
            setNotification(true);
            return;
        }

        const data = { ...invoiceDetails, medicines: rows };
        setLoader(true);
        try {
            await InventoryService.addInvoice(data);
            await InventoryService.addInventory(rows);
            setNotificationMsg({ message: 'Invoice and medicines added successfully', severity: 'success' });
            setRows([]);
            setResetVendorForm(true);
            setResetInvoiceForm(true);
            setEditingIndex(-1); // Reset the editing index here
        } catch (error) {
            setNotificationMsg({ message: 'Something went wrong', severity: 'error' });
            console.error('Error saving invoice data:', error);
        } finally {
            setLoader(false);
            setNotification(true);
        }
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
            alert('Price per strip cannot be more than MRP per strip');
            setLoader(false);
            return;
        }

        const isDuplicate = rows.some(row =>
            Object.keys(transformedObject).every(key => row[key] === transformedObject[key])
        );

        if (isDuplicate) {
            setNotificationMsg({ message: 'Duplicate data cannot be added.', severity: 'error' });
            setNotification(true);
            setLoader(false);
            setEditingIndex(-1);
            setEditingRow({});
            return;
        }

        if (editingIndex !== -1) {
            const updatedRows = [...rows.slice(0, editingIndex), transformedObject, ...rows.slice(editingIndex + 1)];
            setRows(updatedRows);
        } else {
            setRows([...rows, transformedObject]);
        }

        setResetInvoiceForm(true);
        setLoader(false);
        setEditingIndex(-1);
    };

    const dataCallback = (row, index) => {
        setEditingRow(row);
        setEditingIndex(index);
    };

    const deleteRow = (index) => {
        setRows(rows.filter((_, i) => i !== index));
    };

    const alertState = () => {
        setNotification(false);
    };

    const handleReset = () => {
        setResetVendorForm(true);
        setResetInvoiceForm(true);
        setEditingIndex(-1); // Reset editing index to enable save button
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Container>
                <Form
                    template={vendorDetailsTemplate}
                    onSubmit={onSubmit}
                    onValidate={validate}
                    showSubmitButton={false}
                    form_styles={vendorDetailsStyle}
                    btn_styles={btnStyles}
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
                    deleteRow={deleteRow}
                    />
                </Box>
                {rows.length > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '10px' }}>
                        <Button disabled={editingIndex >= 0} variant="contained" onClick={saveInvoice}>Save</Button>
                    </Box>
                )}
                <Loader open={loader} />
                {notification && <Notification severity={notificationMsg.severity} message={notificationMsg.message} action={alertState} />}
            </Box>
        );
    };
    
