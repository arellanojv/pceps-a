import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Typography,
  Grid,
  TextField,
  FormHelperText,
} from '@material-ui/core';
import moment from 'moment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { KeyboardDatePicker } from '@material-ui/pickers';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import * as yup from 'yup';
import { Input } from 'src/components/Input';
import { format } from 'date-fns';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePurchaseRequest } from 'src/contexts/PurchaseRequestContext';
import { CATEGORIES } from 'src/constants/categories';
import { STATEADDRESS } from 'src/constants/addressstate';
import { DropzoneArea } from 'material-ui-dropzone';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Project description is required'),
  budget: yup.number().required('Budget is required').integer('Amount in centavo is not allowed'),
  category: yup.string().required('Category is required').nullable(),
  projectdeadline: yup
    .date()
    .required('Project deadline is required')
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr)),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required').nullable(),
  zip: yup.string().required('Postal code is required'),
  projectfiles: yup
    .array()
    .required('The value for government ID cannot be blank'),
});

const PurchaseRequestEditForm = ({ onNext, purchaseRequest}) => {
  const { data, setValues } = usePurchaseRequest();
  const [isSubmitting, setSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  console.log("DATAS", purchaseRequest.budget)
  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {
      title: purchaseRequest.title || data.title,
      description: purchaseRequest.description || data.description,
      budget: purchaseRequest.budget || data.budget,
      category: purchaseRequest.category || data.category,
      projectdeadline:  purchaseRequest.projectdeadline.toDate().toDateString() || format(
        data.projectdeadline ? data.projectdeadline : new Date(),
        'MM/dd/yyyy'
      ),
      address: purchaseRequest.full_address.address || data.address,
      city: purchaseRequest.full_address.city || data.city,
      state: purchaseRequest.full_address.state || data.state,
      zip: purchaseRequest.full_address.zip || data.zip,
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const onSubmit = (data) => {
    if (onNext) {
      onNext();
      setValues(data);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            <Input
              ref={register}
              id="title"
              type="text"
              label="eg: Purchase of Cement for Concreting of Pathway to Purok 1"
              name="title"
              error={!!errors.title}
              helperText={errors?.title?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              Description
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Input
              ref={register}
              name="description"
              id="description"
              label="Describe here your project scope"
              multiline
              rows={8}
              rowsMax={10}
              error={!!errors.description}
              helperText={errors?.description?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              Budget
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Controller
              render={(props) => (
                <CurrencyTextField
                  fullWidth
                  size="small"
                  label="Amount"
                  variant="outlined"
                  value={purchaseRequest.budget || data.budget}
                  error={!!errors.budget}
                  currencySymbol="₱"
                  minimumValue={0}
                  outputFormat="string"
                  decimalCharacter="."
                  digitGroupSeparator=","
                  onChange={(_, data) => props.onChange(data)}
                />
              )}
              name="budget"
              control={control}
            />

            <Box ml={1.8}>
              {!!errors.budget && (
                <FormHelperText error>{errors?.budget?.message}</FormHelperText>
              )}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Controller
              render={(props) => (
                <Autocomplete
                  {...props}
                  options={CATEGORIES}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose a category"
                      variant="outlined"
                      size="small"
                      error={!!errors.category}
                    />
                  )}
                  onChange={(_, data) => props.onChange(data)}
                />
              )}
              name="category"
              control={control}
            />

            <Box ml={1.8}>
              {!!errors.category && (
                <FormHelperText error>
                  {errors?.category?.message}
                </FormHelperText>
              )}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              Project deadline
            </Typography>
            <KeyboardDatePicker
              inputRef={register}
              margin="normal"
              inputVariant="outlined"
              size="small"
              format="MM/DD/yyyy"
              id="projectdeadline"
              name="projectdeadline"
              label="Select date"
              value={selectedDate}
              minDate={new Date()}
              fullWidth
              onChange={handleDateChange}
              error={!!errors.projectdeadline}
              helperText={errors?.projectdeadline?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              Project address
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
                      error={!!errors.state}
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
        </Grid>

        <Box mt={2}>
          <Typography variant="h6" color="textPrimary">
            Project pictures
          </Typography>
        </Box>

        <Grid item xs={12}>
          <Controller
            name="projectfiles"
            control={control}
            render={(props) => (
              <DropzoneArea
                onChange={(e) => props.onChange(e)}
                filesLimit={10}
                initialFiles={purchaseRequest.projectfiles || data.projectfiles}
                maxFileSize={10000000}
                showFileNames={true}
                acceptedFiles={['image/jpeg', 'image/png']}
              />
            )}
          />
          <Box ml={1.8}>
            {!!errors.projectfiles && (
              <FormHelperText error>
                {errors?.projectfiles?.message}
              </FormHelperText>
            )}
          </Box>
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

PurchaseRequestEditForm.propTypes = {
  onNext: PropTypes.func,
  onBack: PropTypes.func,
};

PurchaseRequestEditForm.defaultProps = {
  onNext: () => {},
  onBack: () => {},
};

export default PurchaseRequestEditForm;
