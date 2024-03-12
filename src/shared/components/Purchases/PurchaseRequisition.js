import React, { useState, useCallback, useEffect } from 'react';
import { FORM_LABELS } from "../../Constants/index";
import { Box } from "@mui/material";
import { Form } from "../Forms/index";
import Button from '@mui/material/Button';
import { Container } from "./PurchaseRequisition.styles";
import { AddVendor } from "./AddVendorModal";
import PurchaseService from "../../services/Purchase.service";
import { RefreshVendorsDetailsContext } from '../../../context/RefreshVendorDetailsContext'

import { v4 as uuidv4 } from 'uuid';
import { VendorSelection } from "./VendorSelection/index";
import { EditableTable } from "../EditableTable";
import { Notification } from '../Notification/index';
import { Loader } from "../Loader/index";
import { DownloadOptionsModal } from "../DownloadOptionsModal/DownloadOptionsModal"

export const PurchaseRequisition = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [rows, setRows] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
    const [vendorDetails, setVendorDetails] = useState();
    const [selectedDate, setSelectedDate] = useState();
    const [notification, setNotification] = useState(false);
    const [refreshVDetails, setRefreshVDetails] = useState(false);
    const btn_styles = { display: "flex", justifyContent: "end" };
    const [downloadModal, setDownloadModal] = useState(false);
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
            'Header': 'Dose',
            'accessor': 'dose',
            editEnable: true,
        },
        {
            'Header': 'Form',
            'accessor': 'form',
            editEnable: true,
        },
        {
            'Header': 'Qantity / Strips',
            'accessor': 'quantity',
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

    const medicine_details_template = {
        title: '',
        submitButttonText: '+ Add',
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
        ]
    };

    const medicine_details_style = {
        display: "flex",
        // gap: "28px 28px",
        justifyContent: 'space-between'
    };

    const handleVendorSelection = (details) => {
        let updatedObj = { vendorId: details?.value, vendorName: details?.label }
        setVendorDetails(updatedObj);
    }

    const handelDateSelection = (value) => {
        setSelectedDate({ date: value });
    }

    const onAddMedicine = (formData, e) => {
        console.log({ ...formData, ...vendorDetails }, 'medicine added');
        const updatedRows = [...rows, { ...formData }];
        setRows(updatedRows);
        e.target.reset();
        // console.log(rows, 'medicine added');
    };

    const validate = useCallback((watchValues, errorMethods) => {
        console.log('selectedVendor');
    }, []);

    const onSaveData = async () => {
        let reqDetails = {
            ...vendorDetails,
            requesitionCreatedDate: selectedDate?.date,
            requesitionId: uuidv4(),
            medicines: rows,
            status: 'created'
        };
        try {
            await PurchaseService.addRequisitionData(reqDetails).then(() => {
                console.log('success');
                setNotification(true);
                setDownloadModal(true);
            })
        } catch (err) {
            console.log(err, 'err add requisition data');
        }
    };

    const alertState = () => {
        setNotification(!notification);
    };
    const handleClose = () => {
        setDownloadModal(false);
    };
    return (
        <Box sx={{
            padding: 2,
        }}>
            <Container>
                <RefreshVendorsDetailsContext.Provider value={{ refreshVDetails, setRefreshVDetails }}>
                    <VendorSelection
                        onSelectVendor={handleVendorSelection}
                        onSelectDate={handelDateSelection}
                    />
                    {modalOpen && <AddVendor requisitions={rows} showModal={modalOpen} action={() => setModalOpen(!modalOpen)} />}
                </RefreshVendorsDetailsContext.Provider>
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
                    onResetForm
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
                    <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '10px ' }}>
                        <Button variant="contained" onClick={() => onSaveData()} disabled={dataFetched}>Create purchage requisition</Button>
                    </Box>
                )}
            </div>
            {notification && <Notification notificationState={notification} type="success" message="Purchage requisition saved successfully" action={alertState} />}
            <Loader open={showLoader} />
            <DownloadOptionsModal open={downloadModal} onClose={handleClose} rows={rows} />
        </Box>
    )
}