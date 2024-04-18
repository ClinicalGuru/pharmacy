import { useState, useEffect } from "react";

import { useForm } from 'react-hook-form'
import { BillingSummaryForm } from "./BillingSummaryForm"

//material ui
import { Box } from "@mui/material";
import { Form } from "../Forms/index";
import { EditableTable } from "../EditableTable";
import { Loader } from "../Loader/index";
import { SalesForm } from "./SalesForm";

import { Notification } from '../Notification/index';
import { Container } from './Sales.styles'
import SalesService from '../../services/sales.service'

export const Sales = () => {
    const { watch, formState: { errors } } = useForm();
    const [dataFetched, setDataFetched] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [rows, setRows] = useState([]);
    const [netPrice, setNetprice] = useState(0);
    const [patientDetails, setPatientDetails] = useState([]);
    const [notification, setNotification] = useState(false);
    const [notificationMsg, setNotificationMsg] = useState({
        message: '',
        severity: ''
    });

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
            'accessor': 'price',
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
                    width: "250px"
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
                    width: "250px"
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
        justifyContent: "space-between"
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
        };
        setRows([...rows, transformedObject]);
    };

    useEffect(() => {
        const totalNetPrice = rows.reduce((accumulator, currentRow) => {
            return accumulator + currentRow.amount;
        }, 0);
        setNetprice(totalNetPrice);
    }, [rows]);

    const alertState = () => {
        setNotification(!notification);
    };

    const addPatient = async (patientDetails, data) => {
        try {
            const patientId = await SalesService.addPatient(patientDetails);
            console.log(patientId, 'sndsncnsdc');
            const billDetails = {
                patientId: patientId,
                medicineDetails: rows,
                ...data
            }
            SalesService.addPharmacyBilling(billDetails).then(() => {
                console.log('success saving')
            })
        }
        catch(err) {
            console.log(err, 'err adding medicine data');
        }
    }

    const handleSubmitBillingForm = (data) => {
        console.log(data, 'billDta');
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

    return (
        <Box sx={{
            padding: 2,
            backgroundColor: "#c0a6a614",
            display: "flex"
        }}>
            <Box
                sx={{
                    flex: "4",
                    marginRight: "50px"
                }}>
                <Form
                    template={patient_details_template}
                    onSubmit={onSubmit}
                    onValidate={validate}
                    showSubmitButton={false}
                    form_styles={patient_details_style}
                    btn_styles={btn_styles}

                />
                <Container>
                    <SalesForm onSubmitForm={handleSubmitForm} />
                </Container>

                <Box sx={{ marginTop: 3 }}>
                    <EditableTable
                        columns={columns}
                        data={rows}
                        setData={setRows}
                        handleButtonClick={handleButtonClick}
                    />
                </Box>

            </Box>
            <Box sx={{
                backgroundColor: '#eef0f3',
                borderRadius: '4px',
                padding: 2,
                marginTop: '4px',
                flex: 1
            }}>
                <BillingSummaryForm netPrice={netPrice} onSubmitBillingForm={handleSubmitBillingForm} />
            </Box>
            <Loader open={showLoader} />
            {notification && <Notification severity={notificationMsg?.severity} message={notificationMsg?.message} action={alertState} />}
        </Box>
    )
}