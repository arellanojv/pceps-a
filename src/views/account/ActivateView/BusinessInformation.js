import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Typography,
  Grid,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { AddressStateSelect } from "src/components/AddressStateSelect";
import FilesDropzone from "src/components/FilesDropzone";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "src/components/Input";
import { useData } from "src/contexts/UserActivationContext";

const schema = yup.object().shape({
  // businesslegalname: yup.string().required("Business legal name is required"),
  // businessregistrationnumber: yup
  //   .string()
  //   .required("Business registration number is required"),
  // dateofincorporation: yup
  //   .date()
  //   .required("Date of birth is required")
  //   .nullable()
  //   .transform((curr, orig) => (orig === "" ? null : curr)),
  // businessurl: yup.string().required("Business URL is required"),
  // natureofbusiness: yup
  //   .string()
  //   .required("Nature of your business is required"),
  // businessaddress: yup.string().required("Business address is required"),
  // businesscity: yup.string().required("City is required"),
  // businessstate: yup.string().required("State is required"),
  // businesszip: yup.string().required("Postal code is required"),
});

const newDate = new Date();

const BusinessInformation = ({ onBack, onNext, ...rest }) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const { setValues, data } = useData();
  const [selectedDate, setSelectedDate] = useState(
    newDate.setFullYear(newDate.getFullYear() - 18)
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     setSubmitting(true);

  //     // NOTE: Make API request

  //     if (onNext) {
  //       onNext();
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setError(err.message);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const onSubmit = (data) => {
    console.log("Submit", data);
    if (onNext) {
      onNext();
    }
    setValues(data);
  };

  const { register, handleSubmit, errors, control, setValue } = useForm({
    defaultValues: {
      businesslegalname: data.businesslegalname,
      businessregistrationnumber: data.businessregistrationnumber,
      dateofincorporation: data.dateofincorporation,
      businessurl: data.businessurl,
      natureofbusiness: data.natureofbusiness,
      businessaddress: data.businessaddress,
      businesscity: data.businesscity,
      businessstate: data.businessstate,
      businesszip: data.businesszip,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate {...rest}>
      <Typography variant="h5" color="textPrimary">
        Your business information
      </Typography>
      <Box mt={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              Business legal name
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              We'll be verifying this name with the documents you provided, so
              please make sure it is the exact, full legal name.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Input
              ref={register}
              id="businesslegalname"
              type="text"
              name="businesslegalname"
              error={!!errors.businesslegalname}
              helperText={errors?.businesslegalname?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              Business trade name <small>(Optional)</small>
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              If different from the registered entity name, it is the name for
              your business that your customers will recognize.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="businesstradelname"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              Business registration number
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              This is the company registration number that appears in your SEC
              Certificate of Incorporation.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Input
              ref={register}
              name="businessregistrationnumber"
              type="text"
              error={!!errors.businessregistrationnumber}
              helperText={errors?.businessregistrationnumber?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              Date of incorporation
            </Typography>
            <KeyboardDatePicker
              inputRef={register}
              margin="normal"
              inputVariant="outlined"
              size="small"
              format="MM/DD/yyyy"
              id="dateofbirth"
              name="dateofincorporation"
              label="Select date"
              value={selectedDate}
              fullWidth
              onChange={handleDateChange}
              error={!!errors.dateofincorporation}
              helperText={errors?.dateofincorporation?.message}
            />
          </Grid>
          <Grid item xs={12} mt="6">
            <Typography variant="h6" color="textPrimary">
              Business website or social media page
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Share a URL of your website or any social media page (business
              profiles are preferred) that you mainly use for your business.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Input
              ref={register}
              name="businessurl"
              placeholder="http://facebook.com/pceps"
              error={!!errors.businessurl}
              helperText={errors?.businessurl?.message}
            />
          </Grid>

          <Grid item xs={12} mt="6">
            <Typography variant="h6" color="textPrimary">
              Nature of your business
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Provide details about the products or services that you sell,
              description of your customers and other relevant information to
              help us better understand your business.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Input
              ref={register}
              name="natureofbusiness"
              multiline
              rows={5}
              rowsMax={10}
              error={!!errors.natureofbusiness}
              helperText={errors?.natureofbusiness?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              Business address
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Input
              ref={register}
              name="businessaddress"
              placeholder="Unit number, Building name, Street name, etc.,"
              multiline
              rows={5}
              rowsMax={10}
              error={!!errors.businessaddress}
              helperText={errors?.businessaddress?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              ref={register}
              name="businesscity"
              label="City"
              error={!!errors.businesscity}
              helperText={errors?.businesscity?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              as={<AddressStateSelect />}
              name="businessstate"
              control={control}
              error={!!errors.businessstate}
            />
            <Box ml={1.8}>
              {!!errors.state && (
                <FormHelperText error>{errors?.businessstate?.message}</FormHelperText>
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Input
              ref={register}
              name="businesszip"
              label="ZIP"
              error={!!errors.businesszip}
              helperText={errors?.businesszip?.message}
            />
          </Grid>
          <Grid item xs={12} mt="6">
            <Typography variant="h6" color="textPrimary">
              Upload your SEC Certificate of Incorporation
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Upload any other supporting documents e.g your By-Laws, Articles
              of Incorporation
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FilesDropzone />
          </Grid>
        </Grid>
      </Box>
      <Box mt={6} display="flex">
        {onBack && (
          <Button onClick={onBack} size="large">
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

BusinessInformation.propTypes = {
  onNext: PropTypes.func,
  onBack: PropTypes.func,
};

BusinessInformation.defaultProps = {
  onNext: () => {},
  onBack: () => {},
};

export default BusinessInformation;
