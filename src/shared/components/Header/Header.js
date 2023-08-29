import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export const  Header =() =>{
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Home" value="home" />
            <Tab label="Overview" value="overView" />
            <Tab label="Product Manager" value="productManager" />
            <Tab label="Sales" value="sales"/>
            <Tab label="Store setting" value="storeSetting"/>
            <Tab label="Support" value="support"/>
          </TabList>
        </Box>
        <TabPanel value="home">Home</TabPanel>
        <TabPanel value="overView">Overview</TabPanel>
        <TabPanel value="productManager">Product Manager</TabPanel>
        <TabPanel value="sales">Sales</TabPanel>
        <TabPanel value="storeSetting">Store setting</TabPanel>
        <TabPanel value="support">Support</TabPanel>
      </TabContext>
    </Box>
  );
}