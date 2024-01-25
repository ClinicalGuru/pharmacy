import React, { useState, useEffect } from 'react';
import { FORM_LABELS } from "../../../Constants/index";
import { Box } from "@mui/material";
import { Form } from "../../Forms/index";
import Button from '@mui/material/Button';
import { Container } from "./Quotations.styles";
import PurchaseService from "../../../services/Purchase.service";
import { EditableTable } from "../../EditableTable";
import { VendorSelection } from "../VendorSelection/index";

export const Quotations = () => {
    const [vendorDetails, setVendorDetails] = useState([]);
    const [rows, setRows] = useState([]);
    const fields = {
        mrp: '',
        ptr: '',
        pts: '',
        gst: '',
        discount: ''
    }
    const columns = [
        {
            'Header': 'Pharmacological Name',
            'accessor': 'pharmacologicalName',
            editEnable: true,
        },
        {
            'Header': 'Brand Name',
            'accessor': 'brandName'
        },
        {
            'Header': 'Dose',
            'accessor': 'dose'
        },
        {
            'Header': 'Form',
            'accessor': 'form'
        },
        {
            'Header': 'Qantity / Strips',
            'accessor': 'quantity'
        },
        {
            'Header': 'MRP',
            'accessor': 'mrp',
            editEnable: true,
        },
        {
            'Header': 'PTR',
            'accessor': 'ptr',
            editEnable: true,
        },
        {
            'Header': 'PTS',
            'accessor': 'pts',
            editEnable: true,
        },
        {
            'Header': 'GST',
            'accessor': 'gst',
            editEnable: true,
        },
        {
            'Header': 'Discount',
            'accessor': 'discount',
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
                    <button onClick={() => handleButtonClick("edit", row.original)}>
                        Edit
                    </button>
                ),
        },
    ]
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
    const medicine_details_template = {
        title: '',
        submitButttonText: '+ Add',
        clearFormBtnText: "Clear",
        formStyles: {
            backgroundColor: "#FFFFFF",
        },
        isBlockLevelBtns: false,
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
                // style: {
                //     width: "194px"
                // }
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
                // style: {
                //     width: "194px"
                // }
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
            {
                title: FORM_LABELS.MRP,
                type: 'number',
                name: 'mrp',
                validationProps: {
                    required: ` ${FORM_LABELS.MRP} is required`
                },
            },
            {
                title: FORM_LABELS.PTR,
                type: 'text',
                name: 'ptr',
                validationProps: {
                    required: `${FORM_LABELS.PTR} is required`
                },
            },
            {
                title: FORM_LABELS.PTS,
                type: 'number',
                name: 'pts',
                validationProps: {
                    required: `${FORM_LABELS.PTS} is required`
                },
            },
            {
                title: FORM_LABELS.GST,
                type: 'text',
                name: 'gst',
                validationProps: {
                    required: `${FORM_LABELS.GST} is required`
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
    const medicine_details_style = {
        display: "flex",
        flexWrap: 'wrap',
        gap: "0px 28px",
        // justifyContent: 'space-between'
    };
    const btn_styles = { display: "flex", justifyContent: "end" };

    const onAddMedicine = (formData) => {
        const updatedRows = [...rows, formData]
        setRows(updatedRows);
    };

    const validate = (watchValues, errorMethods) => {
        // console.log(watchValues, 'watchValues')
    };

    const getVendors = async () => {
        try {
            let data = await PurchaseService.getAllVendors();
            const result = data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id }));
            setVendorDetails(result);
            console.log(result, 'result', rows)
        } catch (e) {
            console.log(e, 'error allVendors')
        }
    };

    useEffect(() => {
        getVendors();
    }, []);

    const getFilteredRequestionData = async (vendorId) => {
        try {
            let data = await PurchaseService.getRequesitionData(vendorId);
            console.log(data, 'data');

            const updatedRows = data?.map((item) => ({ ...item, ...fields }));
            setRows([...updatedRows]);
        } catch (err) {
            console.log(err, 'error getting requisition data');
        }
    };
    const handleVendorSelection = (vendorDetails) => {
        // vendorDetails?.vendorId = vendorId;
        setVendorDetails({ vendorId: vendorDetails?.value, date: '' });
        getFilteredRequestionData(vendorDetails?.value);
    }

    const handelDateSelection = (value) => {
        setVendorDetails({ vendorId: vendorDetails?.value, date: value })
        // getFilteredRequestionData(vendorDetails);
    }
    const onSaveQuotation = async () => {
        try {
            await PurchaseService.saveQuotation(rows).then((res) => {
                console.log(res, 'data addedd successfully');
            })
        } catch (err) {
            console.log(err, 'err add quotation data');
        }
    }
    return (
        <Box sx={{
            padding: 2,
        }}>
            <Container>
                <VendorSelection
                    onSelectVendor={handleVendorSelection}
                    onSelectDate={handelDateSelection}
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
                <Form
                    template={medicine_details_template}
                    onSubmit={onAddMedicine}
                    onValidate={validate}
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
                    <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '10px' }}>
                        <Button variant="contained" onClick={onSaveQuotation}>Save</Button>
                    </Box>
                )}

            </div>
        </Box>

    )
}