import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Form } from "../Forms/index";
import { Typography } from '@mui/material';
import {
    Container,
    SigninSection,
    Rectangle,
    Oval,
    Circle,
    LeftSection,
    RightSection,
    LogoImg
} from "./Sign.styles";
import {
    LOGIN_TEXT,
    WELCOME_BACK_TEXT
} from "../../Constants/index";
import { Loader } from "../../components/Loader";
import SigninService from '../../services/Signin.service';
import { Notification } from '../Notification/index';

export const SignIn = () => {
    const [notification, setNotification] = useState(false);
    let template = {
        title: '',
        formStyles: {
            backgroundColor: "#eee",
        },
        fields: [
            {
                title: 'user name',
                type: 'text',
                name: 'userName',
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
            }
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
        margin: "2rem 0",
        color: "white",
        fontSize: "16px"
    }
    const [open, setLoader] = useState(false);
    const navigate = useNavigate();
    const onSubmit = async (form) => {
        const { userName, password } = form;
        setLoader(true);
        console.log(form);
        try {
            let data = await SigninService.validateUser(userName);
            setLoader(false);
            if (data[0]?.pin === password) navigate('/landing');
            else setNotification(true);
        } catch (err) {
            setLoader(false);
        }
        // setLoader(true);
        // navigate('/landing');
        // setLoader(false);
    };
    const validate = (watchValues, errorMethods) => {

    };
    const alertState = () => {
        setNotification(!notification);
    };
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
                    <Form
                        template={template}
                        onSubmit={onSubmit}
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
            {/* {alert && <Notification
                type="error"
                title="Wrong user name or password"
                message="Please check your user name or password and try again." />} */}
            {notification && <Notification notificationState={notification} type="error" severity="error" message="Please check your user name or password and try again." action={alertState} />}

        </Container>
    )
}