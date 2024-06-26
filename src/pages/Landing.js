import React from "react";
import { Header } from "../shared/components/Header/index";
import { Container } from "./Landing.styles";
import { Outlet } from "react-router-dom"
import Breadcrumbs from "../shared/components/Breadcrumbs";
export const Landing = () => {
    return (
        <Container>
            <Header></Header>
            <Breadcrumbs />
            <Outlet />
        </Container>
    )
}

