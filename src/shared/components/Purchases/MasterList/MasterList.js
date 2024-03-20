
import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import Button from '@mui/material/Button';
import { Container } from "./MasterList.styles";
import PurchaseService from "../../../services/Purchase.service";
import { Loader } from "../../Loader/index";
import { EditableTable } from "../../EditableTable";
import { useForm } from "react-hook-form";

export const MasterList = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [vendorDetails, SetVendorDetails] = useState([]);
    const [rows, setRows] = useState([]);
    const [medicineList, setMedicineList] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
    const [filter, setFilter] = useState({
        vendorId: "",
        list: "",
        medicineId: ""
    });
    const columns = [
        {
            'Header': 'S.No',
            'accessor': 's.no',
            editEnable: false,
        },
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
            console.log(result, 'result ven')
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
            const result = data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id }));
            setMedicineList(result.map((item) => ({ value: item?.id, name: item?.brandName })));
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

    const getMedicineById = async (vendorId, medicineId) => {
        // console.log(id, 'val');
        setShowLoader(true);
        try {
            let data = await PurchaseService.medicineById(vendorId, medicineId);
            console.log(data, 'data');
            setRows(data);
        } catch (err) {
            console.log(err, 'Master list get medicines by id');
        }
    }

    useEffect(() => {
        console.log("Filter changed:", filter);
        // Ensure both vendorId and medicineList are defined before making the API call
        if (filter.vendorId !== undefined && filter.medicineList !== undefined) {
            getMedicineById(filter.vendorId, filter.medicineList);
        }
    }, [filter.vendorId, filter.medicineList]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilter(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    return (
        <Box sx={{
            padding: 2,
        }}>
            <Container>
                <form >
                    <select onChange={(e) => handleChange(e)} name="vendorId" >
                        <option value="">--select--</option>
                        {
                            vendorDetails?.map(({ name, id }) => <option key={id} value={id}>{name}</option>)
                        }
                    </select>

                    <select onChange={(e) => handleChange(e)} name="list">
                        <option value="">--select--</option>
                        <option value="l1">L1</option>
                        <option value="l2">L2</option>
                        <option value="l3">L3</option>
                        <option value="l4">L4</option>
                        <option value="l5">L5</option>
                    </select>
                    <select onChange={(e) => handleChange(e)} name="medicineId">
                        <option value="">--select--</option>
                        {
                            medicineList?.map(({ value, name }) => <option key={value} value={value}>{name}</option>)
                        }
                    </select>
                </form>
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
                        <Button variant="contained">Save</Button>
                    </Box>
                )}
            </div>
        </Box>
    )
}