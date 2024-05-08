

import React, { useState, useEffect } from 'react';
import { Box, } from "@mui/material";
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
// import EnhancedTable from './denseTable'
import { Container } from "./PharmacyInventory.styles";
import InventoryService from '../../../services/inventory.service';
import { Table } from '../../Table/index'

export const PharmacyInventory = () => {
    const { register, watch, formState: { errors }, handleSubmit } = useForm();
    const whatFiled = watch(["medicineName"]); // when pass nothing as argument, you are watching everything
    const [originalList, setOriginalList] = useState([]);
    let [rows, setRows] = useState([]);
    const columns = [
        {
            'Header': 'Medicine Name',
            'accessor': 'brandName',
        },
        {
            'Header': 'Invoice Number',
            'accessor': 'invoiceNumber',
        },
        {
            'Header': 'Batch Number',
            'accessor': 'batchNumber',
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
        let input = '';
        const subscription = watch((value, { name, type }) => input = value.medicineName);
        const filteredList = originalList?.filter(item =>
            item.brandName.toLowerCase().includes(input.toLowerCase())
        );
        setRows(filteredList)
        return () => subscription.unsubscribe();

    }, [watch]);
    
    return (
        <Box sx={{
            padding: 2,
        }}>
            <Container>
                <form>
                    <input
                        placeholder='Medicine Name'
                        {...register("medicineName", {
                            required: true, minLength: {
                                value: 3,
                                message: "Input must be at least 3 characters long"
                            }
                        })}
                    />
                </form>
                <div>
                    <Button variant="contained">Minimal Quantity</Button>

                </div>
            </Container>
            <Box sx={{ marginTop: 3 }}>
                <Table
                    headArray={columns}
                    gridArray={rows}
                    setData={setRows}
                />
            </Box>
        </Box>
    )
}