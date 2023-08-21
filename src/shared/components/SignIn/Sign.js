import React, { useState } from "react";
import { FormInput, Form } from "../Forms/index";
import GoogleIcon from '@mui/icons-material/Google';
import { Typography } from '@mui/material';
import {
    Container,
    SigninSection,
    Rectangle,
    Oval,
    Circle,
    WelcomeText,
    LeftSection,
    RightSection,
} from "./Sign.styles";
import {
    LOGIN_TEXT,
    WELCOME_BACK_TEXT
} from "../../constants/index";

export const SignIn = () => {
    const [message, setMessage] = useState('');

    const initialValues = {
        emailAddress: '',
        password: '',
    };

    const submit = (form) => {
        setMessage(`Thanks for signing up, ${form.firstName} ${form.lastName}! We've sent you an email to ${form.emailAddress}.`);
    };
    return (
        <Container>
            <RightSection>
                <WelcomeText>
                    <h2>{WELCOME_BACK_TEXT}</h2>
                </WelcomeText>
                <Circle />
            </RightSection>
            <LeftSection>
                <Oval />
                <SigninSection>
                    <Typography
                        variant="h5"
                        component="h4"
                        align="center"
                        sx={{ pt: "25px" }}>
                        {LOGIN_TEXT}
                    </Typography>
                    <GoogleIcon />
                    <Form submit={submit} initialValues={initialValues}>
                        <FormInput
                            label="Email Address"
                            type="email"
                            name="emailAddress" />
                        <FormInput
                            label="Password"
                            type="password"
                            name="password" />
                    </Form>
                </SigninSection>
                <Rectangle />
            </LeftSection>
            <p>{message}</p>
        </Container>
    )
}