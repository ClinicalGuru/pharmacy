

import React, { useState, useEffect } from 'react';
import { Box, } from "@mui/material";
import Button from '@mui/material/Button';
import { Container } from "./PharmacyInventory.styles";
import InventoryService from '../../../services/inventory.service';
import { InventoryTable } from './denseTable'

export const PharmacyInventory = () => {
    const [originalList, setOriginalList] = useState([]);
    let [rows, setRows] = useState([]);
    let [medicineName, setMedicineName] = useState('');
    const columns = [
        {
            'Header': 'Medicine Name',
            'accessor': 'brandName',
        },
        // {
        //     'Header': 'Invoice Number',
        //     'accessor': 'invoiceNumber',
        // },
        {
            'Header': 'Batch Number',
            'accessor': 'batchNo',
        },
        {
            'Header': 'Expity',
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
        },
        {
            'Header': 'Stock Alert',
            'accessor': 'stockAlert',
        }
    ];

    useEffect(() => {
        const getInventory = async () => {
            try {
                let data = await InventoryService.getInventory();
                const result = data?.docs?.map((doc) => ({ ...doc?.data(), id: doc?.id }));
                result.forEach(item => {
                    item['unitsInStock'] = (item?.quantity * (Number(item?.noOfStrips) + Number(item?.freeStrips)));
                })
                console.log(result, 'inventory');
                setRows(result);
                setOriginalList(result);
            } catch (err) {

            }
        }
        getInventory();
    }, []);

    useEffect(() => {
        console.log('name')
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

    }
    return (
        <Box sx={{
            padding: 2,
        }}>
            <Container>
                <form>
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
                    </select>
                </form>
                <div>
                    <Button variant="contained">Minimal Quantity</Button>
                </div>
            </Container>
            <Box sx={{ marginTop: 3 }}>
                <InventoryTable
                    headArray={columns}
                    gridArray={rows}
                    setData={setRows}
                />
            </Box>
        </Box>
    )
}