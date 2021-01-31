import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  Button,
  FormHelperText,
  Paper,
  Typography,
  Grid,
  makeStyles,
} from "@material-ui/core";
import QuillEditor from "src/components/QuillEditor";
import FilesDropzone from "src/components/FilesDropzone";

const useStyles = makeStyles((theme) => ({
  root: {},
  editorContainer: {
    marginTop: theme.spacing(3),
  },
  editor: {
    "& .ql-editor": {
      height: 400,
    },
  },
}));

const ScopeOfWork = ({ className, onBack, onNext, ...rest }) => {
  const classes = useStyles();
  const [content, setContent] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (value) => {
    setContent(value);
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
      <Typography variant="h5" color="textPrimary">
        Describe your purchase request
      </Typography>

      <Paper className={classes.editorContainer} variant="outlined">
        <QuillEditor
          handleChange={handleChange}
          value={content}
          className={classes.editor}
        />
      </Paper>

      <Box mt={2}>
        <Typography variant="h5" color="textPrimary">
          Project images or documents
        </Typography>
        <Grid item xs={12}>
          <FilesDropzone />
        </Grid>
      </Box>

      {error && (
        <Box mt={2}>
          <FormHelperText error>{FormHelperText}</FormHelperText>
        </Box>
      )}
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
