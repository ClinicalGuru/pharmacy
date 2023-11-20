import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Form } from "../Forms/index";
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
import { Loader } from "../../components/Loader";

export const SignIn = () => {
    let template = {
        title: '',
        formStyles: {
            backgroundColor: "#eee",
        },
        fields: [
            {
                title: 'Email',
                type: 'email',
                name: 'email',
                validationProps: {
                    required: "Email is required"
                }
            },
            {
                title: 'Password',
                type: 'password',
                name: 'password',
                validationProps: {
                    required: "Password is required"
                }
            },
            // {
            //     title: 'Select',
            //     type: 'select',
            //     name: 'select',
            //     options:[
            //         {
            //             value:"one",
            //             option: "one"
            //         },
            //         {
            //             value:"three",
            //             option: "two"
            //         }
            //     ]
            // }
        ],
        btns: [
            {
                btn_text: "Log In",
                styles: {
                    width: "100%",
                    color: "#FFFFFF",
                    fontSize: "16px",
                    padding: "0.5rem",
                    margin: "2rem 0"
                }
            }
        ]
    }
    const btn_styles = {
        // width: "100 %",
        // padding: "0.75rem",
        margin: "2rem 0",
        color: "white",
        fontSize: "16px"
    }
    const [open, setLoader] = useState(false);
    const navigate = useNavigate();
    const onSubmit = (form) => {
        setLoader(true);
        console.log(form);
        navigate('/landing');
        setLoader(false);
    };
    const validate = (watchValues, errorMethods) => {

    }
    return (
        <Container>
            <RightSection>
                <LogoImg src={require('../../../assets/img/logo.png')} />
                <Typography
                    variant="h4"
                    color="#6F7787FF"
                    align="center"
                    paddingTop={7}>
                    {WELCOME_BACK_TEXT}
                </Typography >
                <Typography
                    fontSize={15}
                    align="center"
                    color="#6F7787FF">There are many variations of passages of Lorem Ipsum available,
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
                    <Form
                        template={template}
                        onSubmit={onSubmit}
                        // watchFields={['firstname', 'link']}
                        validate={validate}
                        showSubmitButton={true}
                        btn_styles={btn_styles}
                    />
                    <Typography
                        variant="h7"
                        component="p"
                        align="center"
                        mb={2}>
                        Been here before? Log in
                    </Typography>
                </SigninSection>
                <Rectangle />
            </LeftSection>
            <Loader open={open} />
        </Container>
    )
}