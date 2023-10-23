import styled from "styled-components";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow'

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
       // backgroundColor: theme.palette.action.hover,
        color: "#171A1FFF"
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));