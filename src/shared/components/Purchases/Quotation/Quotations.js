import React, { useState, useEffect, useCallback } from 'react';
import { FORM_LABELS } from "../../../Constants/index";
import { Box } from "@mui/material";
import { Form } from "../../Forms/index";
import Button from '@mui/material/Button';
import { Container } from "./Quotations.styles";
import PurchaseService from "../../../services/Purchase.service";
import { EditableTable } from "../../EditableTable";
import { VendorSelection } from "../VendorSelection/index";
import { Notification } from "../../Notification/index";
import { Loader } from "../../Loader/index";
import { v4 as uuidv4 } from 'uuid';
import { List } from "./List";
import { StyledSpan } from '../../../../globalStyles';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { hasAllRequiredKeysInList } from '../../../../utils/helper'
import useLocalStorage from "../../../../hooks/UseLocalstorage";
import { constant } from 'lodash';

export const Quotations = () => {
    const [pharmacyId] = useLocalStorage('pharmacyId');
    const [showLoader, setShowLoader] = useState(false);
    const [vendorDetails, setVendorDetails] = useState([]);
    const [rows, setRows] = useState([]);
    const [reqisition, setRequisition] = useState([]);
    const [notificationMsg, setNotificationMsg] = useState({
        message: '',
        severity: ''
    });
    const [notification, setNotification] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [requesitionId, setRequesitionId] = useState('');
    const [pharmacologicalNames, setPharmacologicalNames] = useState([]);
    const [brandNames, setBrandNames] = useState([]);
    const [vendorName, setVendorName] = useState('');
    const [resetForm, setResetForm] = useState(null);

    const columns = [
        {
            'Header': 'Pharmacological Name',
            'accessor': 'pharmacologicalName'
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
            'Header': 'GST %',
            'accessor': 'gst',
            editEnable: true,
        },
        {
            'Header': 'Discount %',
            'accessor': 'discount',
            editEnable: true,
        },
        {
            Header: "Action",
            id: "actions",
            disableSortBy: true,
            Cell: ({ row, column, cell }) =>
                row.original.isEditing ? (
                    <>
                        <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
                            <div><DoneOutlinedIcon style={{ color: 'blue' }} onClick={() => handleButtonClick("save", row.original)} sx={{ marginRight: '10px' }} /></div>
                            <div><CancelOutlinedIcon style={{ color: 'red' }} onClick={() => handleButtonClick("cancel", row.original)} /></div>
                        </div>
                        {/* <DoneOutlinedIcon style={{ color: 'blue' }} onClick={() => handleButtonClick("save", row.original)} sx={{ marginRight: '10px' }} />
                        <CancelOutlinedIcon style={{ color: 'red' }} onClick={() => handleButtonClick("cancel", row.original)} /> */}
                    </>
                ) : (
                    <EditOutlinedIcon onClick={() => handleButtonClick("edit", row.original)} />
                ),
        },
    ];
    const handleButtonClick = (action, row) => {
        console.log(action, 'chjsdbchjsbchbs');
        const newData = rows.map((rowData) => {
            if (rowData.pharmacologicalName === row.pharmacologicalName) {
                if (action === "edit") {
                    return { ...rowData, isEditing: true, prevData: { ...rowData } };
                } else if (action === "cancel") {
                    return { isEditing: false, ...rowData.prevData };
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
                title: (
                    <span>
                        {FORM_LABELS.PHARMACOLOGICAL_NAME}
                        <StyledSpan> *</StyledSpan>
                    </span>
                ),
                type: 'autoComplete',
                name: 'pharmacologicalName',
                validationProps: {
                    required: `${FORM_LABELS.PHARMACOLOGICAL_NAME} is required`
                },
                options: [...pharmacologicalNames],
            },
            {

                title: <span>
                    {FORM_LABELS.BRAND_NAME}
                    <StyledSpan> *</StyledSpan>
                </span>,
                type: 'autoComplete',
                name: 'brandName',
                validationProps: {
                    required: ` ${FORM_LABELS.BRAND_NAME} is required`
                },
                options: [...brandNames],
            },
            {
                title: (
                    <span>
                        {FORM_LABELS.DOSE}
                        <span style={{ color: 'red' }}>*</span>
                    </span>
                ),
                type: 'text',
                name: 'dose',
                validationProps: {
                    required: true,
                },
                style: {
                    width: "60px"
                }
            },
            {
                title: (
                    <span>
                        {FORM_LABELS.FORM}
                        <StyledSpan> *</StyledSpan>
                    </span>
                ),
                type: 'select',
                name: 'form',
                options: [
                    {
                        value: "Tablets",
                        name: "Tablets"
                    },
                    {
                        value: "Injections",
                        name: "Injections"
                    },
                    {
                        value: "Inhalers",
                        name: "Inhalers"
                    },
                    {
                        value: "Capsules",
                        name: "Capsules"
                    },
                    {
                        value: "Syrup",
                        name: "Syrup"
                    },
                    {
                        value: "Drops",
                        name: "Drops"
                    },
                    {
                        value: "Ointment",
                        name: "Ointment"
                    },
                ],
                validationProps: {
                    required: true,
                },
                style: {
                    width: "80px"
                }
            },
            {
                title: (
                    <span>
                        {FORM_LABELS.QUANTITY}
                        <StyledSpan> *</StyledSpan>
                    </span>
                ),
                type: 'number',
                name: 'quantity',
                validationProps: {
                    required: true,
                },
                style: {
                    width: "100px"
                }
            },
            {
                title:
                    <span>
                        {FORM_LABELS.MRP}
                        <StyledSpan> *</StyledSpan>
                    </span>
                ,
                type: 'number',
                name: 'mrp',
                validationProps: {
                    required: true,
                },
                style: {
                    width: "60px"
                }
            },
            {
                title: (
                    <span>
                        {FORM_LABELS.PTR}
                        <StyledSpan> *</StyledSpan>
                    </span>
                ),
                type: 'number',
                name: 'ptr',
                validationProps: {
                    required: true,
                },
                style: {
                    width: "60px"
                }
            },
            {
                title: (
                    <span>
                        {FORM_LABELS.PTS}
                        <StyledSpan> *</StyledSpan>
                    </span>
                ),
                type: 'number',
                name: 'pts',
                validationProps: {
                    required: true,
                },
                style: {
                    width: "60px"
                }
            },
            {
                title: <span>{FORM_LABELS.GST}<StyledSpan> *</StyledSpan></span>,
                type: 'select',
                name: 'gst',
                validationProps: {
                    required: true,
                },
                style: {
                    width: "60px"
                },
                options: [
                    { name: '0%', value: '0' },
                    { name: '5%', value: '5' },
                    { name: '12%', value: '12' },
                    { name: '18%', value: '18' },
                    { name: '28%', value: '28' }
                ]
            },
            {
                title: FORM_LABELS.DISCOUNT,
                type: 'number',
                name: 'discount',
                validationProps: {
                    required: false,
                },
                style: {
                    width: "60px"
                }
            },
        ],
        btns: [
            {
                btn_text: "+ Add",
            },
            {
                btn_text: "Clear",
            }
        ],
        buttonStyles: {
            height: '70px',
            display: 'flex',
            alignItems: 'center',
        }
    };
    const medicine_details_style = {
        height: "80px",
        display: "flex",
        // flexWrap: 'wrap',
        gap: "0px 17px",
        justifyContent: 'space-between'
    };
    const btn_styles = { display: "flex", justifyContent: "end" };

    const onAddMedicine = (formData, e) => {
        const { pharmacologicalName, brandName } = formData;
        const transformedObject = {
            ...formData,
            pharmacologicalName: pharmacologicalName?.label,
            brandName: brandName?.label,
            medicineId: brandName?.value,
        };
        const updatedRows = [...rows, transformedObject];
        setRows(updatedRows);
        e.target.reset();
    };

    const validate = (watchValues, errorMethods) => {
        // console.log(watchValues, 'watchValues')
    };

    const getFilteredRequestionData = async (vendorId) => {
        console.log(vendorId, 'vendorId quotation.js')
        setShowLoader(true);
        try {
            let data = await PurchaseService.getRequesitionData(vendorId);
            console.log(data, 'quotation')
            setRequisition(data);
            setVendorName(data?.[0]?.vendorName);
            // setRows([...data]);
            setShowLoader(false);
            setModalOpen(true);
        } catch (err) {
            console.log(err, 'error getting requisition data');
            setShowLoader(false);
        }
    };

    const handleVendorSelection = (vendorDetails) => {
        // vendorDetails?.vendorId = vendorId;
        setVendorDetails({ vendorId: vendorDetails?.value, date: '' });
        getFilteredRequestionData(vendorDetails?.value);
    };

    const handelDateSelection = (value) => {
        setVendorDetails({ vendorId: vendorDetails?.value, date: value })
        // getFilteredRequestionData(vendorDetails);
    };

    const onSaveQuotation = async () => {
        const requiredKeys = ['mrp', 'ptr', 'pts', 'gst', 'discount'];
        if (!hasAllRequiredKeysInList(rows, requiredKeys)) {
            setNotification(true)
            setNotificationMsg(
                {
                    severity: 'error',
                    message: 'Please fill all the mandatory fields before saving.'
                }
            )
            return
        };
        setShowLoader(true);
        let quotationDetails = {
            pharmacyId: pharmacyId,
            vendorId: reqisition[0]?.vendorId,
            requesitionId: reqisition[0]?.requesitionId,
            quotationId: uuidv4()
        };
        const data = rows.map((item) => ({ ...item, ...quotationDetails }));
        let selectedRequisition = reqisition.find((item) => item?.requesitionId === requesitionId);
        selectedRequisition.status = 'completed';
        try {
            await PurchaseService.saveQuotation(data).then((res) => {
                console.log(res, 'Quotation data saved successfully');
                PurchaseService.updatingInventory(selectedRequisition);
                setNotification(true)
                setNotificationMsg(
                    {
                        severity: 'success',
                        message: 'Quotation saved successfully'
                    }
                )
                setShowLoader(false);
                alertState();
                setRows([]);
            });
        } catch (err) {
            console.log(err, 'err while adding quotation data');
            setShowLoader(false);
        }
    };

    const getMedicines = async () => {
        setShowLoader(true);
        try {
            let data = await PurchaseService.getAllMedicines();
            const result = data?.docs?.map((doc) => ({ ...doc?.data(), id: doc?.id }));
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

    const alertState = () => {
        setNotification(!notification);
    };
    const getRequisitionId = (value) => {
        setRequesitionId(value);
        const rslt = reqisition.find(item => item?.requesitionId === value);
        console.log(rslt, 'rslt')
        setRows([...rslt?.medicines]);
    }

    return (
        <Box sx={{
            padding: 1,
        }}>
            <Container>
                <VendorSelection
                    onSelectVendor={handleVendorSelection}
                    onSelectDate={handelDateSelection}
                />
            </Container>

            <Box
                sx={{
                    backgroundColor: '#DEE1E6FF',
                    borderRadius: '4px',
                    padding: 1,
                    marginTop: '15px',
                    backgroundColor: '#B4B4B4'
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
                    resetTrigger={resetForm}
                />
            </Box>
            <Box sx={{ marginTop: 2 }}>
                <EditableTable
                    columns={columns}
                    data={rows}
                    setData={setRows}
                    handleButtonClick={handleButtonClick}
                />
            </Box>
            <div>
                {rows.length > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '15px', }}>
                        <Button sx={{
                            backgroundColor: 'rgb(255, 185, 29)',
                            '&:hover': {
                                backgroundColor: 'rgb(255, 185, 29)',
                            },
                        }} variant="contained" onClick={onSaveQuotation}>Save</Button>
                    </Box>
                )}

            </div>
            <Loader open={showLoader} />
            {<List showModal={modalOpen} requisitions={reqisition} action={() => setModalOpen(!modalOpen)} getRequisitionId={getRequisitionId} vendorName={vendorName} />}
            {notification && <Notification notificationState={notification} severity={notificationMsg.severity} message={notificationMsg.message} action={alertState} />}
        </Box>
    )
}