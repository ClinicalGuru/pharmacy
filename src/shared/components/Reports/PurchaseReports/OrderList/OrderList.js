import React, { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box } from "@mui/material";
import { VendorSelection } from "../../../Purchases/VendorSelection/index";
import Button from '@mui/material/Button';
import { CButton } from '../../../Button';
import PurchaseService from "../../../../services/Purchase.service";
import { Table } from "../../../Table";
import { Container } from './OrderList.styles'
import { OrderTable } from './OrderTable';

export const OrderList = () => {
    const [vendorData, setVendorData] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const [vendorDetails, setVendorDetails] = useState([]);
    const [rows, setRows] = useState([]);
    const [selectVendorAlert, setSelectVendorAlert] = useState(true);

    const handleVendorSelection = (vendorDetails) => {
        setVendorDetails({ vendorId: vendorDetails?.value, date: '' });
        getFilteredOrderList(vendorDetails.value)
        console.log(vendorDetails, 'details');
    };
    const handelDateSelection = (value) => {
        setVendorDetails({ vendorId: vendorDetails?.value, date: value })
    };

    const getFilteredOrderList = async (vendorId) => {
        try {
            let data = await PurchaseService.getPOData(vendorId);
            const filteredOrderWithQuotationId = data.reduce((acc, order) => {
                const quotationId = order.quotationId;
                if (!acc[quotationId]) {
                    acc[quotationId] = [];
                }
                acc[quotationId].push(order);
                return acc;
            }, {});
            // console.log(filteredOrderWithQuotationId, 'filteredOrderWithQuotationId');
            // const rowsData = Object.values(filteredOrderWithQuotationId).flat();
            console.log(filteredOrderWithQuotationId, 'filteredOrderWithQuotationId')
            setRows(filteredOrderWithQuotationId);
        } catch (err) {
        }
    };

    useEffect(() => {
        const vendorInfo = async () => {
            console.log(vendorDetails, 'vendor data');
            setShowLoader(true);
            try {
                let data = await PurchaseService.getVendor(vendorDetails.vendorId);
                setSelectVendorAlert(false);
                setVendorData(data);
                setShowLoader(false);
            } catch (err) {
                console.log(err, 'error getting requisition data');
                setShowLoader(false);
            }
        }
        vendorInfo();
    }, [vendorDetails]);

    return (
        <Box sx={{
            padding: 2,
        }}>
            <Container>
                <Container>
                    <VendorSelection
                        onSelectVendor={handleVendorSelection}
                        onSelectDate={handelDateSelection}
                    />
                </Container>
                <CButton
                    type="button"
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    text="Export as Excel"
                >
                </CButton>
            </Container>
            <Box sx={{ marginTop: 3 }}>
                <OrderTable
                    data={rows}
                    vendorData={vendorData}
                />
            </Box>
        </Box>

    )
}