import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
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




// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };



export const CollapsibleTable = ({ data, vendorData }) => {
  const Row = (props) => {
    const { row } = props;
    const [open, setOpen] = useState(false);
  
    return (
      <Fragment>
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
          <TableCell align="right">{row?.date}</TableCell>
          <TableCell align="right">{row?.status}</TableCell>
          <TableCell align="right">{row?.medicines?.length}</TableCell>
          <TableCell>
            <Typography sx={{ marginLeft: '30px', display: 'flex', alignItems: 'center' }}>
              <a href='#'>{row && <PdfFile vendorDetails={vendorData} data={row?.medicines} pdfTitle="PURCHASE REQUISITION" />}</a> &nbsp;&nbsp;&nbsp;
              {/* <span><a href='#' onClick={() => openDefaultMailClient(item)}>Email</a></span> */}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row?.medicines?.map((medicine) => (
                      <TableRow key={medicine?.pharmacologicalName}>
                        <TableCell component="th" scope="row">
                          {medicine?.pharmacologicalName}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {medicine?.brandName}
                        </TableCell>
                        <TableCell align="right">{medicine?.dose}</TableCell>
                        <TableCell align="right">{medicine?.form}</TableCell>
                        <TableCell align="right">{medicine?.quantity}</TableCell>
  
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </Fragment>
    );
  }
  console.log({ data }, 'data');

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Vendor Name</TableCell>
            <TableCell align="right">Created Date</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">No of Medicines</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <Row key={row?.requisitionId} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
