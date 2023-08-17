import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { SignIn } from "./shared/components/SignIn/index";

const PrivateRoutes = () => {
    let auth = {'token': false};
    return (
       auth.token ? <Outlet /> : <Navigate to="/" />
    )
}

export default PrivateRoutes;