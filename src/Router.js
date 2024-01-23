import { createBrowserRouter } from "react-router-dom";
import { Landing } from "./pages";
import { PurchaseRequisition } from "./shared/components/Purchases";
import { Quotations } from "./shared/components/Purchases/Quotation/index";
import { PurchaseOrders } from "./shared/components/Purchases/PurchaseOrders";
import { MasterList } from "./shared/components/Purchases/MasterList";
import { AddInvoice } from "./shared/components/Invoice";
import { Payments} from "./shared/components/Purchases/PurchasePayments/index";

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

/*
<Route element={<SignIn />} path="/"></Route>
                <Route element={<Landing />} path="/landing"></Route>
                <Route element={<AllBills />} path="sales/allBills"></Route>
                <Route element={<PurchaseRequisition />} path="/purchase/requisition"></Route>
                <Route element={<Quotations />} path="/purchase/quotation"></Route>
                <Route element={<PurchaseOrders />} path="/purchase/order"></Route>
                <Route element={<MasterList />} path="/purchase/masterList"></Route>
                <Route element={<AddInvoice />} path="inventory/addInvoice"></Route>
                <Route element={<PharmacyInventory />} path="inventory/pharmacyInventory"></Route>
                <Route element={<Sales />} path="sales/billing"></Route>
*/