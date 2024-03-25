import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box } from "@mui/material";
import Button from '@mui/material/Button';
import PurchaseService from "../../../../services/Purchase.service";
import { Container } from './RequisitionList.styles';
import { VendorSelection } from "../../../Purchases/VendorSelection/index";
import { Loader } from "../../../Loader/index";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AlertMessage } from "../../../Alert/index";
import { useLocation } from 'react-router-dom';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
export const RequisitionList = () => {
    const [noDataAvailable, setNoDataAvailable] = useState(false);
    const [selectVendorAlert, setSelectVendorAlert] = useState(true);
    const [vendorDetails, setVendorDetails] = useState([]);
    const [rows, setRows] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const [expanded, setExpanded] = React.useState(false);
    let location = useLocation();
    useEffect(() => {
        // setRows(location.state.data);
        console.log(location.state.data, 'state rList');
    }, [location]);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const getFilteredRequestionData = async (vendorId) => {
        console.log(vendorId, 'vendorId quotation.js')
        setShowLoader(true);
        try {
            let data = await PurchaseService.getRequesitionData(vendorId);
            setSelectVendorAlert(false);
            console.log(data, 'data');
            setRows([...data]);
            setShowLoader(false);
            if (data?.length === 0) {
                setNoDataAvailable(true);
            } else {
                setNoDataAvailable(false);
            };
        } catch (err) {
            console.log(err, 'error getting requisition data');
            setShowLoader(false);
        }
    };

    const handleVendorSelection = (vendorDetails) => {
        // vendorDetails?.vendorId = vendorId;
        setVendorDetails({ vendorId: vendorDetails?.value, date: '' });
        getFilteredRequestionData(vendorDetails?.value);
    };

    const handelDateSelection = (value) => {
        setVendorDetails({ vendorId: vendorDetails?.value, date: value })
        // getFilteredRequestionData(vendorDetails);
    };

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
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Export as Excel
                    <VisuallyHiddenInput type="file" />
                </Button>
            </Container>
            <div sx={{ marginTop: 8 }}>
                {rows?.map((item) => {
                    return (
                        <Accordion expanded={expanded === item?.requesitionId} onChange={handleChange(item?.requesitionId)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    Created Date: {item?.requesitionCreatedDate}
                                </Typography>
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                    Status: {item?.status}
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>Number of medicines ordered: {item?.medicines?.length}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Pharmacological Name</th>
                                            <th align="right">Brand Name</th>
                                            <th align="right">Dose</th>
                                            <th align="right">Form</th>
                                            <th align="right">Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item?.medicines?.map((row) => (
                                            <tr
                                                key={row.pharmacologicalName}
                                            >
                                                <td>
                                                    {row.pharmacologicalName}
                                                </td>
                                                <td align="right">{row.brandName}</td>
                                                <td align="right">{row.dose}</td>
                                                <td align="right">{row.form}</td>
                                                <td align="right">{row.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
            </div>
            {noDataAvailable && <AlertMessage
                type="info"
                title="Info"
                message="No data availablefor this vendor" />}
            {selectVendorAlert && <AlertMessage
                type="info"
                title="Info"
                message="Please select vendor to see purchage requisitions history" />}
            <Loader open={showLoader} />
        </Box>
    )
}