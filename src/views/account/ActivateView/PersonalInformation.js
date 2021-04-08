import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Typography,
  Grid,
  FormHelperText,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useForm, Controller } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input } from 'src/components/Input';
import { useData } from 'src/contexts/UserActivationContext';
import { STATEADDRESS } from 'src/constants/addressstate';
import { format } from 'date-fns';
import { DropzoneArea } from 'material-ui-dropzone';

const schema = yup.object().shape({
  firstname: yup
    .string()
    .matches(/^([^0-9]*)$/, 'First name should not contain numbers')
    .required('First name is required'),
  lastname: yup
    .string()
    .matches(/^([^0-9]*)$/, 'Last name should not contain numbers')
    .required('Last name is required'),
  dateofbirth: yup
    .date()
    .required('Date of birth is required')
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr)),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required').nullable(),
  zip: yup.string().required('Postal code is required'),
  govfiles: yup.array().required('The value for government ID cannot be blank'),
});

const newDate = new Date();

const PersonalInformation = ({ onBack, onNext, ...rest }) => {
  const { setValues, data } = useData();
  const [isSubmitting, setSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    newDate.setFullYear(newDate.getFullYear() - 18)
  );

  const {
    register,
    handleSubmit,
    errors,
    control,
  } = useForm({
    defaultValues: {
      firstname: data.firstname,
      lastname: data.lastname,
      dateofbirth: format(
        data.dateofbirth ? data.dateofbirth : new Date(),
        'MM/dd/yyyy'
      ),
      address: data.address,
      city: data.city,
      state: data.state,
      zip: data.zip,
      govfiles: data.govfiles,
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  console.log('ERRORS', errors);
  console.log("On submit",data)

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const onSubmit = (data) => {
    console.log("On submit 2.0 ",data)
    if (onNext) {
      onNext();
      setValues(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography variant="h5" color="textPrimary">
        Your personal information
      </Typography>
      <Box mt={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              Legal Name
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              This is your full legal name as it appears in any of your
              government-issued identification documents. Suffixes such as Sr.,
              Jr. or III should be included together with the first name.
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Input
              ref={register}
              id="firstname"
              type="text"
              label="First Name"
              name="firstname"
              error={!!errors.firstname}
              helperText={errors?.firstname?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              ref={register}
              id="lastname"
              type="text"
              label="Last Name"
              name="lastname"
              error={!!errors.lastname}
              helperText={errors?.lastname?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              Date of birth
            </Typography>
            <KeyboardDatePicker
              inputRef={register}
              margin="normal"
              inputVariant="outlined"
              size="small"
              format="MM/DD/yyyy"
              id="dateofbirth"
              name="dateofbirth"
              label="Select date"
              value={selectedDate}
              maxDate={new Date()}
              fullWidth
              onChange={handleDateChange}
              error={!!errors.dateofbirth}
              helperText={errors?.dateofbirth?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              Home address
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Input
              ref={register}
              name="address"
              id="address"
              label="Address"
              placeholder="Unit number, Building name, Street name, etc.,"
              multiline
              rows={5}
              rowsMax={10}
              error={!!errors.address}
              helperText={errors?.address?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              ref={register}
              name="city"
              label="City"
              error={!!errors.city}
              helperText={errors?.city?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              render={(props) => (
                <Autocomplete
                  {...props}
                  options={STATEADDRESS}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose a state"
                      variant="outlined"
                      size="small"
                    />
                  )}
                  onChange={(_, data) => props.onChange(data)}
                />
              )}
              name="state"
              control={control}
            />

            <Box ml={1.8}>
              {!!errors.state && (
                <FormHelperText error>{errors?.state?.message}</FormHelperText>
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Input
              ref={register}
              name="zip"
              label="Zip"
              error={!!errors.zip}
              helperText={errors?.zip?.message}
            />
          </Grid>
          <Grid item xs={12} mt="6">
            <Typography variant="h6" color="textPrimary">
              Valid identification documents
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Please upload one (1) Primary ID or two (2) Secondary IDs (only if
              you cannot provide a primary ID), and make sure they are legible.
              Accepted files are .jpg, .png or .pdf with a file size lower than
              10 MB.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="govfiles"
              control={control}
              render={(props) => (
                <DropzoneArea onChange={(e) => props.onChange(e)}
                filesLimit={2}
                initialFiles={data.govfiles}
                maxFileSize={10000000}
                />
              )}
            />
            <Box ml={1.8}>
              {!!errors.govfiles && (
                <FormHelperText error>
                  {errors?.govfiles?.message}
                </FormHelperText>
              )}
            </Box>
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
        <DevTool control={control} />
      </Box>
    </form>
  );
};

PersonalInformation.propTypes = {
  onNext: PropTypes.func,
  onBack: PropTypes.func,
};

PersonalInformation.defaultProps = {
  onNext: () => {},
  onBack: () => {},
};

export default PersonalInformation;
