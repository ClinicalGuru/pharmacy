import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoutes from "./privateRoutes";
import { SignIn } from "./shared/components/SignIn";
import { Landing } from "./pages";
import { PurchaseRequisition } from "./shared/components/Purchases";
import { Quotations } from "./shared/components/Purchases/Quotation/index";
import { PurchaseOrders } from "./shared/components/Purchases/PurchaseOrders";
import { MasterList } from "./shared/components/Purchases/MasterList";
import { AllBills } from "./shared/components/Sales/AllBills/index";
import { AddInvoice } from "./shared/components/Invoice";
import "./index.css";
import { PharmacyInventory } from "./shared/components/Invoice/PharmacyInventory/index";
const App = () => {
    return (
        <Router>
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route element />
                </Route>
                <Route element={<SignIn />} path="/"></Route>
                <Route element={<Landing/>} path="/landing"></Route>
                <Route element={<AllBills/>} path="/sales/allBills"></Route>
                <Route element={<PurchaseRequisition/>} path="/purchase/requisition"></Route>
                <Route element={<Quotations/>} path="/purchase/quotation"></Route>
                <Route element={<PurchaseOrders/>} path="/purchase/order"></Route>
                <Route element={<MasterList/>} path="/purchase/masterList"></Route>
                <Route element={<AddInvoice/>} path="inventory/addInvoice"></Route>
                <Route element={<PharmacyInventory/>} path="inventory/pharmacyInventory"></Route>
            </Routes>
        </Router>
    )
}
export default App;