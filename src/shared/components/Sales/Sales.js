import { useState, useEffect } from "react";
import { FORM_LABELS } from "../../Constants/index";

//material ui
import { Box } from "@mui/material";
import Button from '@mui/material/Button';
import { Form } from "../Forms/index";
import { EditableTable } from "../EditableTable";
import PurchaseService from "../../services/Purchase.service";
import { Loader } from "../Loader/index";
import { TotalCalculation } from "../../Helper/Helper";

export const Sales = () => {
    const [dataFetched, setDataFetched] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [rows, setRows] = useState([]);
    const [pharmacologicalNames, setPharmacologicalNames] = useState([]);
    const [brandNames, setBrandNames] = useState([]);
    const [medicineFormValues, setMedicineFormValues] = useState(null);

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

            Cell: ({ row }) => <TotalCalculation price={row.original.price} quantity={row.original.quantity} />,
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
                        name: "Male"
                    },
                    {
                        value: "female",
                        name: "Female"
                    }
                ],
                style: {
                    width: "150px",
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
                        option: "OTC"
                    },
                    {
                        value: "rx",
                        option: "Rx"
                    }
                ],
                style: {
                    width: "100px",
                    height: "35px"
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
                type: 'autoComplete',
                name: 'pharmacologicalName',
                validationProps: {
                    required: `${FORM_LABELS.PHARMACOLOGICAL_NAME} is required`
                },
                style: {
                    width: "200px"
                },
                options: [...pharmacologicalNames]
            },
            {

                title: FORM_LABELS.MEDICINE_NAME,
                type: 'autoComplete',
                name: 'brandName',
                validationProps: {
                    required: ` ${FORM_LABELS.MEDICINE_NAME} is required`
                },
                style: {
                    width: "200px"
                },
                options: [...brandNames]
            },
            {
                title: FORM_LABELS.BATCH_NO,
                type: 'text',
                name: 'batchNo',
                validationProps: {
                    required: ` ${FORM_LABELS.BATCH_NO} is required`
                },
            },
            {
                title: FORM_LABELS.HSN_CODE,
                type: 'number',
                name: 'hsnCode',
                validationProps: {
                    required: `${FORM_LABELS.HSN_CODE} is required`
                },
            },
            {
                title: FORM_LABELS.PRICE,
                type: 'text',
                name: 'price',
                validationProps: {
                    required: `${FORM_LABELS.PRICE} is required`
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
            {
                title: FORM_LABELS.TOTAL,
                type: 'number',
                name: 'total',
                validationProps: {
                    required: `${FORM_LABELS.TOTAL} is required`
                },
            },
            {
                title: FORM_LABELS.DISCOUNT,
                type: 'number',
                name: 'discount',
                validationProps: {
                    required: `${FORM_LABELS.DISCOUNT} is required`
                },
            },
            {
                title: FORM_LABELS.AMOUNT,
                type: 'number',
                name: 'amount',
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
                        name: "Cash"
                    },
                    {
                        value: "card",
                        name: "FeCardmale"
                    },
                    {
                        value: "upi",
                        name: "UPI"
                    }
                ],
                style: {
                    width: "190px",
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

    const resetMedicineForm = () => {
        setMedicineFormValues(null);
    };

    const onAddMedicine = (formData) => {
        // setShowLoader(true);
        console.log(formData, 'formData');
        const { price, total, discount, amount, batchNo, hsnCode, quantity, pharmacologicalName, brandName } = formData;
        // const total = calculateTotal(price, quantity);
        console.log(total, 'djnenfjefniewsnjikewsnfjsnejkn');
        const transformedObject = {
            price,
            total,
            discount,
            amount,
            batchNo,
            hsnCode,
            quantity,
            pharmacologicalName: pharmacologicalName?.label,
            brandName: brandName?.label,
            medicineId: brandName?.value
        };
        setRows([...rows, transformedObject]);
        resetMedicineForm();
    };


    const onSubmit = (form, formType) => {
        if (formType === "medicine_details_template") {
            onAddMedicine(form);
            resetMedicineForm();
        } else {
            console.log(form);
        }
    };
    // const onAddMedicine = (formData) => {
    //     const updatedRows = [...rows, formData]
    //     setRows(updatedRows);
    //     console.log(rows, 'medicine added');
    // };
    const validate = (watchValues, errorMethods) => {
        // console.log(watchValues, 'watchValues')
    };

    const getMedicines = async () => {
        setShowLoader(true);
        try {
            let data = await PurchaseService.getAllMedicines();
            const result = data?.docs?.map((doc) => ({ ...doc?.data(), id: doc?.id }));
            console.log(result, 'medicinesData');
            setPharmacologicalNames(result?.map((item) => ({ value: item?.id, name: item?.pharmacologicalName })));
            setBrandNames(result?.map((item) => ({ value: item?.id, name: item?.brandName })));
            setShowLoader(false);
        } catch (e) {
            console.log(e, 'error allVendors');
            setShowLoader(false);
        }
    }
    useEffect(() => {
        getMedicines();
    }, []);

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
                    onSubmit={(form) => onSubmit(form, "medicine_details_template")}
                    validate={validate}
                    showSubmitButton={true}
                    showClearFormButton={true}
                    form_styles={medicine_details_style}
                    btn_styles={btn_styles}
                    onAddMedicine={onAddMedicine}
                    initialValues={medicineFormValues}
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
                        <Button variant="contained">Save</Button>
                    </Box>
                )}

            </div>
            <Loader open={showLoader} />
        </Box>
    )
}