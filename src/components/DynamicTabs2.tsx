import React, { useState } from 'react';
import { Box, Button, Tab, Tabs, IconButton, Select, MenuItem, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import * as Yup from 'yup';

const tabSchema = Yup.object().shape({
 inputValue: Yup.string().min(1).max(10)
    .required('Input field is required'),
});

const DynamicTabs2 = () => {
 const [value, setValue] = useState(0);
 const [tabs, setTabs] = useState([]); // Initialize with no tabs
 const [tabContents, setTabContents] = useState([]); // Initialize with no tab content
 const [errors, setErrors] = useState({});

 const handleChange = (event, newValue) => {
    setValue(newValue);
 };

 const handleAddTab = () => {
    const newTab = `${tabs.length + 1}. SOCIAL MEDIA ACCOUNT`;
    setTabs([...tabs, newTab]);
    setTabContents([...tabContents, { selectValue: "youtube", inputValue: '' }]); // Add default content for new tab
    setValue(tabs.length);

    console.log(tabContents);
 };

 const handleDeleteTab = (indexToDelete) => {

    const newTabItems = tabs.filter((_, index) => index !== indexToDelete);
    setTabs(newTabItems);
    setTabContents(tabContents.filter((_, index) => index !== indexToDelete));
    
    const updatedTabs = newTabItems.map((_, i) => `${i + 1}. SOCIAL MEDIA ACCOUNT`);
    setTabs(updatedTabs);

    if (value >= updatedTabs.length) {
        setValue(updatedTabs.length - 1);
    }
 };

 const handleSelectChange = (index, event) => {
    const newTabContents = [...tabContents];
    newTabContents[index].selectValue = event.target.value;
    setTabContents(newTabContents);
 };

 const handleInputChange = async (index, event) => {
    const newTabContents = [...tabContents];
    newTabContents[index].inputValue = event.target.value;
    setTabContents(newTabContents);

    try {
      await tabSchema.validateAt('inputValue', { inputValue: event.target.value });
      setErrors({ ...errors, [index]: null });
    } catch (error) {
      setErrors({ ...errors, [index]: error.message });
    }
 };

 return (
    <Box>
      <Button onClick={handleAddTab} variant="contained" color="primary">
        Add social media account
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
     
      {tabs.map((_, index) => (
        <Box key={index} sx={{ display: index === value ? 'block' : 'none' }}>
          <Select
            value={tabContents[index].selectValue}
            onChange={(event) => handleSelectChange(index, event)}
          >
           
            <MenuItem value={"youtube"}>Youtube</MenuItem>
            <MenuItem value={"instagram"}>Instagram</MenuItem>
          </Select>
          <TextField
            label="Input"
            value={tabContents[index].inputValue}
            onChange={(event) => handleInputChange(index, event)}
            fullWidth
            margin="normal"
            error={!!errors[index]}
            helperText={errors[index]}
          />
        </Box>
      ))}
    </Box>
 );
};

export default DynamicTabs2;