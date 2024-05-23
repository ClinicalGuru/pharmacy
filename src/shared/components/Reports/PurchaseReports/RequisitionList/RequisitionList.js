import React, { useState, useEffect } from 'react';
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
import { Link } from 'react-router-dom';
import { PdfFile } from '../../../Pdf';
import { CollapsibleTable } from './CollapsibleTable'


export const RequisitionList = () => {
    const [noDataAvailable, setNoDataAvailable] = useState(false);
    const [selectVendorAlert, setSelectVendorAlert] = useState(true);
    const [vendorDetails, setVendorDetails] = useState([]);
    const [vendorData, setVendorData] = useState([]);
    const [rows, setRows] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const [expanded, setExpanded] = React.useState(false);
    let location = useLocation();
    useEffect(() => {
        console.log(location?.state?.data, 'state rList');
    }, [location]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const getFilteredRequestionData = async (vendorId) => {
        setShowLoader(true);
        try {
            let data = await PurchaseService.getRequesitionData(vendorId);
            setSelectVendorAlert(false);
            const updatedObj = data?.map((item) => ({
                ...item,
                medicines: item?.medicines?.map((med) => {
                    const { medicineId, ...rest } = med;
                    return rest;
                })
            }));
            setRows([...updatedObj]);
            setShowLoader(false);
            if (updatedObj && updatedObj?.length === 0) setNoDataAvailable(true);
            else setNoDataAvailable(false);
            ;
        } catch (err) {
            console.log(err, 'error getting requisition data');
            setShowLoader(false);
            setNoDataAvailable(false);
        }
    };

    const handleVendorSelection = (vendorDetails) => {
        setVendorDetails({ vendorId: vendorDetails?.value, date: '' });
        getFilteredRequestionData(vendorDetails?.value);
        console.log(vendorDetails, 'details');
    };

    const handelDateSelection = (value) => {
        setVendorDetails({ vendorId: vendorDetails?.value, date: value })
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

    const generateEmailContent = (item) => {
        let emailContent = "Please see the list of medicines below:\n\n";
        emailContent += "Pharmacological Name       Brand Name       Dose       Form       Quantity\n";
        item?.medicines?.forEach((row) => {
            emailContent += `${row.pharmacologicalName.padEnd(45)}${row.brandName.padEnd(20)}${row.dose.padEnd(10)}${row.form.padEnd(10)}${row.quantity}\n`;
        });
        return emailContent;
    };

    const openDefaultMailClient = (item) => {
        const emailContent = generateEmailContent(item);
        const emailLink = `mailto:?subject=Purchase Requisition&body=${encodeURIComponent(emailContent)}`;
        window.location.href = emailLink;
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
                <Link to="/landing/purchase/requisition">
                    <Button variant="contained" >Create New Requisition</Button>
                </Link>
            </Container>
            <Box sx={{ marginTop: 8 }}>
                {rows?.length > 0 && <CollapsibleTable
                    data={rows}
                    vendorData={vendorData}
                />}

            </Box>
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