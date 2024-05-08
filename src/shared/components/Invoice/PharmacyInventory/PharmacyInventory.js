

import React, { useState, useEffect } from 'react';
import { Box, } from "@mui/material";
import { Form } from "../../Forms/index";
import Button from '@mui/material/Button';
import EnhancedTable from './denseTable'
import { Container } from "./PharmacyInventory.styles";
import InventoryService from '../../../services/inventory.service';

export const PharmacyInventory = () => {
    let [rows, setRows] = useState([]);
    let vendor_details_template = {
        title: '',
        submitButttonText: 'Log in',
        formStyles: {
            backgroundColor: "#eee",
        },
        fields: [
            {
                title: 'Search',
                type: 'text',
                name: 'text',
                validationProps: {
                    required: ""
                },
                style: {
                    width: "194px"
                }
            },
            {
                title: 'Total Qty & Value',
                type: 'date',
                name: 'date',
                validationProps: {
                    required: "Date is required"
                },
                style: {
                    width: "200px"
                }
            },
            {
                title: 'Consumption Qty & Value',
                type: 'date',
                name: 'date',
                validationProps: {
                    required: "Date is required"
                },
                style: {
                    width: "200px"
                }
            },
        ],
    };

    const vendor_details_style = {
        display: "flex",
        gap: "28px 30px",
        // justifyContent: "space-between"
    };
    const btn_styles = { display: "flex", justifyContent: "end" };
    const onSubmit = (form) => {
        console.log(form);
    };

    const validate = (watchValues, errorMethods) => {
        // console.log(watchValues, 'watchValues')
    };
    // const handleDeleteRow = (targetIndex) => {
    //     setRows(rows.filter((_, idx) => idx !== targetIndex));
    // };

    useEffect(() => {
        const getInventory = async () => {
            try {
                let data = await InventoryService.getInventory();
                const result = data?.docs?.map((doc) => ({ ...doc?.data(), id: doc?.id }));
                result.forEach(item => {
                    item['unitsInStock'] = (item?.quantity * (Number(item?.noOfStrips) + Number(item?.freeStrips)));
                })
                console.log(result, 'inventory');
                setRows(result)
            } catch (err) {

            }
        }
        getInventory();
        // const data = InventoryService.getInventory();
        // console.log(data, 'inventory');
    }, [])

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
                <div>
                    <Button variant="contained">Minimal Quantity</Button>

                </div>
            </Container>
            <Box sx={{ marginTop: 3 }}>
                <EnhancedTable data = {rows}/>
            </Box>
        </Box>
    )
}