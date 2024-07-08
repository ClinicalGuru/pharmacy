import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { PurchaseRequisition } from "./shared/components/Purchases";
import { Quotations } from "./shared/components/Purchases/Quotation/index";
import { PurchaseOrders } from "./shared/components/Purchases/PurchaseOrders";
import { MasterList } from "./shared/components/Purchases/MasterList";
import { AddInvoice } from "./shared/components/Invoice";
import { Payments } from "./shared/components/Purchases/PurchasePayments/index";
import { OrderList } from './shared/components/Reports/PurchaseReports/OrderList/OrderList';

import { PurchaseReports } from "./shared/components/Reports/PurchaseReports/index";
import { ImportantReports } from "./shared/components/Reports/ImportantReport/index";
import { SalesReports } from "./shared/components/Reports/SalesReports/index";
import { InventoryReport } from "./shared/components/Reports/InventoryReport/index";
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
import { VendorList } from './shared/components/Reports/PurchaseReports/VendorList';
import ErrorBoundary from "./shared/components/ErrorBoundary";
const Router = createBrowserRouter([
    {
        path: "/:id",
        element: <SignIn />
    },
    {
        path: "landing",
        element: <Landing to="/landing/sales" replace />,
        children: [
            {
                path: "",
                element:<ErrorBoundary><Sales /></ErrorBoundary> ,
            },
            {
                path: "sales",
                children: [
                    {
                        path: "",
                        element:<ErrorBoundary><Sales /></ErrorBoundary> ,
                    },
                    {
                        path: "billing",
                        element:<ErrorBoundary><Sales /></ErrorBoundary> 
                    },
                    {
                        path: "allBills",
                        element:<ErrorBoundary><AllBills /></ErrorBoundary> 
                    }
                ]
            },
            {
                path: "purchase",
                children: [
                    {
                        path: "",
                        element: <ErrorBoundary> <PurchaseRequisition /></ErrorBoundary>,
                    },
                    {
                        path: "requisition",
                        element: <ErrorBoundary> <PurchaseRequisition /></ErrorBoundary>
                    },
                    {
                        path: "quotation",
                        element:<ErrorBoundary><Quotations /></ErrorBoundary> 
                    },
                    {
                        path: "order",
                        element:<ErrorBoundary><PurchaseOrders /></ErrorBoundary> 
                    },
                    {
                        path: "payments",
                        element: <ErrorBoundary><Payments /></ErrorBoundary>
                    },
                    {
                        path: "bestPriceOrder",
                        element:<ErrorBoundary><MasterList /></ErrorBoundary> 
                    }
                ]
            },
            {
                path: "inventory",
                children: [
                    {
                        path: "",  // An empty string indicates the default child route
                        element:<ErrorBoundary><AddInvoice /></ErrorBoundary> ,  // The default route for "/landing" is "/landing/sales/allBills"
                    },
                    {
                        path: 'invoice',
                        element:<ErrorBoundary><AddInvoice /></ErrorBoundary> 
                    },
                    {
                        path: 'pharmacyInventory',
                        element:<ErrorBoundary><PharmacyInventory /></ErrorBoundary> 
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
                                element:<ErrorBoundary><RequisitionList /></ErrorBoundary> ,
                            },
                            {
                                path: "quotationList",
                                element:<ErrorBoundary><QuotationList /></ErrorBoundary> ,
                            },
                            {
                                path: "returnList",
                                element:<ErrorBoundary><ReturnList /></ErrorBoundary> ,
                            },
                            {
                                path: "paymentsList",
                                element:<ErrorBoundary> <PaymentsList /></ErrorBoundary>,
                            },
                            {
                                path: "orderList",
                                element:<ErrorBoundary> <OrderList /></ErrorBoundary>,
                            },
                            {
                                path: "invoiceList",
                                element:<ErrorBoundary><InvoiceList /></ErrorBoundary> 
                            },
                            {
                                path: "vendorList",
                                element:<ErrorBoundary><VendorList /></ErrorBoundary> 
                            },
                        ]
                    },
                    {
                        path: "inventory",
                        element: <InventoryReport />
                    },
                    {
                        path: "sales",
                        element:<ErrorBoundary><SalesReports /></ErrorBoundary> 
                    },
                    {
                        path: "Important",
                        element:<ErrorBoundary><ImportantReports /></ErrorBoundary> 
                    },

                ]
            },
        ]
    }
]);

export default Router;