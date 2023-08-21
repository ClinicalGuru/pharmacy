import React, { useState } from "react";
import { FormInput, Form } from "../Forms/index";
import GoogleIcon from '@mui/icons-material/Google';
import { Typography } from '@mui/material';
import { Container, SigninForm, Rectangle, Oval, Circle, WelcomeText } from "./Sign.styles";
import { LOGIN_TEXT, WELCOME_BACK_TEXT } from "../../Constants";

export const SignIn = () => {
    const [message, setMessage] = useState('');

    const initialValues = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
    };

    const submit = (form) => {
        setMessage(`Thanks for signing up, ${form.firstName} ${form.lastName}! We've sent you an email to ${form.emailAddress}.`);
    };
    return (
        <Container className="App">
            <div>
                <WelcomeText>
                    <h2>{WELCOME_BACK_TEXT}</h2>
                    <p></p>
                </WelcomeText>
                <Circle />
            </div>

            <div>
                <Oval />

                <SigninForm>
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
                            label="First Name"
                            name="firstName" />
                        <FormInput
                            label="Last Name"
                            name="lastName" />
                        <FormInput
                            label="Email Address"
                            type="email"
                            name="emailAddress" />
                        <FormInput
                            label="Password"
                            type="password"
                            name="password" />
                    </Form>
                </SigninForm>
                <Rectangle />
            </div>
            <p>{message}</p>

            {/* <h2>Log In</h2>
            <Form
                submit={(form) => {
                    alert(`Logged in as ${form.username}!`);
                }}
                initialValues={{
                    username: '',
                    password: ''
                }}>
                <FormInput
                    label="Username"
                    name="username" />
                <FormInput
                    label="Password"
                    name="password" />
            </Form> */}
        </Container>
    )
}