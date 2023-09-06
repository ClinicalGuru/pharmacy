import { useState } from "react";
import { FORM_LABELS } from "../../Constants/index";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

//table

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const Sales = () => {
    const [age, setAge] = useState('');
    const genderOptions = [
        {
            name: "Male",
            value: 'male'
        },
        {
            name: "Female",
            value: 'female'
        },
        {
            name: "Others",
            value: 'others'
        }
    ];
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#eee",
            color: "black",
            borderRadius: 'none'
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        }
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(even)': {
            backgroundColor: "#f9f9f9",
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const handleChange = () => {

    }

    const [inputArr, setInputArr] = useState([])
    
    const [inputData, setInputData] = useState({
        medicineName : "",
        pharmacologicalName : "",
        batchNo : "",
        hsnCode : "",
        price : "",
        quantity : "",
        mrp : "",
        total : "",
        discount : "",
        amount : "",
    });

    

    const rows = [
        
    ];

    return (
        <Box sx={{ pl: 2, pr: 2 }}>
            <Box sx={{mt:3}}>
                Sales / Billing
            </Box>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                    mt: 4,
                }}
                noValidate
                autoComplete="off"
            >
                <TextField sx={{ borderRadius: 'none' }} size="small" id="outlined-basic" label={FORM_LABELS.PATIENT_NAME} variant="outlined" />
                <Select size="small"
                    labelId="demo-simple-select-label"
                    id="outlined-basic-select"
                    value={age}
                    label={FORM_LABELS.GENDER}
                    onChange={handleChange}
                >
                    {genderOptions.map(item => <MenuItem value={item.value}>{item.name}</MenuItem>)}
                </Select>
                <TextField size="small" type="number" id="outlined-basic" label={FORM_LABELS.PHONE} variant="outlined" />
                <TextField size="small" type="email" id="outlined-basic" label={FORM_LABELS.EMAIL} variant="outlined" />
                <TextField size="small" type="text" id="outlined-basic" label={FORM_LABELS.REFERED_DOCTOR} variant="outlined" />
                <TextField size="small" type="text" id="outlined-basic" label={FORM_LABELS.OTCRX} variant="outlined" />
            </Box>
            <Box 
             component="form"
             sx={{
                 '& > :not(style)': { m: 1, width: '25ch' },
                 mt: 4, mb: 6,
                 pt:3, pb: 3,
                 backgroundColor : "#F3F4F6FF",
             }}
             noValidate
             autoComplete="off">
                <TextField sx={{backgroundColor: "white"}}  size="small" type="text" id="outlined-basic" label={FORM_LABELS.MEDICINE_NAME}  variant="outlined" />
                <TextField sx={{backgroundColor: "white"}} size="small" type="text" id="outlined-basic" label={FORM_LABELS.PHARMACOLOGICAL_NAME}  variant="outlined" />
                <TextField sx={{backgroundColor: "white"}}  size="small" type="text" id="outlined-basic" label={FORM_LABELS.BATCH_NO}  variant="outlined" />
                <TextField sx={{backgroundColor: "white"}}  size="small" type="text" id="outlined-basic" label={FORM_LABELS.HSN_CODE}  variant="outlined" />
                <TextField sx={{backgroundColor: "white"}} size="small" type="number" id="outlined-basic" label={FORM_LABELS.PRICE}  variant="outlined" />
                <TextField sx={{backgroundColor: "white"}}  size="small" type="number" id="outlined-basic" label={FORM_LABELS.QUANTITY}  variant="outlined" />
                <TextField sx={{backgroundColor: "white"}}  size="small" type="text" id="outlined-basic" label={FORM_LABELS.MRP}  variant="outlined" />
                <TextField sx={{backgroundColor: "white"}}  size="small" type="number" id="outlined-basic" label={FORM_LABELS.TOTAL}  variant="outlined" />
                <TextField sx={{backgroundColor: "white"}}  size="small" type="number" id="outlined-basic" label={FORM_LABELS.DISCOUNT}  variant="outlined" />
                <TextField sx={{backgroundColor: "white"}}  size="small" type="number" id="outlined-basic" label={FORM_LABELS.AMOUNT}  variant="outlined" />
            </Box>
            <Box 
             component="form"
             sx={{
                 '& > :not(style)': { m: 1, width: '25ch' },
                 mt: 4, mb: 6,
                 pt:3, pb: 3,
                 backgroundColor : "white",
             }}
             noValidate
             autoComplete="off">
                <TextField sx={{backgroundColor: "F3F4F6FF"}} size="small" type="text" id="outlined-basic" label={FORM_LABELS.DISCOUNT} variant="outlined" />
                <TextField sx={{backgroundColor: "F3F4F6FF"}} size="small" type="text" id="outlined-basic" label={FORM_LABELS.GST} variant="outlined" />
                <TextField sx={{backgroundColor: "F3F4F6FF"}} size="small" type="text" id="outlined-basic" label={FORM_LABELS.NET} variant="outlined" />
                <TextField sx={{backgroundColor: "F3F4F6FF"}} size="small" type="text" id="outlined-basic" label={FORM_LABELS.ROUND_OFF} variant="outlined" />
                <TextField sx={{backgroundColor: "F3F4F6FF"}} size="small" type="number" id="outlined-basic" label={FORM_LABELS.BILL_AMOUNT} variant="outlined" />
                <TextField sx={{backgroundColor: "F3F4F6FF"}} size="small" type="number" id="outlined-basic" label={FORM_LABELS.PAID_AMOUNT} variant="outlined" />
                <TextField sx={{backgroundColor: "F3F4F6FF"}} size="small" type="text" id="outlined-basic"  variant="outlined" />
            </Box>
            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>S NO</StyledTableCell>
                                <StyledTableCell align="right">Medicine Name</StyledTableCell>
                                <StyledTableCell align="right">Pharmalogical Name</StyledTableCell>
                                <StyledTableCell align="right">Batch</StyledTableCell>
                                <StyledTableCell align="right">HSN Code  </StyledTableCell>
                                <StyledTableCell>Price</StyledTableCell>
                                <StyledTableCell align="right">Quantity</StyledTableCell>
                                <StyledTableCell align="right">MRP</StyledTableCell>
                                <StyledTableCell align="right">Total</StyledTableCell>
                                <StyledTableCell align="right">Disc</StyledTableCell>
                                <StyledTableCell align="right">Amount</StyledTableCell>
                                <StyledTableCell align="right">Edit</StyledTableCell>
                                <StyledTableCell align="right">Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        
                                    </StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}