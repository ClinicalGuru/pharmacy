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
            borderRadius:'none'
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
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

    return (
        <Box sx={{pl:2, pr:2}}>
            <Box>
                Sales / Billing
            </Box>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                    mt: 6,
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
            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                                <StyledTableCell align="right">Calories</StyledTableCell>
                                <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                                <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                                <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                    <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                    <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                    <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}