import React, { useState, useCallback, useEffect } from 'react';
import { FORM_LABELS } from "../../Constants/index";
import { Box } from "@mui/material";
import { Form } from "../Forms/index";
import Button from '@mui/material/Button';
import { Container } from "./PurchaseRequisition.styles";
import { AddVendor } from "./AddVendorModal";
import PurchaseService from "../../services/Purchase.service";
import { Table } from "../Table";
import { PdfFile } from '../Pdf/index';
import { v4 as uuidv4 } from 'uuid';
import { VendorSelection } from "./VendorSelection/index"
import { Notification } from '../Notification/index'
import { Loader } from "../Loader/index";

export const PurchaseRequisition = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [rows, setRows] = useState([]);
    const [vendorDetails, setVendorDetails] = useState();
    const [selectedDate, setSelectedDate] = useState();
    const [notification, setNotification] = useState(false);
    const btn_styles = { display: "flex", justifyContent: "end" };
    const data = [
        { id: 1, name: 'John Doe', age: 25 },
        { id: 2, name: 'Jane Smith', age: 30 },
        // Add more data as needed
    ];
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

    const handleVendorSelection = (details) => {
        let updatedObj = { vendorId: details?.value }
        setVendorDetails(updatedObj);
    }

    const handelDateSelection = (value) => {
        setSelectedDate({ date: value });
    }

    const onAddMedicine = (formData) => {
        console.log({ ...formData, ...vendorDetails }, 'medicine added');
        const updatedRows = [...rows, { ...formData }];
        setRows(updatedRows);
        // console.log(rows, 'medicine added');
    };

    const validate = useCallback((watchValues, errorMethods) => {
        console.log('selectedVendor');
    }, []);

    const getFilteredRequestionData = async (vendorId) => {
        setShowLoader(true);
        let medicine = [];
        try {
            let data = await PurchaseService.getRequesitionData(vendorId);
            console.log(data, 'data');
            data?.forEach((item) => medicine.push(...item?.medicine));
            setRows([...medicine]);
            setShowLoader(false);
        } catch (err) {
            console.log(err, 'error getting requisition data');
            setShowLoader(false);
        }
    };

    const onSaveData = async () => {
        let reqDetails = {
            vendorId: vendorDetails?.vendorId,
            requesitionOrderedData: selectedDate?.date,
            requesitionId: uuidv4()
        };
        const data = rows.map((item) => ({...item, ...reqDetails}));
        try {
            await PurchaseService.addRequisitionData(data).then(() => {
                console.log('success');
                setNotification(true);
            })
        } catch (err) {
            console.log(err, 'err add requisition data');
        }
    };
    useEffect(() => {
        // This code will run whenever vendorDetails is updated
        console.log(vendorDetails, 'vendorDetails');
        // You can put your other logic here or call a function
        getFilteredRequestionData(vendorDetails?.vendorId);
    }, [vendorDetails, selectedDate]); // Add vendorDetails as a dependency to useEffect
    
    const alertState = () => {
        setNotification(!notification);
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
            <PdfFile data={rows} />
            {notification && <Notification notificationState={notification} type="success" message="Purchage requisition saved successfully" action={alertState} />}
            <Loader open={showLoader} />
        </Box>
    )
}