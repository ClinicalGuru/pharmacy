import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { PurchaseRequisition } from "./shared/components/Purchases";
import { Quotations } from "./shared/components/Purchases/Quotation/index";
import { PurchaseOrders } from "./shared/components/Purchases/PurchaseOrders";
import { MasterList } from "./shared/components/Purchases/MasterList";
import { AddInvoice } from "./shared/components/Invoice";
import { Payments} from "./shared/components/Purchases/PurchasePayments/index"
import "./index.css";
import { PharmacyInventory } from "./shared/components/Invoice/PharmacyInventory/index";
import { AllBills } from "./shared/components/Sales/AllBills/AllBills";
import { Sales } from "./shared/components/Sales";
import { SignIn } from "./shared/components/SignIn";
const Router = createBrowserRouter([
    {
        path: "/",
        element: <SignIn />
    },
    {
        path: "landing",
        element: <Landing to="landing/sales" replace />,
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
                        path: 'addInvoice',
                        element: <AddInvoice />
                    },
                    {
                        path: 'pharmacyInventory',
                        element: <PharmacyInventory />
                    }
                ]
            }
        ]
    }
]);

export default Router;