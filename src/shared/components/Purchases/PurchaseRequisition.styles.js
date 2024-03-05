import styled from "styled-components";
import Dialog from '@mui/material/Dialog';

export const FormWrapper = styled.div`

`;


export const ErrorMessage = styled.p`
font-size: 10px;
color: #db2727;
margin: 0 0 0 5px;
`;

export const InvalidInput = styled.input`
    border: 1px solid red;
    
`;

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    // '& .MuiDialogContent-root': {
    //     padding: theme.spacing(2),
    // },
    // '& .MuiDialogActions-root': {
    //     padding: theme.spacing(1),
    // },
}));
