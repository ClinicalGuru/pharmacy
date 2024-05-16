import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import { Container } from './Payments.styles';
import PurchaseService from "../../../services/Purchase.service";
import { Loader } from "../../Loader/index";
import { EditableTable } from "../../EditableTable";
import CreatableSelect from 'react-select/creatable';
import { Notification } from '../../Notification/index';
import paymentData from '../../../../mock/paymentsData.json';
import PaymentTable from './PaymentsTable'


export const Payments = () => {

    const [vendorDetails, SetVendorDetails] = useState([]);
    const [rows, setRows] = useState( []);
    const [showLoader, setShowLoader] = useState(false);
    const [notification, setNotification] = useState(false);
    const [vendorId, setVendorId] = useState("");
    const [data, setData] = useState(paymentData.paymentData);

    const columns = [
        {
            'Header': 'Due Invoice No',
            'accessor': 'dueInvoiceNo',
            editEnable: false,
        },
        {
            'Header': 'vendor Name',
            'accessor': 'vendorName',
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
            "popup": "popup"
        },
        {
            'Header': '',
            'accessor': 'paymenthistory',
            editEnable: false,
            "popup": "popup"
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
    useEffect(() => {
        getVendors();
    }, []);

    const vendorHandler = (e) => {
        const { value } = e
        setVendorId(value);
    }

    const invoiceNumHandler = (e) => {

    }

    const gstNumHandler = (e) => {

    }

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
                            onChange={(e) => invoiceNumHandler(e)}
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
                            onChange={(e) => gstNumHandler(e)}
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
                            styles={{
                                container: (provided) => ({
                                    ...provided,
                                    width: 200,
                                    marginRight: 50
                                })
                            }}
                        />
                    </div>

                </form>
            </Container>

            <Box sx={{ marginTop: 3 }}>
                <PaymentTable/>
            </Box>
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