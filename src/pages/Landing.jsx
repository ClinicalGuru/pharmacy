import { Typography } from "@mui/material";
import React from "react";
import { Header } from "../shared/components/Header/index";
import { Sales } from "../shared/components/Sales/Sales";
import { Container } from "./Landing.styles";
export const Landing = () => {
    return (
        <Container>
            <Header></Header>
            <Sales></Sales>
        </Container>
    )
}

