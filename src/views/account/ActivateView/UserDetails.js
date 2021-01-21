import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  makeStyles
} from '@material-ui/core';
import { AddressStateSelect } from 'src/components/AddressStateSelect';

const typeOptions = [
  {
    value: 'freelancer',
    title: 'I\'m a freelancer',
    description: 'I\'m looking for teamates to join in a personal project'
  },
  {
    value: 'projectOwner',
    title: 'I’m a project owner',
    description: 'I\'m looking for freelancer or contractors to take care of my project'
  },
  {
    value: 'affiliate',
    title: 'I want to join affiliate',
    description: 'I\'m looking for freelancer or contractors to take care of my project'
  }
];

const useStyles = makeStyles((theme) => ({
  root: {},
  typeOption: {
    alignItems: 'flex-start',
    display: 'flex',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2)
  },
  stepButton: {
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  }
}));

const UserDetails = ({
  className,
  onBack,
  onNext,
  ...rest
}) => {
  const classes = useStyles();
  const [type, setType] = useState(typeOptions[1].value);
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (newType) => {
    setType(newType);
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
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Typography
          variant="h3"
          color="textPrimary"
        >
          You will fill this up once
        </Typography>
        <Box mt={2}>
          <Typography
            variant="subtitle1"
            color="textSecondary"
          >
            We need these information to verify your business and for billing purposes.
          </Typography>
        </Box>
        
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth name="firstname" label="First Name" variant="outlined" size="small"/>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth name="lastname" label="Last Name"  variant="outlined" size="small"/>
            </Grid>
            <Grid item xs={12} >
              <TextField fullWidth name="email" label="Email" variant="outlined" size="small" />
            </Grid>
            <Grid item xs={12} >
              <TextField fullWidth name="companyname" label="Company Name" variant="outlined" size="small"/>
            </Grid>
            <Grid item xs={12} >
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel>Industry</InputLabel>
                  <Select
                    onChange={handleChange}
                    label="Industry"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Accounting">Accounting</MenuItem>
                    <MenuItem value="Airlines/Aviation">Airlines/Aviation</MenuItem>
                    <MenuItem value="Alternative Medicine">Alternative Medicine</MenuItem>
                  </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} >
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel>Company Size</InputLabel>
                  <Select
                    onChange={handleChange}
                    label="Company Size"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="0-1 employee">0-1 employee</MenuItem>
                    <MenuItem value="2-10 employees">2-10 employees</MenuItem>
                    <MenuItem value="11-50 employees">11-50 employees</MenuItem>
                  </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} >
              <TextField 
                fullWidth 
                name="companyaddress" 
                label="Company Address" 
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
};

UserDetails.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func,
  onBack: PropTypes.func
};

UserDetails.defaultProps = {
  onNext: () => {},
  onBack: () => {}
};

export default UserDetails;
