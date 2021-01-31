import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Typography, Grid, TextField } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { AddressStateSelect } from "src/components/AddressStateSelect";
import { JobCategory } from "src/components/JobCategory";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

const PurchaseRequestForm = ({ onBack, onNext, ...rest }) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date("1994-08-18T21:11:54")
  );
  const [value, setValue] = useState();

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
    <form onSubmit={handleSubmit} {...rest}>
      <Typography variant="h5" color="textPrimary">
        Purchase request information
      </Typography>
      <Box mt={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              Title
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="title"
              label="Title"
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              Budget
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <CurrencyTextField
              fullWidth
              size="small"
              label="Amount"
              variant="outlined"
              value={value}
              currencySymbol="₱"
              //minimumValue="0"
              outputFormat="string"
              decimalCharacter="."
              digitGroupSeparator=","
              onChange={(event, value) => setValue(value)}
            />
          </Grid>

          <Grid item xs={12}>
            <JobCategory />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              Bid Deadline
            </Typography>
            <KeyboardDatePicker
              margin="normal"
              inputVariant="outlined"
              size="small"
              format="MM/DD/yyyy"
              id="biddeadline"
              label="Select date"
              value={selectedDate}
              fullWidth
              onChange={handleDateChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              Address
            </Typography>
          </Grid>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="city"
              label="City"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <AddressStateSelect />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="zip"
              label="ZIP"
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>
      </Box>
      <Box mt={6} display="flex">
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

PurchaseRequestForm.propTypes = {
  onNext: PropTypes.func,
  onBack: PropTypes.func,
};

PurchaseRequestForm.defaultProps = {
  onNext: () => {},
  onBack: () => {},
};

export default PurchaseRequestForm;
