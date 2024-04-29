import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import Button from '@mui/material/Button';
import { Container } from './Payments.styles';
import { styled } from '@mui/material/styles';
import PurchaseService from "../../../services/Purchase.service";
import { Loader } from "../../Loader/index";

import { EditableTable } from "../../EditableTable";
import { useNavigate } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import { Notification } from '../../Notification/index';

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
export const Payments = () => {

    const data = [
        {
          dueInvoiceNo: 'INV001',
          vendorname: 'Vendor A',
          dueDate: '2024-04-30',
          invoiceAmount: 1000,
          paidAmount: 500,
          dueAmount: 500,
          paymentStatus: 'Pending',
          addPaymentdetails:"add payment details",
          paymenthistory:"payment history"
        },
        {
          dueInvoiceNo: 'INV002',
          vendorname: 'Vendor B',
          dueDate: '2024-05-15',
          invoiceAmount: 1500,
          paidAmount: 1500,
          dueAmount: 0,
          paymentStatus: 'Paid',
          addPaymentdetails:"add payment details",
          paymenthistory:"payment history"
        },
        // Add more objects as needed
      ];
    const [showLoader, setShowLoader] = useState(false);
    const [vendorDetails, SetVendorDetails] = useState([]);
    const [quotationDetails, setQuotations] = useState([]);
    const [rows, setRows] = useState( [
        {
          dueInvoiceNo: 'INV001',
          vendorname: 'Vendor A',
          dueDate: '2024-04-30',
          invoiceAmount: 1000,
          paidAmount: 500,
          dueAmount: 500,
          paymentStatus: 'Pending',
        },
        {
          dueInvoiceNo: 'INV002',
          vendorname: 'Vendor B',
          dueDate: '2024-05-15',
          invoiceAmount: 1500,
          paidAmount: 1500,
          dueAmount: 0,
          paymentStatus: 'Paid',
        },
        // Add more objects as needed
      ]);
    const [pharmacologicalNames, setPharmacologicalNames] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
    const [pricingOrder, setPricingOrder] = useState("");
    const [originalData, setOriginalData] = useState([]);
    const [notification, setNotification] = useState(false);
    const columnsToHide = ['actions'];
    const navigate = useNavigate();
    const [vendorId, setVendorId] = useState("");
    
    const [pMed, setPMedId] = useState("");
    const columns = [
        {
            'Header': 'Due Invoice No',
            'accessor': 'dueInvoiceNo',
            editEnable: false,
        },
        {
            'Header': 'vendor Name',
            'accessor': 'vendorname',
            editEnable: false,
        },
        {
            'Header': 'Due Date',
            'accessor': 'dueDate',
            editEnable: false,
        },
        {
            'Header': 'Invoice Amount',
            'accessor': 'invoiceAmount',
            editEnable: false,
        },
        {
            'Header': 'Paid Amount',
            'accessor': 'paidAmount',
            editEnable: false,
        },
        {
            'Header': 'Due Amount',
            'accessor': 'dueAmount',
            editEnable: false,
        },
        {
            'Header': 'Payment Status',
            'accessor': 'paymentStatus',
            editEnable: false,
        },
        {
            'Header': '',
            'accessor': 'addPaymentdetails',
            editEnable: false,
            "popup":"popup"
        },
        {
            'Header': '',
            'accessor': 'paymenthistory',
            editEnable: false,
            "popup":"popup"
        }
       
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
        setOriginalData(newData)
    };

    const getVendors = async () => {
        setShowLoader(true);
        try {
            let data = await PurchaseService.getAllVendors();
            const result = data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id }));
            SetVendorDetails(result);
            setShowLoader(false);
            getAllQuotationsData();
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
            setPharmacologicalNames(result);
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

    const joinQuotationsWithVendors = () => {
        setShowLoader(true);
        let vendorMap = new Map();
        for (const vendor of vendorDetails) {
            vendorMap.set(vendor.id, vendor.name)
        }
        const updatedQuotationDetails = quotationDetails?.map((quotation) => ({
            ...quotation,
            vendorName: vendorMap.get(quotation.vendorId)
        }));
        let medicineIdCount = {};
        updatedQuotationDetails?.forEach(medicine => {
            if (medicine.medicineId in medicineIdCount) {
                medicineIdCount[medicine.medicineId]++;
            } else {
                medicineIdCount[medicine.medicineId] = 1;
            }
        });
        updatedQuotationDetails.forEach(medicine => {
            const count = medicineIdCount[medicine.medicineId];
            if (count === 1) {
                medicine.pricingOrder = 'L1';
            } else {
                const sameMedicines = updatedQuotationDetails.filter(med => med.medicineId === medicine.medicineId);
                sameMedicines.sort((a, b) => parseFloat(a?.ptr) - parseFloat(b?.ptr));
                for (let i = 0; i < sameMedicines.length; i++) {
                    sameMedicines[i].pricingOrder = `L${i + 1}`;
                }
            }
        });
        setOriginalData(updatedQuotationDetails);
        setShowLoader(false);
    }

    const getAllQuotationsData = async () => {
        setShowLoader(true);
        try {
            let data = await PurchaseService.getAllQuotationData();
            const result = data?.docs?.map((doc) => ({ ...doc?.data(), id: doc?.id }));
            setQuotations(result);
            setShowLoader(false);
        } catch (err) {
            setShowLoader(false);
            console.log(err, 'Master list get medicines by id');
        }
    }

    useEffect(() => {
        quotationDetails?.length > 0 && joinQuotationsWithVendors()
    }, [quotationDetails])

    const vendorHandler = (e) => {
        const { value } = e
        setVendorId(value);
    }
    const pNameHandler = (e) => {
        const { value } = e;
        setPMedId(value);
    }
    const handleList = (e) => {
        const { value } = e.target;
        setPricingOrder(value);
    };

    const onCreatePurchageOrder = () => {
        if (vendorId === "") {
            setNotification(true);
            return;
        };
        navigate(
            '/landing/purchase/order',
            {
                state: {
                    data: rows
                }
            })
    };
    useEffect(() => {
        let filteredRows;
        if (vendorId && vendorId !== '' && pMed && pMed !== '') {
            filteredRows = originalData.filter((item) => item?.vendorId === vendorId && item?.medicineId === pMed);
        } else if (vendorId && vendorId !== '') {
            filteredRows = originalData.filter((item) => item?.vendorId === vendorId)
        } else if (pMed && pMed !== '') {
            filteredRows = originalData.filter((item) => item?.medicineId === pMed)
        } else {
            filteredRows = originalData;
        }
        if (pricingOrder) {
            if (filteredRows?.length > 0) {
                filteredRows = filteredRows.filter((item) => item?.pricingOrder === pricingOrder);
            } else {
                filteredRows = originalData.filter((item) => item?.pricingOrder === pricingOrder);
            }
        }
        setRows(filteredRows);
    }, [vendorId, pMed, pricingOrder]);

    const alertState = () => {
        setNotification(!notification);
    };

     const onSaveQuotation = async () => {
        setShowLoader(true);
        
        const data = rows.map((item) => ({ ...item, ...quotationDetails }));
        try {
            await PurchaseService.saveQuotation(data).then((res) => {
                console.log(res, 'Quotation data saved successfully');
                setShowLoader(false);
                alertState();
            });
        } catch (err) {
            console.log(err, 'err while adding quotation data');
            setShowLoader(false);
        }
    };
    
    return (
        <Box sx={{ padding: 2 }}>
    <Container>
        <form>
            <div className="form-group">
                <label className="form-label" for="vendorId">Select Vendor</label>
                <CreatableSelect
                    options={vendorDetails?.map(vendor => ({ value: vendor?.id, label: vendor?.name }))}
                    onChange={(e) => vendorHandler(e)}
                    styles={{
                        container: (provided) => ({
                            ...provided,
                            width: 200,
                            marginRight: 50
                        })
                    }}
                />
            </div>
            <div className="form-group">
                <label for="vendorId">Invoice Number</label>
                <CreatableSelect
                    // options={pharmacologicalNames?.map(med => ({ value: med?.id, label: med?.pharmacologicalName }))}
                    onChange={(e) => pNameHandler(e)}
                    styles={{
                        container: (provided) => ({
                            ...provided,
                            width: 200,
                            marginRight: 50
                        })
                    }}
                />
                    </div>
                    <div className="form-group">
                <label for="vendorId">GST Number</label>
                <CreatableSelect
                    // options={pharmacologicalNames?.map(med => ({ value: med?.id, label: med?.pharmacologicalName }))}
                    onChange={(e) => pNameHandler(e)}
                    styles={{
                        container: (provided) => ({
                            ...provided,
                            width: 200,
                            marginRight: 50
                        })
                    }}
                />
                    </div>
                    <div className="form-group">
                <label for="vendorId">Payment Status</label>
                <CreatableSelect
                    // options={pharmacologicalNames?.map(med => ({ value: med?.id, label: med?.pharmacologicalName }))}
                    onChange={(e) => pNameHandler(e)}
                    styles={{
                        container: (provided) => ({
                            ...provided,
                            width: 200,
                            marginRight: 50
                        })
                    }}
                />
                    </div>    
                    {/* <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '10px' }}>
                        <Button variant="contained" onClick={onSaveQuotation}>Payments List</Button>
                    </Box> */}
            
        </form>
            </Container>
            
    <Box sx={{ marginTop: 3 }}>
        <EditableTable
            columns={columns}
            data={data}
            setData={setRows}
            handleButtonClick={handleButtonClick}
            hideColumns={columnsToHide}
        />
    </Box>
    {/* <div>
        {rows.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '10px' }}>
                <Button variant="contained" onClick={onCreatePurchageOrder}>Go to purchase orders</Button>
            </Box>
        )}
    </div> */}
    {notification && <Notification notificationState={notification} severity="info" message="Please select vendor" action={alertState} />}
    <Loader open={showLoader} />
</Box>

    )
}

{/* // import React, { useState, useEffect } from 'react';
// import { FORM_LABELS } from "../../../Constants/index";

// import { Box } from "@mui/material";
// import { Form } from "../../Forms/index";
// // import Table from '@mui/material/Table';
// import Button from '@mui/material/Button';
// import { Container } from "./Payments.styles";
// // import { AddVendor } from "./AddVendorModal";
// import PurchaseService from "../../../services/Purchase.service";
// import { Table } from "../../Table";
// export const Payments = () => {
    
//     return (
//         <Box></Box>

//     )
// } */}