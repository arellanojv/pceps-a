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

const BusinessInformation = ({
  onBack,
  onNext,
  ...rest
}) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = React.useState(new Date('1994-08-18T21:11:54'));

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
       Your business information
      </Typography>
      <Box mt={3}>  
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">Business legal name</Typography>
            <Typography variant="caption" display="block" gutterBottom>
              We'll be verifying this name with the documents you provided, so please make sure it is the exact, full legal name.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth name="businesslegalname" variant="outlined" size="small"/>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">Business trade name <small>(Optional)</small></Typography>
            <Typography variant="caption" display="block" gutterBottom>
              If different from the registered entity name, it is the name for your business that your customers will recognize.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth name="businesstradelname" variant="outlined" size="small"/>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">Business registration number</Typography>
            <Typography variant="caption" display="block" gutterBottom>
              This is the company registration number that appears in your SEC Certificate of Incorporation.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth name="businessregistrationnumber" variant="outlined" size="small"/>
          </Grid>
          <Grid item xs={12}>      
            <Typography variant="h6" color="textPrimary">Date of incorporation</Typography>
            <KeyboardDatePicker
              margin="normal"
              inputVariant="outlined"
              size="small"
              format="MM/DD/yyyy"
              id="dateofincorporation"
              label="Select date"
              value={selectedDate}
              fullWidth
              onChange={handleDateChange} 
            />
           </Grid>  
            <Grid item xs={12} mt="6">
              <Typography variant="h6" color="textPrimary">Business website or social media page</Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Share a URL of your website or any social media page (business profiles are preferred) that you mainly use for your business.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth name="businessurl" placeholder="http://facebook.com/pceps" variant="outlined" size="small"/>
            </Grid>
            
            <Grid item xs={12} mt="6">
              <Typography variant="h6" color="textPrimary">Nature of your business</Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Provide details about the products or services that you sell, description of your customers and other relevant information to help us better understand your business.
              </Typography>
            </Grid>
            <Grid item xs={12}>
            <TextField 
                fullWidth 
                name="address" 
                variant="outlined" 
                size="small"
                multiline
                rows={5}
                rowsMax={10}
              />
            </Grid>

           
            <Grid item xs={12} >
              <Typography variant="h6" color="textPrimary">Business address</Typography>
            </Grid>
            <Grid item xs={12} >
              <TextField 
                fullWidth 
                name="address" 
                label="Address"
                variant="outlined" 
                size="small"
                placeholder="Unit number, Building name, Street name, etc.,"
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
            <Grid item xs={12} mt="6">
              <Typography variant="h6" color="textPrimary">Upload your SEC Certificate of Incorporation</Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Upload any other supporting documents e.g your By-Laws, Articles of Incorporation
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
      {onBack && (
        <Button
          onClick={onBack}
          size="large"
        >
          Previous
        </Button>
      )}
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

BusinessInformation.propTypes = {
    onNext: PropTypes.func,
    onBack: PropTypes.func
};

BusinessInformation.defaultProps = {
    onNext: () => {},
    onBack: () => {}
};
  
export default BusinessInformation;