import React, { useState } from 'react';
import { Box, Button, Tab, Tabs, IconButton, Select, MenuItem, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DynamicTabs = () => {
 const [value, setValue] = useState(0);
 const [tabs, setTabs] = useState([]);
 const [tabContents, setTabContents] = useState([

 ]);

 const handleChange = (event, newValue) => {
    setValue(newValue);
 };

 const handleAddTab = () => {
    const newTab = `${tabs.length + 1}. Social Account`;
    setTabs([...tabs, newTab]);
    setTabContents([...tabContents, { selectValue: '', inputValue: '' }]);
    setValue(tabs.length);
    console.log(tabContents);
 };

 const handleDeleteTab = (indexToDelete) => {
    setTabs(tabs.filter((_, index) => index !== indexToDelete));
    setTabContents(tabContents.filter((_, index) => index !== indexToDelete));
    if (value === indexToDelete) {
      setValue(0);
    }
 };

 const handleSelectChange = (index, event) => {
    const newTabContents = [...tabContents];
    newTabContents[index].selectValue = event.target.value;
    setTabContents(newTabContents);
 };

 const handleInputChange = (index, event) => {
    const newTabContents = [...tabContents];
    newTabContents[index].inputValue = event.target.value;
    setTabContents(newTabContents);
 };

 return (
    <Box>
      <Button onClick={handleAddTab} variant="contained" color="primary">
        Add Social Media  Account
      </Button>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="dynamic tabs example"
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {tab}
                <IconButton
                 size="small"
                 onClick={(e) => {
                    e.stopPropagation(); // Prevent the tab from being selected
                    handleDeleteTab(index);
                 }}
                >
                 <DeleteIcon fontSize="small" />
                </IconButton>
              </div>
            }
          />
        ))}
      </Tabs>
      
      <Box sx={{ p: 3 }}>
        {tabContents[value] && (
          <div>
            <Select
              // value={tabContents[value].selectValue}
              label="type"
              value={tabContents[value].selectValue}
              onChange={(event) => handleSelectChange(value, event)}
            >
              <MenuItem value="youtube" selected={true}>Youtube</MenuItem>
              <MenuItem value="instagram">Instagram</MenuItem>
            </Select>
            <TextField
              label="URL"
              value={tabContents[value].inputValue}
              onChange={(event) => handleInputChange(value, event)}
              fullWidth
              margin="normal"
            />
          </div>
        )}
      </Box>
    </Box>
 );
};

export default DynamicTabs;