
import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import Button from '@mui/material/Button';
import { Container } from "./MasterList.styles";
import PurchaseService from "../../../services/Purchase.service";
import { Loader } from "../../Loader/index";
import { EditableTable } from "../../EditableTable";
import { useNavigate } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import { Notification } from '../../Notification/index';

export const MasterList = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [vendorDetails, SetVendorDetails] = useState([]);
    const [quotationDetails, setQuotations] = useState([]);
    const [rows, setRows] = useState([]);
    const [pharmacologicalNames, setPharmacologicalNames] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
    const [pricingOrder, setPricingOrder] = useState("");
    const [originalData, setOriginalData] = useState([]);
    const [notification, setNotification] = useState(false);
    const columnsToHide = ['actions'];
    const navigate = useNavigate();
    const [vendorId, setVendorId] = useState("");
    const [pMed, setPMedId] = useState("");
    const columns = [
        {
            'Header': 'Vendor Name',
            'accessor': 'vendorName',
            editEnable: false,
        },
        {
            'Header': 'Pricing Order',
            'accessor': 'pricingOrder',
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
            'Header': 'MRP',
            'accessor': 'mrp',
            editEnable: false,
        },
        {
            'Header': 'PTR',
            'accessor': 'ptr',
            editEnable: false,
        },
        {
            'Header': 'pts',
            'accessor': 'pts',
            editEnable: false,
        },
        {
            'Header': 'GST',
            'accessor': 'gst',
            editEnable: false,
        },
        {
            'Header': 'Discount',
            'accessor': 'discount',
            editEnable: false,
        },
        {
            Header: "Actions",
            id: "actions",
            disableSortBy: true,
            show: false,
            Cell: ({ row, column, cell }) =>
                row.original.disableActions ? (
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
        setOriginalData(newData)
    };

    const getVendors = async () => {
        setShowLoader(true);
        try {
            let data = await PurchaseService.getAllVendors();
            const result = data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id }));
            SetVendorDetails(result);
            setShowLoader(false);
            getAllQuotationsData();
        } catch (e) {
            console.log(e, 'error allVendors');
            setShowLoader(false);
        }
    };
    const getMedicines = async () => {
        setShowLoader(true);
        try {
            let data = await PurchaseService.getAllMedicines();
            const result = data?.docs?.map((doc) => ({ ...doc?.data(), id: doc?.id }));
            setPharmacologicalNames(result);
            setShowLoader(false);
        } catch (e) {
            console.log(e, 'error allVendors');
            setShowLoader(false);
        }
    }
    useEffect(() => {
        getVendors();
        getMedicines();
    }, []);

    const joinQuotationsWithVendors = () => {
        setShowLoader(true);
        let vendorMap = new Map();
        for (const vendor of vendorDetails) {
            vendorMap.set(vendor.id, vendor.name)
        }
        const updatedQuotationDetails = quotationDetails?.map((quotation) => ({
            ...quotation,
            vendorName: vendorMap.get(quotation.vendorId)
        }));
        let medicineIdCount = {};
        updatedQuotationDetails?.forEach(medicine => {
            if (medicine.medicineId in medicineIdCount) {
                medicineIdCount[medicine.medicineId]++;
            } else {
                medicineIdCount[medicine.medicineId] = 1;
            }
        });
        updatedQuotationDetails.forEach(medicine => {
            const count = medicineIdCount[medicine.medicineId];
            if (count === 1) {
                medicine.pricingOrder = 'L1';
            } else {
                const sameMedicines = updatedQuotationDetails.filter(med => med.medicineId === medicine.medicineId);
                sameMedicines.sort((a, b) => parseFloat(a?.ptr) - parseFloat(b?.ptr));
                for (let i = 0; i < sameMedicines.length; i++) {
                    sameMedicines[i].pricingOrder = `L${i + 1}`;
                }
            }
        });
        setOriginalData(updatedQuotationDetails);
        setShowLoader(false);
    }

    const getAllQuotationsData = async () => {
        setShowLoader(true);
        try {
            let data = await PurchaseService.getAllQuotationData();
            const result = data?.docs?.map((doc) => ({ ...doc?.data(), id: doc?.id }));
            setQuotations(result);
            setShowLoader(false);
        } catch (err) {
            setShowLoader(false);
            console.log(err, 'Master list get medicines by id');
        }
    }

    useEffect(() => {
        quotationDetails?.length > 0 && joinQuotationsWithVendors()
    }, [quotationDetails])

    const vendorHandler = (e) => {
        const { value } = e
        setVendorId(value);
    }
    const pNameHandler = (e) => {
        const { value } = e;
        setPMedId(value);
    }
    const handleList = (e) => {
        const { value } = e.target;
        setPricingOrder(value);
    };

    const onCreatePurchageOrder = () => {
        if (vendorId === "") {
            setNotification(true);
            return;
        };
        navigate(
            '/landing/purchase/order',
            {
                state: {
                    data: rows
                }
            })
    };
    useEffect(() => {
        let filteredRows;
        if (vendorId && vendorId !== '' && pMed && pMed !== '') {
            filteredRows = originalData.filter((item) => item?.vendorId === vendorId && item?.medicineId === pMed);
        } else if (vendorId && vendorId !== '') {
            filteredRows = originalData.filter((item) => item?.vendorId === vendorId)
        } else if (pMed && pMed !== '') {
            filteredRows = originalData.filter((item) => item?.medicineId === pMed)
        } else {
            filteredRows = originalData;
        }
        if (pricingOrder) {
            if (filteredRows?.length > 0) {
                filteredRows = filteredRows.filter((item) => item?.pricingOrder === pricingOrder);
            } else {
                filteredRows = originalData.filter((item) => item?.pricingOrder === pricingOrder);
            }
        }
        setRows(filteredRows);
    }, [vendorId, pMed, pricingOrder]);

    const alertState = () => {
        setNotification(!notification);
    };

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
                    <div className="form-group">
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
                    </div>
                    <div className="form-group">
                        <label for="priceOrder">Price Order</label>
                        <select style={{ marginRight: '2rem' }} className="form-control" onChange={(e) => handleList(e)} name="list">
                            <option value="">--All--</option>
                            <option value="L1">L1</option>
                            <option value="L2">L2</option>
                            <option value="L3">L3</option>
                            <option value="L4">L4</option>
                            <option value="L5">L5</option>
                        </select>
                    </div>
                    {/* <div className="form-control">
                        <button>Clear filters</button>
                    </div> */}
                </form>}
            </Container>
            <Box sx={{ marginTop: 3 }}>
                {/* <Table headArray={headArray} gridArray={rows} /> */}
                <Box sx={{ marginTop: 3 }}>
                    <EditableTable
                        columns={columns}
                        data={rows}
                        setData={setRows}
                        handleButtonClick={handleButtonClick}
                        hideColumns={columnsToHide}
                    />
                </Box>
            </Box>
            <div>
                {rows.length > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '10px' }}>
                        <Button variant="contained" onClick={onCreatePurchageOrder}>Go to purchase orders</Button>
                    </Box>
                )}
            </div>
            {notification && <Notification notificationState={notification} severity="info" message="Please select vendor before creating PO" action={alertState} />}
            <Loader open={showLoader} />
        </Box>
    )
}