import React, { useState, useEffect } from 'react';
import { Box, Button, Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation, Link } from 'react-router-dom';
import PurchaseService from "../../../../services/Purchase.service";
import { Container } from './RequisitionList.styles';
import { VendorSelection } from "../../../Purchases/VendorSelection";
import { Loader } from "../../../Loader";
import { AlertMessage } from "../../../Alert";
import { CollapsibleTable } from './CollapsibleTable';

export const RequisitionList = () => {
    const [noDataAvailable, setNoDataAvailable] = useState(false);
    const [selectVendorAlert, setSelectVendorAlert] = useState(true);
    const [vendorDetails, setVendorDetails] = useState({});
    const [vendorData, setVendorData] = useState([]);
    const [rows, setRows] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const location = useLocation();

    useEffect(() => {
        console.log(location?.state?.data, 'state rList');
    }, [location]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const fetchRequisitionData = async (vendorId, date) => {
        setShowLoader(true);
        try {
            let data = await PurchaseService.getRequesitionData(vendorId);
            setSelectVendorAlert(false);

            if (date) {
                data = data.filter(item => new Date(item.date).toDateString() === new Date(date).toDateString());
            }

            const updatedData = data?.map(item => ({
                ...item,
                medicines: item.medicines.map(({ medicineId, ...rest }) => rest)
            }));
            
            setRows(updatedData || []);
            setNoDataAvailable(updatedData?.length === 0);
        } catch (err) {
            console.error('Error getting requisition data', err);
            setNoDataAvailable(false);
        } finally {
            setShowLoader(false);
        }
    };

    const handleVendorSelection = (vendorDetails) => {
        setVendorDetails({ vendorId: vendorDetails.value, date: '' });
        fetchRequisitionData(vendorDetails.value);
    };

    const handleDateSelection = (date) => {
        setVendorDetails(prevDetails => ({ ...prevDetails, date }));
        fetchRequisitionData(vendorDetails.vendorId, date);
    };

    useEffect(() => {
        const fetchVendorData = async () => {
            if (vendorDetails.vendorId) {
                setShowLoader(true);
                try {
                    const data = await PurchaseService.getVendor(vendorDetails.vendorId);
                    setVendorData(data);
                    setSelectVendorAlert(false);
                } catch (err) {
                    console.error('Error getting vendor data', err);
                } finally {
                    setShowLoader(false);
                }
            }
        };
        fetchVendorData();
    }, [vendorDetails.vendorId]);

    const generateEmailContent = (item) => {
        let emailContent = "Please see the list of medicines below:\n\n";
        emailContent += "Pharmacological Name       Brand Name       Dose       Form       Quantity\n";
        item?.medicines?.forEach(({ pharmacologicalName, brandName, dose, form, quantity }) => {
            emailContent += `${pharmacologicalName.padEnd(45)}${brandName.padEnd(20)}${dose.padEnd(10)}${form.padEnd(10)}${quantity}\n`;
        });
        return emailContent;
    };

    const openDefaultMailClient = (item) => {
        const emailContent = generateEmailContent(item);
        const emailLink = `mailto:?subject=Purchase Requisition&body=${encodeURIComponent(emailContent)}`;
        window.location.href = emailLink;
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Container>
                <VendorSelection onSelectVendor={handleVendorSelection} onSelectDate={handleDateSelection} />
                <Link to="/landing/purchase/requisition">
                    <Button variant="contained">Create New Requisition</Button>
                </Link>
            </Container>
            <Box sx={{ marginTop: 8 }}>
                {rows.length > 0 && <CollapsibleTable data={rows} vendorData={vendorData} />}
            </Box>
            {noDataAvailable && (
                <AlertMessage type="info" title="Info" message="No data available for this vendor" />
            )}
            {selectVendorAlert && (
                <AlertMessage type="info" title="Info" message="Please select a vendor to see purchase requisitions history" />
            )}
            <Loader open={showLoader} />
        </Box>
    );
};
