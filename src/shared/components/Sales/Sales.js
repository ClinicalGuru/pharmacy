import { useState, useEffect } from "react";

import { useForm } from 'react-hook-form'
import { FORM_LABELS } from "../../Constants/index";
import { BillingSummaryForm } from "./BillingSummaryForm"

//material ui
import { Box } from "@mui/material";
import { Form } from "../Forms/index";
import { EditableTable } from "../EditableTable";
import { Loader } from "../Loader/index";
import { SalesForm } from "./SalesForm";

import { Container } from './Sales.styles'

export const Sales = () => {
    const { watch, formState: { errors } } = useForm();
    const [dataFetched, setDataFetched] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [rows, setRows] = useState([]);
    const [netPrice, setNetprice] = useState(0);
    const [billDetails, setBillDetails] = useState({
        discount: 0,
        gst: 0,
        netPrice: 0,
        roundOff: 0,
        billAmount: 0,
        paymentMode: "",
        remarks: ""
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
                    height: "35px"
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
                name: 'referred doctor',
                style: {
                    width: "194px"
                }
            },
            {

                title: 'OTC/Rx',
                type: 'select',
                name: 'select',
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
                    height: "35px"
                }
            },
        ],
    };
    const bill_details = {
        title: '',
        submitButttonText: 'Save',
        clearFormBtnText: "Print",
        formStyles: {
            backgroundColor: "#FFFFFF",
        },
        fields: [
            {
                title: FORM_LABELS.DISCOUNT,
                type: 'number',
                name: 'discount',
                value: billDetails.discount,
                style: {
                    width: "150px"
                }
            },
            {

                title: FORM_LABELS.GST,
                type: 'number',
                name: 'gst',
                value: billDetails.gst,
                style: {
                    width: "100px"
                }
            },
            {
                title: FORM_LABELS.NET_PRICE,
                type: 'number',
                name: 'netPrice',
                value: billDetails.netPrice,
                validationProps: {
                    required: ` ${FORM_LABELS.NET_PRICE} is required`
                },
            },
            {
                title: FORM_LABELS.ROUND_OFF,
                type: 'number',
                name: 'roundOff',
                value: billDetails.roundOff
            },
            {
                title: FORM_LABELS.BILL_AMOUNT,
                type: 'number',
                name: 'billAmount',
                value: billDetails.billAmount
            },
            {
                title: FORM_LABELS.PAYMENT_MODE,
                type: 'select',
                name: FORM_LABELS.PAYMENT_MODE,
                validationProps: {
                    required: `${FORM_LABELS.PAYMENT_MODE} is required`
                },
                options: [
                    {
                        value: "cash",
                        name: "Cash"
                    },
                    {
                        value: "card",
                        name: "Card"
                    },
                    {
                        value: "upi",
                        name: "UPI"
                    }
                ],
                style: {
                    height: "35px"
                }
            },
            {
                title: FORM_LABELS.ADD_REMARKS,
                type: 'text',
                name: FORM_LABELS.ADD_REMARKS
            },
        ],
        btns: [
            {
                btn_text: "Save & Print",
            }
        ]
    };
    const patient_details_style = {
        display: "flex",
        // gap: "28px 10px",
        justifyContent: "space-between"
    };
    const bill_details_styles = {
        display: "grid",
        columnGap: "20px",
        gridTemplateColumns: "auto auto",
    }
    const btn_styles = { display: "flex", gap: "20px 20px", justifyContent: "end" };

    const validate = (watchValues, errorMethods) => {
        // console.log(watchValues, 'watchValues')
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

    const onSubmit = (form, formType) => {
        // if (formType === "medicine_details_template") {
        //     // onAddMedicine(form);
        //     resetMedicineForm();
        // } else {
        //     console.log(form);
        // }
    };

    return (
        <Box sx={{
            padding: 2,
            backgroundColor: "#c0a6a614"
        }}>
            <Form
                template={patient_details_template}
                onSubmit={onSubmit}
                validate={validate}
                showSubmitButton={false}
                form_styles={patient_details_style}
                btn_styles={btn_styles}
            />
            <Box
                sx={{
                    display: "flex"
                }}>
                <Box
                    sx={{
                        flex: "4",
                        marginRight: "50px"
                    }}>
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
                    <BillingSummaryForm netPrice={netPrice} />
                </Box>
            </Box>
            <Loader open={showLoader} />
        </Box>
    )
}