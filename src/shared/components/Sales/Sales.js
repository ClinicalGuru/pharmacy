import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useForm } from 'react-hook-form'
import { BillingSummaryForm } from "./BillingSummaryForm"
import { PrintBill } from "./PrintBill"
//material ui
import { Form } from "../Forms/index";
import { Table } from "../Table/index";
import { Loader } from "../Loader/index";
import { SalesForm } from "./SalesForm";
import { Notification } from '../Notification/index';
import { Container } from './Sales.styles';
import SalesService from '../../services/sales.service';
import InventoryService from '../../services/inventory.service';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const Sales = () => {
    const [billingDetails, setBillingDetails] = useState({});
    const [showLoader, setShowLoader] = useState(false);
    const [reset, setRestForm] = useState(false);
    const [rows, setRows] = useState([]);
    const [printData, setPrintData] = useState([]);
    const [netPrice, setNetprice] = useState(0);
    const [patientDetails, setPatientDetails] = useState([]);
    const [notification, setNotification] = useState(false);
    const [editingRow, setEditngRow] = useState({});
    const [editingIndex, setEditngIndex] = useState(-1);
    const [showPrint, SetShowPrint] = useState(false);
    const [notificationMsg, setNotificationMsg] = useState({
        message: '',
        severity: ''
    });
    const [inventory, readInventory] = useState();
    const columns = [
        {
            'Header': 'Pharmacological Name',
            'accessor': 'pharmacologicalName',
            editEnable: true,
        },
        {
            'Header': 'Brand Name',
            'accessor': 'brandName',
            editEnable: true,
        },
        {
            'Header': 'Batch No',
            'accessor': 'batchNo',
            editEnable: true,
        },
        {
            'Header': 'HSN Code',
            'accessor': 'hsnCode',
            editEnable: true,
        },
        {
            'Header': 'Price',
            'accessor': 'pricePerUnit',
            editEnable: true,
        },
        {
            'Header': 'Qty',
            'accessor': 'quantity',
            editEnable: true,
        },
        {
            'Header': 'Total',
            'accessor': 'total',
            editEnable: false,
        },
        {
            'Header': 'Discount',
            'accessor': 'discount',
            editEnable: true,
        },
        {
            'Header': 'Amount',
            'accessor': 'amount',
            editEnable: true,
        },
        {
            Header: "Actions",
            id: "actions"
        },
    ];

    const patient_details_template = {
        title: '',
        submitButttonText: 'Log in',
        formStyles: {
            backgroundColor: "#eee",
        },
        watchFields: ['patientName', 'gender', 'age', 'phone', 'email', 'referredDoctor', 'otc'],
        fields: [
            {
                title: 'Patient Name',
                type: 'text',
                name: 'patientName',
                validationProps: {
                    required: "Patient Name is required"
                },
                style: {
                    width: "150px"
                }
            },
            {

                title: 'Gender',
                type: 'select',
                name: 'gender',
                options: [
                    {
                        value: "male",
                        name: "Male"
                    },
                    {
                        value: "female",
                        name: "Female"
                    }
                ],
                style: {
                    width: "100px",
                    height: "38px"
                }
            },
            {
                title: 'Age',
                type: 'number',
                name: 'age',
                validationProps: {
                    required: "Age is required"
                },
                style: {
                    width: "60px"
                }
            },
            {
                title: 'Phone',
                type: 'number',
                name: 'phone',
                validationProps: {
                    required: "Phone number is required"
                },
                style: {
                    width: "150px"
                }
            },
            {
                title: 'Email',
                type: 'email',
                name: 'email',
                style: {
                    width: "150px"
                }
            },
            {
                title: 'Referred Doctor',
                type: 'text',
                name: 'referredDoctor',
                style: {
                    width: "194px"
                }
            },
            {

                title: 'OTC/Rx',
                type: 'select',
                name: 'otc',
                options: [
                    {
                        value: "otc",
                        name: "OTC"
                    },
                    {
                        value: "rx",
                        name: "Rx"
                    }
                ],
                style: {
                    width: "100px",
                    height: "38px"
                }
            },
        ],
    };
    const patient_details_style = {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: 'wrap'
    };

    const btn_styles = { display: "flex", gap: "20px 20px", justifyContent: "end" };

    const validate = (watchValues, errorMethods) => {
        setPatientDetails(watchValues);
    };

    const handleSubmitForm = (formData) => {
        const { pharmacologicalName, brandName } = formData;
        const transformedObject = {
            ...formData,
            pharmacologicalName: pharmacologicalName?.label,
            brandName: brandName?.label,
            medicineId: brandName?.value
        };
        const isDuplicate = rows.some(row =>
            row.pharmacologicalName === transformedObject.pharmacologicalName &&
            row.brandName === transformedObject.brandName
        );
        if (isDuplicate) {
            alert('Duplicate data cannot be added.');
            setShowLoader(false);
            return;
        }
        if (editingIndex !== -1) {
            let newArray = [...rows.slice(0, editingIndex), transformedObject, ...rows.slice(editingIndex + 1)];
            setRows([...newArray]);
        } else {
            setRows([...rows, transformedObject]);
        }

        setRows([...rows, transformedObject]);
        setPrintData([...rows, transformedObject]);
        setEditngIndex(-1);
    };

    useEffect(() => {
        const totalNetPrice = rows.reduce((accumulator, currentRow) => {
            return accumulator + currentRow.amount;
        }, 0);
        setNetprice(totalNetPrice);
    }, [rows]);

    useEffect(() => {
        const getInventory = async () => {
            try {
                let data = await InventoryService.getInventory();
                const result = data?.docs?.map((doc) => ({ ...doc?.data(), id: doc?.id }));
                result.forEach(item => {
                    item['unitsInStock'] = (item?.quantity * (Number(item?.noOfStrips) + Number(item?.freeStrips)));
                });
                readInventory(result);
            } catch (err) {
                console.log(err, 'error getting inventory in sales');
            }
        }
        getInventory();
    }, [])

    const alertState = () => {
        setNotification(!notification);
    };

    const addPatient = async (patientDetails, data) => {
        setShowLoader(true);
        try {
            const patientId = await SalesService.addPatient(patientDetails);
            // console.log(patientId, 'patientId');
            const billDetails = {
                patientId: patientId,
                medicineDetails: rows,
                ...data
            };
            await SalesService.addPharmacyBilling(billDetails).then(() => {
                console.log('success saving');
                quantityUpdate();
            });
        }
        catch (err) {
            console.log(err, 'err adding medicine data');
            setShowLoader(false);
        }
    }

    const quantityUpdate = async () => {
        let medicineIds = rows.map((item) => item?.medicineId);
        console.log(medicineIds, 'medIds');
        const querySnapshot = await InventoryService.queryInventoryWithMedicineIds(medicineIds)
        querySnapshot.forEach((doc) => {
            const inventory = [];
            inventory.push({ inventoryId: doc.id, ...doc.data() });
            const updatedInventoryDetails = inventory.map((inv) => {
                const matchMed = rows.find((row) => row?.medicineId === inv?.medicineId);
                if (matchMed) {
                    const updatedQuantity = +inv?.quantity - +matchMed?.quantity;
                    return {
                        ...inv,
                        quantity: updatedQuantity
                    }
                }
            });
            updatingInventory(updatedInventoryDetails);
        });
    }

    const updatingInventory = async (data) => {
        console.log(data, 'inv updating');
        setShowLoader(true);
        await InventoryService.updatingInventory(data).then(() => {
            console.log("Inventory updated successfully");
            setRestForm(true);
            SetShowPrint(true);
            setRows([]);
            setShowLoader(false);
        });
    }

    const handleSubmitBillingForm = (data) => {
        console.log(data, 'billDta');
        setBillingDetails(data);
        if (patientDetails?.patientName === '') {
            setNotification(true);
            setNotificationMsg({
                message: `Please fill Patient name`,
                severity: "error"
            });
            return;
        };
        addPatient(patientDetails, data);
    }

    const onSubmit = (form, formType) => {

    };
    const dataCallback = (row, i) => {
        setEditngRow(row);
        setEditngIndex(i);
    }
    return (
        <Box sx={{ flexGrow: 1, padding: '1rem' }}>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <Form
                        template={patient_details_template}
                        onSubmit={onSubmit}
                        onValidate={validate}
                        showSubmitButton={false}
                        form_styles={patient_details_style}
                        btn_styles={btn_styles}

                    />
                    <Container>
                        <SalesForm
                            onSubmitForm={handleSubmitForm}
                            inventory={inventory}
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
                </Grid>
                <Grid item xs={3}>
                    <Box sx={{
                        backgroundColor: '#eef0f3',
                        borderRadius: '4px',
                        padding: 2,
                        marginTop: '4px',
                        flex: 1
                    }}>
                        <BillingSummaryForm netPrice={netPrice} onSubmitBillingForm={handleSubmitBillingForm} patientDetails={patientDetails} medicineDetails={rows} resetForm={reset} />
                    </Box>
                </Grid>
            </Grid>
            <Loader open={showLoader} />
            {notification && <Notification severity={notificationMsg?.severity} message={notificationMsg?.message} action={alertState} />}
            {showPrint && <PrintBill billDetails={billingDetails} medicineDetails={printData} patientDetails={patientDetails} />}
        </Box>
    )
}