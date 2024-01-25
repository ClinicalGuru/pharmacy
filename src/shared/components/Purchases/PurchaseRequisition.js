import React, { useState, useCallback } from 'react';
import { FORM_LABELS } from "../../Constants/index";
import { Box } from "@mui/material";
import { Form } from "../Forms/index";
import Button from '@mui/material/Button';
import { Container } from "./PurchaseRequisition.styles";
import { AddVendor } from "./AddVendorModal";
import PurchaseService from "../../services/Purchase.service";
import { Table } from "../Table";
import { PdfFile } from '../Pdf/index';
import { PDFDownloadLink } from "@react-pdf/renderer";
import { VendorSelection } from "./VendorSelection/index"

export const PurchaseRequisition = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [rows, setRows] = useState([]);
    const [vendorDetails, setVendorDetails] = useState();
    const btn_styles = { display: "flex", justifyContent: "end" };

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

    const medicine_details_style = {
        display: "flex",
        // gap: "28px 28px",
        justifyContent: 'space-between'
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

    const onAddMedicine = (formData) => {
        console.log({ ...formData, ...vendorDetails })
        const updatedRows = [...rows, { ...formData, ...vendorDetails }];
        setRows(updatedRows);
        console.log(rows, 'medicine added');
    };

    const validate = useCallback((watchValues, errorMethods) => {
        console.log('selectedVendor');
    }, []);

    // useEffect(() => { console.log('watching') }, [rows, setValue])

    const getFilteredRequestionData = async (vendorId) => {
        try {
            let data = await PurchaseService.getRequesitionData(vendorId);
            console.log(data, 'data');
            const updatedRows = [...data];
            setRows(updatedRows);
        } catch (err) {
            console.log(err, 'error getting requisition data');
        }
    };

    const onSaveData = async () => {
        try {
            await PurchaseService.addRequisitionData(rows).then(() => {
                console.log('success');
            })
        } catch (err) {
            console.log(err, 'err add requisition data');
        }
    };

    return (
        <Box sx={{
            padding: 2,
        }}>
            <Container>
                <VendorSelection
                    onSelectVendor={handleVendorSelection}
                    onSelectDate={handelDateSelection}
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
                    onValidate={validate}
                    showSubmitButton={true}
                    showClearFormButton={true}
                    form_styles={medicine_details_style}
                    btn_styles={btn_styles}
                />
            </Box>
            <Box sx={{ marginTop: 3 }}>
                <Table headArray={headArray} gridArray={rows} />
            </Box>
            {modalOpen && <AddVendor showModal={modalOpen} action={() => setModalOpen(!modalOpen)} />}
            <div>
                {rows.length > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '10px ' }}>
                        <Button variant="contained" onClick={() => onSaveData()}>Save</Button>
                    </Box>
                )}

            </div>
            {<PDFDownloadLink document={<PdfFile />} filename="FORM">
                {({ loading }) => (loading ? <button>Loading Document...</button> : <button>Download</button>)}
            </PDFDownloadLink>
            }
        </Box>

    )
}