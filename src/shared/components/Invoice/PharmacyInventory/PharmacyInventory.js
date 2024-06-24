

import React, { useState, useEffect } from 'react';
import { Box, } from "@mui/material";
import Button from '@mui/material/Button';
import { Container } from "./PharmacyInventory.styles";
import InventoryService from '../../../services/inventory.service';
import { InventoryTable } from './denseTable';
import { filterInventoryByExpiry, isLessThanTwentyPercent, filterItemsOlderThanSixMonths } from "../../../../utils/helper";
import { DownloadExcel } from "./DownloadAsExcel";

export const PharmacyInventory = () => {
    const [originalList, setOriginalList] = useState([]);
    let [rows, setRows] = useState([]);
    let [medicineName, setMedicineName] = useState('');
    const columns = [
        {
            'Header': 'Medicine Name',
            'accessor': 'brandName',
        },
        {
            'Header': 'Batch Number',
            'accessor': 'batchNo',
        },
        {
            'Header': 'Expiry',
            'accessor': 'expiry',
        },
        {
            'Header': 'MRP',
            'accessor': 'mrpPerStrip',
        },
        {
            'Header': 'Discount',
            'accessor': 'discount',
        },
        {
            'Header': 'Price',
            'accessor': 'pricePerStrip',
        },
        {
            'Header': 'Units Per Strip',
            'accessor': 'quantity',
        },
        {
            'Header': 'Price Per Unit',
            'accessor': 'pricePerUnit',
        },
        {
            'Header': 'Units In Stock',
            'accessor': 'unitsInStock',
        },
        {
            'Header': 'GST %',
            'accessor': 'gst',
        }
    ];

    useEffect(() => {
        const getInventory = async () => {
            try {
                let data = await InventoryService.getInventory();
                const result = data?.docs?.map((doc) => ({ ...doc?.data(), id: doc?.id }));
                setRows(result);
                setOriginalList(result);
            } catch (err) {

            }
        }
        getInventory();
    }, []);

    useEffect(() => {
        let input = medicineName;
        const filteredList = originalList?.filter(item =>
            item.brandName.toLowerCase().includes(input.toLowerCase())
        );
        setRows(filteredList);
    }, [medicineName]);

    const medicineNameHandler = (e) => {
        setMedicineName(e.target.value)
    }

    const inventoryFilterHandler = (e) => {
        const value = e.target.value;
        let filteredList = [];
        if (value === "zeroStocks") {
            filteredList = originalList?.filter((medicine) => Number(medicine.unitsInStock) === Number(0));
        } else if (value === "deadStocks") {
            const referenceDate = new Date();
            const referenceTimestamp = referenceDate.valueOf();
            const sixMonthsInMillis = 6 * 30 * 24 * 60 * 60 * 1000;
            filteredList = originalList.filter(medicine => {
                return medicine.stockEnteredDate && (referenceTimestamp - medicine.stockEnteredDate) >= sixMonthsInMillis && Number(medicine.unitsInStock) === Number(medicine?.deadStockQuantityCheck);
            });
        } else if (value === "lowStocks") {
            filteredList = originalList.filter((medicine) => isLessThanTwentyPercent(medicine.unitsInStock, medicine.deadStockQuantityCheck));
        } else if (value === "nonMovingStock") {
            filteredList = originalList.filter((medicine) => filterItemsOlderThanSixMonths(medicine));
        } else if (value === "nearExpiryStocks") {
            filteredList = filterInventoryByExpiry(originalList);
        }
        else {
            filteredList = originalList;
        }
        setRows(filteredList);
    }

    return (
        <Box sx={{
            padding: 2,
        }}>
            <Container>
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        gap: "10px"
                    }}
                >
                    <input
                        placeholder='Medicine Name'
                        onChange={(e) => medicineNameHandler(e)}
                        value={medicineName}
                    />
                    <select onChange={(e) => inventoryFilterHandler(e)}>
                        <option value="all">All</option>
                        <option value="zeroStocks">Zero stocks</option>
                        <option value="nearExpiryStocks">Near Expiry Stocks</option>
                        <option value="lowStocks">Low Stocks</option>
                        <option value="deadStocks">Dead Stocks</option>
                        <option value="nonMovingStock">Non moving stocks</option>
                    </select>
                </Box>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',

                }}>
                    <DownloadExcel sx={{
                        marginRight: '10px',
                        cursor: 'pointer'
                    }}
                        data={rows} />
                    {/* <Button variant="contained">Minimal Quantity</Button> */}
                </div>
            </Container>
            <Box sx={{ marginTop: 3 }}>
                <InventoryTable
                    headArray={columns}
                    gridArray={rows}
                    setData={setRows}
                />
            </Box>
        </Box >
    )
}