import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { PurchaseRequisition } from "./shared/components/Purchases";
import { Quotations } from "./shared/components/Purchases/Quotation/index";
import { PurchaseOrders } from "./shared/components/Purchases/PurchaseOrders";
import { MasterList } from "./shared/components/Purchases/MasterList";
import { AddInvoice } from "./shared/components/Invoice";
import { Payments} from "./shared/components/Purchases/PurchasePayments/index";
import { OrderList } from './shared/components/Reports/PurchaseReports/OrderList/OrderList';

import { PurchaseReports} from "./shared/components/Reports/PurchaseReports/index";
import { ImportantReports} from "./shared/components/Reports/ImportantReport/index";
import { SalesReports} from "./shared/components/Reports/SalesReports/index";
import { InventoryReport} from "./shared/components/Reports/InventoryReport/index";
import "./index.css";
import { PharmacyInventory } from "./shared/components/Invoice/PharmacyInventory/index";
import { AllBills } from "./shared/components/Sales/AllBills/AllBills";
import { Sales } from "./shared/components/Sales";
import { SignIn } from "./shared/components/SignIn";
import { RequisitionList } from "./shared/components/Reports/PurchaseReports/RequisitionList/index";
import { QuotationList } from "./shared/components/Reports/PurchaseReports/QuotationList";
import { ReturnList } from './shared/components/Reports/PurchaseReports/ReturnList/ReturnsList';
import { InvoiceList } from './shared/components/Reports/PurchaseReports/InvoiceList/InvoiceList';
import { PaymentsList } from './shared/components/Reports/PurchaseReports/PaymentsList';
import { RefreshVendorsDetailsContext } from './context/RefreshVendorDetailsContext';
import { VendorList } from './shared/components/Reports/PurchaseReports/VendorList';
const Router = createBrowserRouter([
    {
        path: "/",
        element: <SignIn />
    },
    {
        path: "landing",
        element: <Landing to="/landing/sales" replace />,
        children: [
            {
                path: "",
                element: <Sales />,
            },
            {
                path: "sales",
                children: [
                    {
                        path: "",
                        element: <Sales />,
                    },
                    {
                        path: "billing",
                        element: <Sales />
                    },
                    {
                        path: "allBills",
                        element: <AllBills />
                    }
                ]
            },
            {
                path: "purchase",
                children: [
                    {
                        path: "", 
                        element: <PurchaseRequisition />,  
                    },
                    {
                        path: "requisition",
                        element: <PurchaseRequisition />
                    },
                    {
                        path: "quotation",
                        element: <Quotations />
                    },
                    {
                        path: "order",
                        element: <PurchaseOrders />
                    },
                    {
                        path: "payments",
                        element: <Payments />
                    },
                    {
                        path: "masterList",
                        element: <MasterList />
                    }
                ]
            },
            {
                path: "inventory",
                children: [
                    {
                        path: "",  // An empty string indicates the default child route
                        element: <AddInvoice />,  // The default route for "/landing" is "/landing/sales/allBills"
                    },
                    {
                        path: 'invoice',
                        element: <AddInvoice />
                    },
                    {
                        path: 'pharmacyInventory',
                        element: <PharmacyInventory />
                    }
                ]
            },
            {
                path: "reports",
                children: [
                    {
                        path: "purchase", 
                        element: <PurchaseReports />,
                        children: [
                            {
                                path: "requisitionList",
                                element: <RequisitionList />,
                            },
                            {
                                path: "quotationList",
                                element: <QuotationList />,
                            },
                            {
                                path:"returnList",
                                element:<ReturnList />,
                            },
                            {
                                path: "paymentsList",
                                element: <PaymentsList />,
                            },
                            {
                                path:"orderList",
                                element:<OrderList />,
                            },
                            {
                                path:"invoiceList",
                                element:<InvoiceList />
                            },
                            {
                                path:"vendorList",
                                element:<VendorList />
                            },
                        ]  
                    },
                    {
                        path: "inventory",
                        element: <InventoryReport />
                    },
                    {
                        path: "sales",
                        element: <SalesReports />
                    },
                    {
                        path: "Important",
                        element: <ImportantReports />
                    },

                ]
            },
        ]
    }
]);

export default Router;