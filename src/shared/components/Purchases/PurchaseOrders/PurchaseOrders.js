import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import { Form } from "../../Forms/index";
import Button from '@mui/material/Button';
import PurchaseService from "../../../services/Purchase.service";
import { EditableTable } from "../../EditableTable";
import { DownloadOptionsModal } from "../../DownloadOptionsModal/DownloadOptionsModal";
import { Container } from './PurchaseOrders.styles'
import { useLocation } from 'react-router-dom';
import { Notification } from '../../Notification/index';
import { Loader } from "../../Loader/index";

export const PurchaseOrders = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [vendorDetails, SetVendorDetails] = useState([]);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [rows, setRows] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
    const [downloadModal, setDownloadModal] = useState(false);
    const [notification, setNotification] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    const columns = [
        {
            'Header': 'Vendor Name',
            'accessor': 'vendorName',
            editEnable: false,
        },
        {
            'Header': 'Pharmacological Name',
            'accessor': 'pharmacologicalName',
            editEnable: false,
        },
        {
            'Header': 'Brand Name',
            'accessor': 'brandName',
            editEnable: false,
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
    let vendor_details_template = {
        title: '',
        submitButttonText: 'Log in',
        formStyles: {
            backgroundColor: "#eee",
        },
        fields: [
            {

                title: 'Vendor Name',
                type: 'select',
                name: 'select',
                options: [
                    {
                        value: "none",
                        name: "None",
                    },
                    ...vendorDetails.map(vendor => ({
                        value: vendor.id,
                        name: vendor.name,
                        ...vendor
                    }))
                ],
                validationProps: {
                    required: "Vendor name is required"
                },
                style: {
                    width: "194px"
                }
            }, {

                title: 'PO ID',
                type: 'select',
                name: 'select',
                options: [
                    {
                        value: "none",
                        name: "None",
                    },
                ],
                validationProps: {
                    required: "Vendor name is required"
                },
                style: {
                    width: "194px"
                }
            },
            {
                title: 'Order Date',
                type: 'date',
                name: 'date',
                validationProps: {
                    required: "Date is required"
                },
                style: {
                    width: "194px"
                }
            },

        ],
    };
    let location = useLocation();
    useEffect(() => {
        setRows(location?.state?.data);
        console.log(location?.state?.data, 'state')
    }, [location]);

    const vendor_details_style = {
        display: "flex",
        gap: "28px 30px",
        // justifyContent: "space-around"
    };
    const btn_styles = { display: "flex", justifyContent: "end" };
    const onSubmit = (form) => {
        console.log(form);
    };

    const validate = (watchValues, errorMethods) => {
        // console.log(watchValues, 'watchValues')
    };

    const getVendors = async () => {
        try {
            let data = await PurchaseService.getAllVendors();
            const result = data?.docs?.map((doc) => ({ ...doc?.data(), id: doc.id }));
            SetVendorDetails(result);
            console.log(vendor_details_template, 'vendor_details_template', result)
        } catch (e) {
            console.log(e, 'error allVendors')
        }
    };

    useEffect(() => {
        getVendors();
    }, []);

    const onSavePO = async () => {
        try {
            // const docRef = await PurchaseService.savePO(rows);
            // console.log('successfull on saving PO');
            // setNotification(true);
            // setDownloadModal(true);
        } catch (err) {
            console.log('error on saving PO', err)
        }
    }
    const alertState = () => {
        setNotification(!notification);
    };
    const handleClose = () => {
        setDownloadModal(false);
    };

    const getAllMedicines = async () => {
        setShowLoader(true);
        try {
            let data = await PurchaseService.getAllQuotationData();
            const result = data?.docs?.map((doc) => ({ ...doc?.data(), id: doc?.id }));
            console.log(result, 'result');
            joinQuotationsWithVendors(result);
            setShowLoader(false);
        } catch (e) {
            console.log(e, 'error allVendors');
            setShowLoader(false);
        }
    }

    const joinQuotationsWithVendors = (data) => {
        setShowLoader(true);
        let vendorMap = new Map();
        for (const vendor of vendorDetails) {
            vendorMap.set(vendor.id, vendor.name)
        }
        const updatedQuotationDetails = data?.map((quotation) => ({
            ...quotation,
            vendorName: vendorMap.get(quotation.vendorId)
        }));
        setRows(findingL1(updatedQuotationDetails));
    }
    const findingL1 = (arr) => {
        const minAgeMap = new Map();

        // Iterate over each object in the array
        arr.forEach(obj => {
            // Check if the name exists in the map
            if (minAgeMap.has(obj.pharmacologicalName)) {
                // If it exists, update the object if the age is lower
                const existingObj = minAgeMap.get(obj?.ptr);
                if (obj?.ptr < existingObj?.ptr) {
                    minAgeMap.set(obj.pharmacologicalName, obj);
                }
            } else {
                // If it doesn't exist, add the object to the map
                minAgeMap.set(obj.pharmacologicalName, obj);
            }
        });
        return Array.from(minAgeMap.values());
    }

    return (
        <Box sx={{
            padding: 2,
        }}>
            <Container>
                <Form
                    template={vendor_details_template}
                    onSubmit={onSubmit}
                    validate={validate}
                    showSubmitButton={false}
                    form_styles={vendor_details_style}
                    btn_styles={btn_styles}
                />
                <Box sx={{ display: "flex", }}>
                    <Button disabled sx={{ marginRight: "10px" }} variant="contained">PO List</Button>
                    <Button sx={{ marginRight: "10px" }} variant="contained" onClick={getAllMedicines}>L1 List</Button>
                    <Button variant="contained">Re-Order</Button>
                </Box>
            </Container>
            <Box sx={{ marginTop: 3 }}>
                {rows?.length > 0 && <EditableTable
                    columns={columns}
                    data={rows}
                    setData={setRows}
                    handleButtonClick={handleButtonClick}
                />}
            </Box>
            <div>
                {rows?.length > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '10px' }}>
                        <Button variant="contained" onClick={onSavePO}>Save purchage order</Button>
                    </Box>
                )}
            </div>
            <DownloadOptionsModal open={downloadModal} onClose={handleClose} rows={rows} />
            {notification && <Notification notificationState={notification} type="success" message="Purchage order saved successfully" action={alertState} />}
            <Loader open={showLoader} />
        </Box>

    )
}