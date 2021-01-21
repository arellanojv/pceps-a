import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Typography
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const PostingGuidlines = ({
  onBack,
  onNext,
  ...rest
}) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

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
        variant="h3"
        color="textPrimary"
      >
        <center>Posting Guidelines</center>
      </Typography>
      <Box mt={6}>  
          <Typography variant="subtitle1" gutterBottom>
            - Philippine business documents (DTI, SEC & BIR) may be required.
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            - Post job openings/employment opportunities only.
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
           - Job details must be posted in the appropriate categories.
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
          - To sponsor our site, click here
          </Typography>
      </Box>
      <Box 
        mt={6} 
        display="flex"
      >
        <RouterLink to="/ ">
          <Button
            onClick={onBack}
            size="large"
          >
            I do not agree to these guidelines
          </Button>
        </RouterLink>
        
        <Box flexGrow={1} />
          <Button
            color="secondary"
            disabled={isSubmitting}
            type="submit"
            variant="contained"
            size="large"
          >
            I agree to these guidelines
        </Button>
      </Box>
    </form>
  );
}

PostingGuidlines.propTypes = {
    onNext: PropTypes.func,
    onBack: PropTypes.func
};

PostingGuidlines.defaultProps = {
    onNext: () => {},
    onBack: () => {}
};
  
export default PostingGuidlines;