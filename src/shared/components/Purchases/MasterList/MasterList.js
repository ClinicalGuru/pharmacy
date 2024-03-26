
import React, { useState, useCallback, useEffect } from 'react';
import { Box } from "@mui/material";
import Button from '@mui/material/Button';
import { Container } from "./MasterList.styles";
import PurchaseService from "../../../services/Purchase.service";
import { Loader } from "../../Loader/index";
import { EditableTable } from "../../EditableTable";
import { useNavigate } from 'react-router-dom';

import { Form } from "../../Forms/index";

export const MasterList = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [vendorDetails, SetVendorDetails] = useState([]);
    const [rows, setRows] = useState([]);
    const [medicineList, setMedicineList] = useState([]);
    const [pharmacologicalNames, setPharmacologicalNames] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
    const [pricingOrder, setPricingOrder] = useState("");
    const navigate = useNavigate();
    const pricingOrderList = ['L1', 'L2', 'L3', 'L4', 'L5'];

    const [filter, setFilter] = useState({
        vendorId: "",
        medicineId: ""
    });
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

    const masterList_details_template = {
        
        fields: [
            {
                title: 'Select Vendor',
                type: 'autoComplete',
                name: 'vendorName',
                validationProps: {
                    required: ``
                },
                style: {
                    width: "200px"
                },
                options: [...vendorDetails]
            },
            {

                title: 'Price Order',
                type: 'autoComplete',
                name: 'priceOrder',
                validationProps: {
                    required: ` `
                },
                style: {
                    width: "200px"
                },
                options: [
                    {
                        value: "L1",
                        name: "L1",
                    },
                    {
                        value: "L2",
                        name: "L2",
                    },
                    {
                        value: "L3",
                        name: "L3",
                    },
                    {
                        value: "L4",
                        name: "L4",
                    },
                    {
                        value: "L5",
                        name: "L5",
                    },
                ],
            },
            {
                title: 'Select Pharmacological Name',
                type: 'autoComplete',
                name: 'pharmacologicalName',
                validationProps: {
                    required: ``
                },
                style: {
                    width: "200px"
                },
                options: [ ...pharmacologicalNames]
            },
        ],
    };

    const masterList_details_style = {
        display: "flex",
        // gap: "28px 28px",
        justifyContent: 'space-between'
    };

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

    const getVendors = async () => {
        setShowLoader(true);
        try {
            let data = await PurchaseService.getAllVendors();
            const result = data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id }));
            SetVendorDetails(result);
            setShowLoader(false);
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
            setPharmacologicalNames(result?.map((item) => ({ value: item?.id, name: item?.pharmacologicalName })));
            setBrandNames(result?.map((item) => ({ value: item?.id, name: item?.brandName })));
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
        setRows(updatedQuotationDetails);
        rows?.length > 0 && makePricingOrder();
        setShowLoader(false);
    }
    const getMedicineById = async (vendorId, medicineId) => {
        // console.log(id, 'val');
        setShowLoader(true);
        try {
            let data = await PurchaseService.medicineById(vendorId, medicineId);
            joinQuotationsWithVendors(data);
            setShowLoader(false);
        } catch (err) {
            setShowLoader(false);
            console.log(err, 'Master list get medicines by id');
        }
    }

    useEffect(() => {
        // Ensure both vendorId and medicineList are defined before making the API call
        getMedicineById(filter?.vendorId, filter?.medicineId);
    }, [filter]);

    const validate = useCallback((watchValues, errorMethods) => {
        // console.log('selectedVendor');
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilter(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleList = (e) => {
        const { value } = e.target;
        setPricingOrder(value);
        rows?.length > 0 && makePricingOrder();
    };
    const makePricingOrder = () => {
        const updatedRows = rows.map((element, index) => ({
            ...element,
            pricingOrder: pricingOrderList[index]
        }));
        setRows(updatedRows);
        console.log(rows, 'rows')
    }
    const onCreatePurchageOrder = () => {
        navigate(
            '/landing/purchase/order',
            {
                state: {
                    data: rows
                }
            })
    }
    return (
        <Box sx={{
            padding: 2,
        }}>
            <Container>
                {/* <form >
                    <div class="form-group">
                        <label class="form-label" for="vendorId">Select Vendor</label>
                        <select class="form-control" onChange={(e) => handleChange(e)} name="vendorId" >
                            <option value="">--select--</option>
                            {
                                vendorDetails?.map(({ name, id }) => <option key={id} value={id}>{name}</option>)
                            }
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="priceOrder">Price Order</label>
                        <select class="form-control" onChange={(e) => handleList(e)} name="list">
                            <option value="">--select--</option>
                            <option value="l1">L1</option>
                            <option value="l2">L2</option>
                            <option value="l3">L3</option>
                            <option value="l4">L4</option>
                            <option value="l5">L5</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="vendorId">Select Pharmacological Name</label>
                        <select class="form-control" onChange={(e) => handleChange(e)} name="medicineId">
                            <option value="">--select--</option>
                            {
                                medicineList?.map(({ value, name }) => <option key={value} value={value}>{name}</option>)
                            }
                        </select>
                    </div>
                </form> */}
                 <Box
                sx={{
                    backgroundColor: '#eef0f3',
                    borderRadius: '4px',
                    padding: 2,
                    marginTop: '5px'
                }}
            >
                <Form
                    template={masterList_details_template}
                    onValidate={validate}
                    showSubmitButton={true}
                    showClearFormButton={true}
                    form_styles={masterList_details_style}
                />
            </Box>
            </Container>
            <Box sx={{ marginTop: 3 }}>
                {/* <Table headArray={headArray} gridArray={rows} /> */}
                <Box sx={{ marginTop: 3 }}>
                    <EditableTable
                        columns={columns}
                        data={rows}
                        setData={setRows}
                        handleButtonClick={handleButtonClick}
                    />
                </Box>
            </Box>
            <div>
                {rows.length > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '10px' }}>
                        <Button variant="contained" onClick={onCreatePurchageOrder}>Create purchage order</Button>
                    </Box>
                )}
            </div>
            <Loader open={showLoader} />
        </Box>
    )
}