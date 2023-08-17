import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoutes from "./privateRoutes";
import { SignIn } from "./shared/components/SignIn";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route element />
                </Route>
                <Route element={<SignIn />} path="/"></Route>
            </Routes>
        </Router>
    )
}
export default App;