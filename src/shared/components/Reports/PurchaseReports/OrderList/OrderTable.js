import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { PdfFile } from '../../../Pdf';

export const OrderTable = ({ data, vendorData }) => {
    const Row = ({ row }) => {
        const [open, setOpen] = useState(false);

        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row?.vendorName}
                    </TableCell>
                    <TableCell align="right">{row?.orderCreatedDate}</TableCell>
                    <TableCell align="right">{row?.medicines?.status}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Medicines List
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Pharmacological Name</TableCell>
                                            <TableCell>Brand Name</TableCell>
                                            <TableCell align="right">Dose</TableCell>
                                            <TableCell align="right">Form</TableCell>
                                            <TableCell align="right">Quantity</TableCell>
                                            <TableCell align="right">MRP</TableCell>
                                            <TableCell align="right">PTR</TableCell>
                                            <TableCell align="right">PTS</TableCell>
                                            <TableCell align="right">GST</TableCell>
                                            <TableCell align="right">Discount %</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row?.medicines?.map((medicine) => (
                                            <TableRow key={medicine?.pharmacologicalName}>
                                                <TableCell>{medicine?.pharmacologicalName}</TableCell>
                                                <TableCell>{medicine?.brandName}</TableCell>
                                                <TableCell>{medicine?.dose}</TableCell>
                                                <TableCell align="right">{medicine?.form}</TableCell>
                                                <TableCell align="right">{medicine?.quantity}</TableCell>
                                                <TableCell>{medicine?.mrp}</TableCell>
                                                <TableCell align="right">{medicine?.ptr}</TableCell>
                                                <TableCell align="right">{medicine?.pts}</TableCell>
                                                <TableCell>{medicine?.gst}</TableCell>
                                                <TableCell align="right">{medicine?.discount}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Vendor Name</TableCell>
                        <TableCell align="right">Created Date</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* {data?.map((row) => (
                        <Row key={row?.quotationId} row={row} />
                    ))} */}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
