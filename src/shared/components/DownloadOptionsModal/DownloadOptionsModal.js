import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { PdfFile } from '../Pdf/index';
import EmailIcon from '@mui/icons-material/Email';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { blue } from '@mui/material/colors';

export const DownloadOptionsModal = ({ onClose, selectedValue, open, rows, vendorDetails, pdfTitle }) => {
    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleEmail = () => {
        onClose(true);
    };

    const handelPdf = () => {
        onClose(true);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Choose options to download/email your purchage requisition</DialogTitle>
            <List sx={{ pt: 0 }}>
                <ListItem disableGutters >
                    <ListItemButton onClick={() => handleEmail()}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                <EmailIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Email" />
                    </ListItemButton>
                    <ListItemButton onClick={() => handelPdf()}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                <PictureAsPdfIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <PdfFile data={rows} vendorDetails={vendorDetails} pdfTitle={pdfTitle}/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Dialog>
    );
}