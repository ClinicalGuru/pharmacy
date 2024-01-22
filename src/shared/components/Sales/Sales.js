import { useState } from "react";
import { useForm } from "react-hook-form";
import { FORM_LABELS } from "../../Constants/index";

//material ui
import { Box } from "@mui/material";
import Button from '@mui/material/Button';
import { Form } from "../Forms/index";
import { Table } from "../Table";

export const Sales = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [rows, setRows] = useState([]);
    const headArray = [
        {
            'head': 'Pharmacological Name',
            'fieldName': 'pharmacologicalName'
        },
        {
            'head': 'Medicine Name',
            'fieldName': 'medicineName'
        },
        {
            'head': 'Batch',
            'fieldName': 'batch'
        },
        {
            'head': 'HSN Code',
            'fieldName': 'hsnCode'
        },
        {
            'head': 'Price',
            'fieldName': 'price'
        },
        {
            'head': 'Qantity / Strips',
            'fieldName': 'quantity'
        },
        {
            'head': 'Total',
            'fieldName': 'total'
        },
        {
            'head': 'Discount (%)',
            'fieldName': 'discount'
        },
        {
            'head': 'Amount',
            'fieldName': 'amount '
        },
        {
            'head': 'Action',
            'fieldName': ''
        }
    ]
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
                name: 'text',
                validationProps: {
                    required: "Patient Name is required"
                },
                style: {
                    width: "194px"
                }
            },
            {

                title: 'Gender',
                type: 'select',
                name: 'gender',
                options: [
                    {
                        value: "male",
                        option: "Male"
                    },
                    {
                        value: "female",
                        option: "Female"
                    }
                ],
                style: {
                    width: "194px"
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
                    width: "194px"
                }
            },
            {
                title: 'Email',
                type: 'email',
                name: 'email',
                style: {
                    width: "194px"
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
                        option: "OTC"
                    },
                    {
                        value: "rx",
                        option: "RC"
                    }
                ],
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
        fields: [
            {
                title: FORM_LABELS.PHARMACOLOGICAL_NAME,
                type: 'select',
                name: FORM_LABELS.PHARMACOLOGICAL_NAME,
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
                type: 'select',
                name: FORM_LABELS.MEDICINE_NAME,
                options: [

                ],
                style: {
                    width: "200px"
                }
            },
            {
                title: FORM_LABELS.BATCH_NO,
                type: 'text',
                name: FORM_LABELS.BATCH_NO,
                validationProps: {
                    required: ` ${FORM_LABELS.BATCH_NO} is required`
                },
            },
            {
                title: FORM_LABELS.HSN_CODE,
                type: 'number',
                name: FORM_LABELS.HSN_CODE,
                validationProps: {
                    required: `${FORM_LABELS.HSN_CODE} is required`
                },
            },
            {
                title: FORM_LABELS.PRICE,
                type: 'text',
                name: FORM_LABELS.PRICE,
                validationProps: {
                    required: `${FORM_LABELS.PRICE} is required`
                },
            },
            {
                title: FORM_LABELS.QUANTITY,
                type: 'text',
                name: FORM_LABELS.QUANTITY,
                validationProps: {
                    required: `${FORM_LABELS.QUANTITY} is required`
                },
            },
            {
                title: FORM_LABELS.TOTAL,
                type: 'text',
                name: FORM_LABELS.TOTAL,
                validationProps: {
                    required: `${FORM_LABELS.TOTAL} is required`
                },
            },
            {
                title: FORM_LABELS.DISCOUNT,
                type: 'number',
                name: FORM_LABELS.DISCOUNT,
                validationProps: {
                    required: `${FORM_LABELS.DISCOUNT} is required`
                },
            },
            {
                title: FORM_LABELS.AMOUNT,
                type: 'number',
                name: FORM_LABELS.AMOUNT,
                validationProps: {
                    required: `${FORM_LABELS.AMOUNT} is required`
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
                name: FORM_LABELS.DISCOUNT,
                style: {
                    width: "200px"
                }
            },
            {

                title: FORM_LABELS.GST,
                type: 'number',
                name: FORM_LABELS.GST,
                style: {
                    width: "200px"
                }
            },
            {
                title: FORM_LABELS.NET_PRICE,
                type: 'number',
                name: FORM_LABELS.NET_PRICE,
                validationProps: {
                    required: ` ${FORM_LABELS.NET_PRICE} is required`
                },
            },
            {
                title: FORM_LABELS.ROUND_OFF,
                type: 'number',
                name: FORM_LABELS.ROUND_OFF
            },
            {
                title: FORM_LABELS.BILL_AMOUNT,
                type: 'number',
                name: FORM_LABELS.BILL_AMOUNT
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
                        option: "Cash"
                    },
                    {
                        value: "card",
                        option: "FeCardmale"
                    },
                    {
                        value: "upi",
                        option: "UPI"
                    }
                ],
                style: {
                    width: "190px"
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
                btn_text: "+ Add",
            },
            {
                btn_text: "Clear",
            }
        ]
    };
    const patient_details_style = {
        display: "flex",
        gap: "28px 10px",
        justifyContent: "space-around"
    };
    const medicine_details_style = {
        display: "flex",
        gap: "28px 28px",
        justifyContent: 'space-around'
    };
    const btn_styles = { display: "flex", gap: "20px 20px", justifyContent: "end" };
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
    return (
        <Box sx={{
            padding: 2,
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
                backgroundColor: '#eef0f3',
                borderRadius: '4px',
                padding: 2,
                marginTop: '4px'
            }}>
                <Form
                    template={bill_details}
                    onSubmit={onSubmit}
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
            <div>
                {rows.length > 0 && (
                    <Box sx ={{display: 'flex',justifyContent: 'end', marginTop: '10px '}}>
                        <Button variant="contained">Save</Button>
                    </Box>
                )}
                
            </div>
        </Box>
    )
}