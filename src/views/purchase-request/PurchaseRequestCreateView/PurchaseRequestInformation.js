import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Typography,
  Grid,
  TextField
} from '@material-ui/core';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { AddressStateSelect } from 'src/components/AddressStateSelect';
import FilesDropzone from 'src/components/FilesDropzone';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'


const PurchaseRequestInformation = ({
  onBack,
  onNext,
  ...rest
}) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = React.useState(new Date('1994-08-18T21:11:54'));

  const [value, setValue] = React.useState();


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      setSubmitting(true);

      // NOTE: Make API request

      if (onNext) {
        onNext();
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <form 
      onSubmit={handleSubmit}
      {...rest}
    >
      <Typography
        variant="h5"
        color="textPrimary"
      >
       Purchase Request Details
      </Typography>
      <Box mt={3}>  
        <Grid container spacing={2}>
          
          <Grid item xs={12}>
            <TextField fullWidth name="title" label="Title" variant="outlined" size="small"/>
          </Grid>

          <Grid item xs={12}>
            <CurrencyTextField
              fullWidth
              label="Budget"
              variant="outlined"
              size="small"
              value={value}
              currencySymbol="P"
              //minimumValue="0"
              outputFormat="string"
              decimalCharacter="."
              digitGroupSeparator=","
              onChange={(event, value)=> setValue(value)}
              />
          </Grid>
          <Grid item xs={12}>
          <Typography variant="h6" color="textPrimary">Bid Deadline</Typography>
            <KeyboardDatePicker
              margin="normal"
              inputVariant="outlined"
              size="small"
              format="MM/DD/yyyy"
              id="dateofbirth"
              label="Select a date"
              value={selectedDate}
              fullWidth
              onChange={handleDateChange} 
            />
           </Grid> 
            <Grid item xs={12} >
              <TextField 
                fullWidth 
                name="scopeofwork" 
                label="Scope of work"
                variant="outlined" 
                size="small"
                multiline
                rows={5}
                rowsMax={10}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField fullWidth name="city" label="City" variant="outlined" size="small"/>
            </Grid>
            <Grid item xs={12} >
              <AddressStateSelect />
            </Grid>
            <Grid item xs={12} >
              <TextField fullWidth name="zip" label="ZIP" variant="outlined" size="small"/>
            </Grid>
            <Grid item xs={12} >
              <TextField fullWidth name="contactnumber" label="Contact Number" variant="outlined" size="small"/>
            </Grid>
            <Grid item xs={12} mt="6">
              <Typography variant="h6" color="textPrimary">Attachments</Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Please upload one (1) Primary ID or two (2) Secondary IDs (only if you cannot provide a primary ID), and make sure they are legible.

                Accepted files are .jpg, .png or .pdf with a file size lower than 25 MB.
              </Typography>
            </Grid>
            <Grid item xs={12} >
              <FilesDropzone />
            </Grid>            
        </Grid>
      </Box>
      <Box 
        mt={6} 
        display="flex"
      >
        
          
  
        <Box flexGrow={1} />
          <Button
            color="secondary"
            disabled={isSubmitting}
            type="submit"
            variant="contained"
            size="large"
          >
            Next
        </Button>
      </Box>
    </form>
  );
}

PurchaseRequestInformation.propTypes = {
    onNext: PropTypes.func,
    onBack: PropTypes.func
};

PurchaseRequestInformation.defaultProps = {
    onNext: () => {},
    onBack: () => {}
};
  
export default PurchaseRequestInformation;