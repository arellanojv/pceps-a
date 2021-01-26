import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  FormHelperText,
  Paper,
  Typography,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
  makeStyles
} from '@material-ui/core';
import SignatureCanvas from 'react-signature-canvas'

const useStyles = makeStyles((theme) => ({
  root: {},
  signPadContainer:{ 
    border: 'solid #BCBCBC 1px',
    borderRadius: '4px',
    width: '450px'
  },
  SignButton: {
    float: 'right',
  }
}));

const StatementOfAcceptance = ({
  className,
  onBack,
  onComplete,
  ...rest
}) => {
  const classes = useStyles();
  const [content, setContent] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const  signPad = useRef({});

  const handleSignpadClear = () => {
    signPad.current.clear()
  }
  const handleChange = (value) => {
    setContent(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);

      // NOTE: Make API request

      if (onComplete) {
        onComplete();
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
        variant="h5"
        color="textPrimary"
      >
        Statement of acceptance
      </Typography>
      <Box mt={2}>
        <Typography
          component="span"
          variant="body2"
          className={classes.inline}
          color="textPrimary"
        >
          I, Jhon Vincent Arellano, of legal age, with residence at Poblacion Oriental Riverside, Consolacion, Cebu 6001, depose and state that:
        </Typography>
      </Box>
      <List>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Typography component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary">1. </Typography>
          </ListItemAvatar>
            <ListItemText
              primary=""
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    I am the authorized representative of the business, Your business' legal name, a/an corporation with an office address at Your business address;
                  </Typography>
                </React.Fragment>
              }
            />
        </ListItem>

        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Typography component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary">2. </Typography>
          </ListItemAvatar>
          <ListItemText
            primary=""
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  On behalf of the business, I have fully read, understood and accept the Terms of Use and Privacy Policy and agree to be bound by these agreements;
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>

        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Typography component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary">3. </Typography>
          </ListItemAvatar>
          <ListItemText
            primary=""
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  These agreements constitute the entire agreement between PCEPS and the business of which I am the representative. This supersedes any and all prior memoranda of agreements, whether oral or in writing;
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>

        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Typography component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary">4. </Typography>
          </ListItemAvatar>
          <ListItemText
            primary=""
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  The definitive versions of these agreements are the ones found on the PCEPS website; and,
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
          
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Typography component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary">5. </Typography>
          </ListItemAvatar>
          <ListItemText
            primary=""
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  PCEPS reserves the right to change these agreements from time to time, with or without notice. The latest Terms of Use and Privacy Policy are always posted on the PCEPS website. For any changes to these agreements, our continued use of the Service (as defined in these agreements) constitutes our consent to the new agreements.
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
      <Grid item xs={12} mt="6">
        <Typography variant="h6" color="textPrimary">Sign here.</Typography>
      </Grid>        
      <div className={classes.signPadContainer}>
        <Button
          className={classes.SignButton}
          color="secondary"
          variant="contained"
          size="small"
          onClick={handleSignpadClear}>
          Clear
        </Button>
        <SignatureCanvas ref={signPad} canvasProps={{width: 450, height: 150, className: 'sigCanvas' }} />
      </div>

      {error && (
        <Box mt={2}>
          <FormHelperText error>
            {FormHelperText}
          </FormHelperText>
        </Box>
      )}
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
          Complete
        </Button>
      </Box>
    </form>
  );
};

StatementOfAcceptance.propTypes = {
  className: PropTypes.string,
  onComplete: PropTypes.func,
  onBack: PropTypes.func
};

StatementOfAcceptance.defaultProps = {
  onComplete: () => {},
  onBack: () => {}
};

export default StatementOfAcceptance;
