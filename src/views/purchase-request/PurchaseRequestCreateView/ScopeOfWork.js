import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  FormHelperText,
  Paper,
  Typography,
  Grid,
  makeStyles,
} from '@material-ui/core';
import QuillEditor from 'src/components/QuillEditor';
import FilesDropzone from 'src/components/FilesDropzone';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { DropzoneArea } from 'material-ui-dropzone';

const useStyles = makeStyles((theme) => ({
  root: {},
  editorContainer: {
    marginTop: theme.spacing(3),
  },
  editor: {
    '& .ql-editor': {
      height: 400,
    },
  },
}));

const schema = yup.object().shape({
  description: yup
    .string()
    .required('Purchase request description is required'),
  projectfiles: yup
    .array()
    .required('The value for government ID cannot be blank'),
});

const ScopeOfWork = ({ className, onBack, onNext, ...rest }) => {
  const classes = useStyles();
  const [content, setContent] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { register, handleSubmit, errors, control } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const handleChange = (value) => {
    setContent(value);
  };

  const onSubmit = (data) => {
    if (onNext) {
      onNext();
      // setValues(data);
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box mt={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" color="textPrimary">
              Describe your purchase request
            </Typography>

            {/* <Controller
              name="description"
              control={control}
              render={(props) => (
                <Paper className={classes.editorContainer} variant="outlined">
                  <QuillEditor
                    // onChange={(e) => props.onChange(e)}
                    handleChange={handleChange}
                    value={content}
                    className={classes.editor}
                  />
                </Paper>
              )}
            /> */}

            <Controller
              control={control}
              name="description"
              rules={
                {
                  // validate: (value) =>
                  //   wordCounter(value) >= 10 ||
                  //   'Enter at least 10 words in the description',
                }
              }
              render={({ onChange, onBlur, value }) => (
                <Paper className={classes.editorContainer} variant="outlined">
                  <QuillEditor
                    theme="snow"
                    onChange={(description, delta, source, editor) =>
                      onChange(description)
                    }
                    value={value || ''}
                    className={classes.editor}
                  />
                </Paper>
              )}
            />
            <Box ml={1.8}>
              {!!errors.description && (
                <FormHelperText error>
                  {errors?.description?.message}
                </FormHelperText>
              )}
            </Box>
          </Grid>
          <Box mt={2}>
            <Typography variant="h5" color="textPrimary">
              Project images or documents
            </Typography>
          </Box>

          <Grid item xs={12}>
            <Controller
              name="projectfiles"
              control={control}
              render={(props) => (
                <DropzoneArea
                  onChange={(e) => props.onChange(e)}
                  filesLimit={2}
                  // initialFiles={data.govfiles}
                  maxFileSize={10000000}
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
          Complete
        </Button>
      </Box>
    </form>
  );
};

ScopeOfWork.propTypes = {
  className: PropTypes.string,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
};

ScopeOfWork.defaultProps = {
  onNext: () => {},
  onBack: () => {},
};

export default ScopeOfWork;
