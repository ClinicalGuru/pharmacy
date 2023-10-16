import styled from "styled-components";
import Dialog from '@mui/material/Dialog';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const FormWrapper = styled.div`

`;

export const Form = styled.form `
    display: flex;
    justify-content: space-between;
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

`;

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    // '& .MuiDialogContent-root': {
    //     padding: theme.spacing(2),
    // },
    // '& .MuiDialogActions-root': {
    //     padding: theme.spacing(1),
    // },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#eef0f3",
        color: "#171A1FFF",
        boxShadow: 'none!important'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        color: "#171A1FFF"
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));