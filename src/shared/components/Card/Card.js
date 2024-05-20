// CustomCard.js
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const CustomCard = ({ title, content, backgroundColor }) => {
    return (
        <Card variant="outlined" sx={{ backgroundColor, height: '65px'}}>
            <CardContent sx={{padding: '10px 10px 0px 10px'}}>
                <Typography sx={{ fontSize: 14 }}>
                    {title}
                </Typography>
                <Typography sx={{ fontSize: 14, textAlign: 'center', fontWeight: '900', marginTop: '10px' }}>
                    {content}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CustomCard;
