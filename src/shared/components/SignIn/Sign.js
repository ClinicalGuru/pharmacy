import React, { useState } from "react";
import { FormInput, Form } from "../Forms/index";
import DeleteIcon from '@mui/icons-material/Delete';
import GoogleIcon from '@mui/icons-material/Google';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import {
    Container,
    SigninSection,
    Rectangle,
    Oval,
    Circle,
    WelcomeText,
    LeftSection,
    RightSection,
    IconSection,
    OrText,
    GoogleSignWrapper,
    LogoImg,
    InputWrapper
} from "./Sign.styles";
import {
    LOGIN_TEXT,
    WELCOME_BACK_TEXT
} from "../../Constants/index";

export const SignIn = () => {
    const [message, setMessage] = useState('');

    const initialValues = {
        emailAddress: '',
        password: '',
    };

    const submit = (form) => {
        console.log(form)
        // setMessage(`Thanks for signing up, ${form.firstName} ${form.lastName}! We've sent you an email to ${form.emailAddress}.`);
    };
    return (
        <Container>
            <RightSection>
                <LogoImg src={require('../../../assets/img/logo.png')} />
                <WelcomeText>
                    {WELCOME_BACK_TEXT}
                </WelcomeText>
                <Typography
                    fontSize={15}
                    ml={20}
                    mr={30}>There are many variations of passages of Lorem Ipsum available,
                    but the majority have suffered alteration in some form, by injected humour,
                    or randomised words which don't look even slightly believable. </Typography>
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
                    <GoogleSignWrapper>
                        <Button 
                        variant="outlined" 
                        startIcon={<GoogleIcon 
                        sx={{
                            color: "#C71610FF"
                        }}
                        />}>
                            Log In with google
                        </Button>
                    </GoogleSignWrapper>
                    <OrText><span>Or</span></OrText>
                    {/* <IconSection>
                        <GoogleIcon fontSize="small" align="center" />
                    </IconSection> */}
                    <Form submit={submit} initialValues={initialValues}>
                        <InputWrapper>
                            <FormInput
                                label="Email"
                                type="email"
                                name="emailAddress"
                                placeholder="Email" />
                            <FormInput
                                label="Password"
                                type="password"
                                name="password"
                                placeholder="Enter your password" />
                        </InputWrapper>
                    </Form>
                    <Typography
                        variant="h7"
                        component="p"
                        align="center"
                        mb={10}>
                        Been here before? Log in
                    </Typography>
                </SigninSection>
                <Rectangle />
            </LeftSection>
            <p>{message}</p>
        </Container>
    )
}