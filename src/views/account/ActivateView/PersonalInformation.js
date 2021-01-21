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

const PersonalInformation = ({
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
       Your personal information
      </Typography>
      <Box mt={3}>  
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" color="textPrimary">Legal Name</Typography>
          <Typography variant="caption" display="block" gutterBottom>
            This is your full legal name as it appears in any of your government-issued identification documents. Suffixes such as Sr., Jr. or III should be included together with the first name.
          </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth name="firstname" label="First Name" variant="outlined" size="small"/>
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth name="lastname" label="Last Name"  variant="outlined" size="small"/>
          </Grid>
          
          <Grid item xs={12}>      
            <Typography variant="h6" color="textPrimary">Date of birth</Typography>
            <KeyboardDatePicker
              margin="normal"
              inputVariant="outlined"
              size="small"
              format="MM/DD/yyyy"
              id="dateofbirth"
              label="Select date"
              value={selectedDate}
              fullWidth
              onChange={handleDateChange} 
            />
           </Grid> 
            <Grid item xs={12} >
              <Typography variant="h6" color="textPrimary">Home address</Typography>
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
            <Grid item xs={12} >
              <TextField fullWidth name="contactnumber" label="Contact Number" variant="outlined" size="small"/>
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

PersonalInformation.propTypes = {
    onNext: PropTypes.func,
    onBack: PropTypes.func
};

PersonalInformation.defaultProps = {
    onNext: () => {},
    onBack: () => {}
};
  
export default PersonalInformation;