import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Typography,
  Grid,
  FormHelperText,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { AddressStateSelect } from "src/components/AddressStateSelect";
import FilesDropzone from "src/components/FilesDropzone";
import { useDropzone } from "react-dropzone";
// import Dropzone, { IFileWithMeta, StatusValue } from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "src/components/Input";
import { useData } from "src/contexts/UserActivationContext";

// interface IUploads {
//   files: IFileWithMeta[];
// }

const schema = yup.object().shape({
  // firstname: yup
  //   .string()
  //   .matches(/^([^0-9]*)$/, "First name should not contain numbers")
  //   .required("First name is required"),
  // lastname: yup
  //   .string()
  //   .matches(/^([^0-9]*)$/, "Last name should not contain numbers")
  //   .required("Last name is required"),
  // dateofbirth: yup
  //   .date()
  //   .required("Date of birth is required")
  //   .nullable()
  //   .transform((curr, orig) => (orig === "" ? null : curr)),
  // address: yup.string().required("Address is required"),
  // city: yup.string().required("City is required"),
  // state: yup.string().required("State is required"),
  // zip: yup.string().required("Postal code is required"),
  // file: yup.mixed().required("The value for government ID cannot be blank"),
  // .test("file_size", "The file is too large", (value) => {
  //   return value && value[0].size <= 10000000;
  // })
});

const newDate = new Date();

const PersonalInformation = ({ onBack, onNext, ...rest }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { setValues, data } = useData();
  const [files, setFiles] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    newDate.setFullYear(newDate.getFullYear() - 18)
  );
  const [state, setState] = React.useState("");

  // const handleControlledDropzonChangeStatus = (
  //   status: StatusValue,
  //   allFiles: IFileWithMeta[],
  //   setFiles: Function
  // ) => {
  //   setTimeout(() => {
  //     if (["done", "removed"].includes(status)) {
  //       setFiles([...allFiles]);
  //     }
  //   }, 0);
  // };

  const { register, handleSubmit, errors, control, setValue } = useForm({
    defaultValues: {
      firstname: data.firstname,
      lastname: data.lastname,
      dateofbirth: data.dateofbirth,
      address: data.address,
      city: data.city,
      state: data.state,
      zip: data.zip,
      file: data.file,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleDrop = useCallback((acceptedFiles) => {
    // setValue("file", setFiles((prevFiles) => [...prevFiles].concat(acceptedFiles)))
    setValue("file", acceptedFiles);
  }, []);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragAccept,
  } = useDropzone({
    onDrop: handleDrop,
  });

  React.useEffect(() => {
    register({ name: "file" });
  }, []);

  React.useEffect(() => {
    setSelectedFile(acceptedFiles[0]);
  }, [acceptedFiles]);

  // const files = watch("files");

  // useEffect(() => {
  //   console.log("files are", files);
  // }, [files]);

  console.log("ERRORS", errors);
  console.log("Data", data);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleGovidChange = (event) => {
    const govid = event.target.files[0];
  };

  const onSubmit = (data) => {
    console.log("Submit", data);
    if (onNext) {
      onNext();
      setValues(data);
    }
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
  return (
    // <form onSubmit={handleSubmit} {...rest}>
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
              as={<AddressStateSelect />}
              name="state"
              control={control}
              error={!!errors.state}
              helperText={errors?.state?.message}
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
              label="ZIP"
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
              25 MB.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div
              isDragAccept={isDragAccept}
              {...getRootProps({ onClick: (e) => e.preventDefault() })}
            >
              <p>Drag 'n' drop file here, or click to select file</p>

              <input
                type="file"
                name="file"
                // onChange={e => changeFile(e)}
                {...getInputProps()}
              />
            </div>

            {/* <FilesDropzone /> */}
            {/* <Input ref={register} type="file" name="govimage" /> */}
            {/* <Controller
              control={control}
              name="files"
              render={({ onChange }) => (
                <Dropzone
                  onChangeStatus={(file, status, allFiles) => {
                    handleControlledDropzonChangeStatus(
                      status,
                      allFiles,
                      onChange
                    );
                  }}
                />
              )}
            />

            <Typography variant="h6" color="textPrimary">
              Files are:
            </Typography>
            <ol>{files && files.map((file) => <li>{file.meta.name}</li>)}</ol> */}
            {/* <Controller
              name="govfiles"
              control={control}
              render={({ onChange }) => <FilesDropzone onChange={onChange} />}
            /> */}

            {/* <Controller
              name="govfiles"
              control={control}
              defaultValue=""
              render={({ onChange }) => <Dropzone onChange={onChange} />}
            /> */}

            {/* <input type="file" name="govid" onchange={handleGovidChange} ref={register} /> */}

            {/* <Controller
              name="govfiles"
              control={control}
              defaultValue=""
              render={({ onChange }) => <Dropzone onChange={onChange} />}
            /> */}

            {/* <label htmlFor="contained-button-file">
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label> */}
            <Box ml={1.8}>
              {!!errors.file && (
                <FormHelperText error>{errors?.file?.message}</FormHelperText>
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
