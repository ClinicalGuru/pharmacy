import React from "react";
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

export const SignIn = () => {

    let template = {
        title: '',
        submitButttonText:'Log in',
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
        ]
    }
    const onSubmit = (form) => {
        console.log(form)
        // setMessage(`Thanks for signing up, ${form.firstName} ${form.lastName}! We've sent you an email to ${form.emailAddress}.`);
    };
    const validate = (watchValues, errorMethods) => {
        // console.log(watchValues)
        // let { errors, setError, clearError } = errorMethods;
        // //Firstname validation
        // if (watchValues['firstname' === 'Admin']) {
        //     if (!errors['firstname']) {
        //         setError('firstname', {
        //             type: 'mnual',
        //             message: 'You cannot use this first name'
        //         })
        //     }
        // }
    }
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
                    <Form
                        template={template}
                        onSubmit={onSubmit}
                        watchFields={['firstname', 'link']}
                        validate={validate}
                    />
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
        </Container>
    )
}