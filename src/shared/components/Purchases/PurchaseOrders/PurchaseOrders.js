import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import CreatableSelect from 'react-select/creatable';
import Button from '@mui/material/Button';
import PurchaseService from "../../../services/Purchase.service";
import { EditableTable } from "../../EditableTable";
import { DownloadOptionsModal } from "../../DownloadOptionsModal/DownloadOptionsModal";
import { Container } from './PurchaseOrders.styles'
import { useLocation } from 'react-router-dom';
import { Notification } from '../../Notification/index';
import { Loader } from "../../Loader/index";
import {CButton} from "../../Button/index";

export const PurchaseOrders = () => {
    const [rowIds, selectedRows] = useState({});
    const [vendorDetails, SetVendorDetails] = useState([]);
    const [vendorId, setVendorId] = useState('');
    const [rows, setRows] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
    const [downloadModal, setDownloadModal] = useState(false);
    const [notification, setNotification] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [originalData, setOriginalData] = useState([]);
    const [pdfData, setPdfData] = useState([]);
    const [selectedVendorDtls, setSelectedVendorDtls] = useState();
    const [notificationMsg, setNotificationMsg] = useState({
        message: '',
        severity: ''
    })

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
    let location = useLocation();
    useEffect(() => {
        setRows(location?.state?.data);
        console.log(location?.state?.data, 'state')
    }, [location]);

    const getVendors = async () => {
        try {
            let data = await PurchaseService.getAllVendors();
            const result = data?.docs?.map((doc) => ({ ...doc?.data(), id: doc.id }));
            SetVendorDetails(result);
        } catch (e) {
            console.log(e, 'error allVendors')
        }
    };

    useEffect(() => {
        getVendors();
    }, []);

    useEffect(() => {
        console.log(rowIds, 'rowIds')
    }, [rowIds]);


    const onSavePO = async () => {
        console.log(rows, 'updated')
        if (vendorId === '') {
            setNotification(true);
            setNotificationMsg({
                severity: 'info',
                message: 'Please select vendor'
            });
            return;
        }
        setShowLoader(true);
        const rowIdKeys = Object.keys(rowIds);
        const filtredRows = rowIdKeys?.map(id => rows[parseInt(id)]);
        console.log(filtredRows, 'filtredRows')
        try {
            await PurchaseService.savePO(filtredRows);
            pdfUsableData(filtredRows);
            console.log('successfull on saving PO');
            setNotification(true);
            setDownloadModal(true);
            setShowLoader(false);
            setNotificationMsg({
                severity: 'success',
                message: 'Purchase order created successfully.'
            });
        } catch (err) {
            console.log('error on saving PO', err)
            setShowLoader(false);
        }
    };

    const pdfUsableData = (data) => {
        const filteredList = data.map(({ discount, gst, id, isEditing, medicineId, mrp, ptr, pts, quotationId, requesitionId, vendorId, vendorName, ...rest }) => {
            return {
                pharmacologicalName: rest.pharmacologicalName,
                brandName: rest.brandName,
                form: rest.form,
                dose: rest.dose,
                quantity: rest.quantity
            }
        });
        console.log(filteredList, 'filteredList')
        setPdfData(filteredList);
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
        setOriginalData(findingL1(updatedQuotationDetails));
    }
    const findingL1 = (arr) => {
        const minAgeMap = new Map();
        // Iterate over each object in the array
        arr.forEach(obj => {
            // Check if the name exists in the map
            if (minAgeMap.has(obj.pharmacologicalName)) {
                // If it exists, update the object if the ptr is lower
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
    const vendorHandler = (e) => {
        const { value } = e
        setVendorId(value);
    }
    const btn_style = {
        marginRight: '10px'
    }
    useEffect(() => {
        if (vendorId !== '') {
            const vendorFilter = originalData.filter((item) => item?.vendorId === vendorId);
            setRows(vendorFilter);

            const getVendorDetails = async () => {
                setShowLoader(true);
                try {
                    let data = await PurchaseService.getVendor(vendorId);
                    setSelectedVendorDtls(data);
                    setShowLoader(false);
                } catch (err) {
                    console.log(err, 'error while getting vendor details Purchage order');
                    setShowLoader(false);
                }
            }
            getVendorDetails();
        }

    }, [vendorId]);

    return (
        <Box sx={{
            padding: 2,
        }}>
            <Container>
                {<form >
                    <div className="form-group">
                        <label className="form-label" for="vendorId">Select Vendor</label>
                        <CreatableSelect
                            options={vendorDetails?.map(vendor => ({ value: vendor?.id, label: vendor?.name }))}
                            onChange={(e) => vendorHandler(e)}
                            styles={{
                                container: (provided) => ({
                                    ...provided,
                                    width: 300,
                                    marginRight: 50
                                })
                            }}
                        />
                    </div>
                    {/* <div className="form-group">
                        <label for="vendorId">Select Pharmacological Name</label>
                        <CreatableSelect
                            options={pharmacologicalNames?.map(med => ({ value: med?.id, label: med?.pharmacologicalName }))}
                            onChange={(e) => pNameHandler(e)}
                            styles={{
                                container: (provided) => ({
                                    ...provided,
                                    width: 300,
                                    marginRight: 50
                                })
                            }}
                        />
                    </div> */}
                    {/* <div className="form-group">
                        <label for="priceOrder">Price Order</label>
                        <select style={{ marginRight: '2rem' }} className="form-control" onChange={(e) => handleList(e)} name="list">
                            <option value="">--All--</option>
                            <option value="L1">L1</option>
                            <option value="L2">L2</option>
                            <option value="L3">L3</option>
                            <option value="L4">L4</option>
                            <option value="L5">L5</option>
                        </select>
                    </div> */}
                    {/* <div className="form-control">
                        <button>Clear filters</button>
                    </div> */}
                </form>}
                <Box sx={{ display: "flex", }}>
                    < CButton
                        type="button"
                        variant='contained'
                        disabled = {true}
                        style={ btn_style } 
                        text="PO List"
                    />
                    < CButton
                        type="button"
                        variant='contained'
                        style={ btn_style} 
                        buttonHandler={getAllMedicines}
                        text="L1 List"
                    />
                    < CButton
                        type="button"
                        variant='contained'
                        text="Re-Order"
                        disabled = {true}
                    />
                    {/* <Button disabled sx={{ marginRight: "10px" }} variant="contained">PO List</Button>
                    <Button sx={{ marginRight: "10px" }} variant="contained" onClick={getAllMedicines}>L1 List</Button>
                    <Button disabled variant="contained">Re-Order</Button> */}
                </Box>
            </Container>
            <Box sx={{ marginTop: 2 }}>
                {rows?.length > 0 && <EditableTable
                    columns={columns}
                    data={rows}
                    setData={setRows}
                    handleButtonClick={handleButtonClick}
                    selectedRows={selectedRows}
                />}
            </Box>
            <div>
                {rows?.length > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '10px' }}>
                        < CButton
                        type="button"
                        variant='contained'
                        buttonHandler={onSavePO}
                        text="Save purchage order"
                    />
                        {/* <Button variant="contained" onClick={onSavePO}>Save purchage order</Button> */}
                    </Box>
                )}
            </div>
            <DownloadOptionsModal open={downloadModal} onClose={handleClose} rows={pdfData} vendorDetails={selectedVendorDtls} pdfTitle="PURCHASE ORDER" />
            {notification && <Notification notificationState={notification} severity={notificationMsg?.severity} message={notificationMsg?.message} action={alertState} />}
            <Loader open={showLoader} />
        </Box>
    )
}