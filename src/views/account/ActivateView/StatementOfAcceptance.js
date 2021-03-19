import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  FormHelperText,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Grid,
  makeStyles,
} from '@material-ui/core';
import SignatureCanvas from 'react-signature-canvas';
import { useForm, Controller } from 'react-hook-form';
import { useData } from 'src/contexts/UserActivationContext';
import firebase from 'src/lib/firebase';
import useAuth from 'src/hooks/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input } from 'src/components/Input';
import emailjs from 'emailjs-com';

const useStyles = makeStyles((theme) => ({
  root: {},
  signPadContainer: {
    border: 'solid #BCBCBC 1px',
    borderRadius: '4px',
    width: '450px',
  },
  signButton: {
    float: 'right',
  },
  signTextField: {
    display: 'block',
  },
}));

const schema = yup.object().shape({
  signDataUrl: yup
    .string()
    .required('Memorandum of Agreement has not yet been signed.'),
});

const StatementOfAcceptance = ({ className, onBack, onComplete, ...rest }) => {
  const classes = useStyles();
  const [content, setContent] = useState('');
  const [signatureDataUrl, setSignatureDataUrl] = useState('');
  const { setValues, data } = useData();
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const signPad = useRef({});
  const { user } = useAuth();

  const { register, handleSubmit, errors, reset } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const handleSignpadClear = () => {
    signPad.current.clear();
    setSignatureDataUrl('');
    reset({
      signDataUrl: '',
    });
  };

  const handlePenLift = () => {
    setSignatureDataUrl(
      signPad.current.getTrimmedCanvas().toDataURL('image/png')
    );
    console.log(signatureDataUrl);
  };

  const handlePenDrop = () => {
    reset({
      signDataUrl: '',
    });
    setSignatureDataUrl('');
  };

  const handleChange = (value) => {
    setContent(value);
  };

  const onSubmit = () => {
    console.log('Submit', data);
    // return firebase
    //   .firestore()
    //   .collection('users')
    //   .doc(user.id)
    //   .update({
    //     //Mo error if some of the data are empty
    //     firstname: data.firstname,
    //     lastname: data.lastname,
    //     dateofbirth: data.dateofbirth,
    //     address: data.address,
    //     city: data.city,
    //     state: data.state,
    //     zip: data.zip,
    //     businesslegalname: data.businesslegalname,
    //     businessregistrationnumber: data.businessregistrationnumber,
    //     dateofincorporation: data.dateofincorporation,
    //     businessurl: data.businessurl,
    //     natureofbusiness: data.natureofbusiness,
    //     businessaddress: data.businessaddress,
    //     businesscity: data.businesscity,
    //     businessstate: data.businessstate,
    //     businesszip: data.businesszip,
    //   })
    //   .then(() => {
    //     emailjs
    //       .send(
    //         'default_service',
    //         'template_lo22zvh',
    //         {
    //           userFirstName: data.firstname,
    //           userEmailTo: 'jahan.arellano@gmail.com',
    //         },
    //         'user_DuGSqe4pNtH8qXOYaWunO'
    //       )
    //       .then((res) => {
    //         if (res.status === 200) {
    //           console.log('Email Sent');
    //         }
    //       })
    //       .catch((err) =>
    //         console.error('Failed to send feedback. Error: ', err)
    //       );

    //     // sendConfirmationEmail(
    //     //   'template_lo22zvh',
    //     //   userfirstName,
    //     //   userLastName,
    //     //   'user_DuGSqe4pNtH8qXOYaWunO'
    //     // );

    //     if (onComplete) {
    //       onComplete();
    //     }
    //   })
    //   .catch((error) => {
    //     // The document probably doesn't exist.
    //     console.error('Error updating document: ', error);
    //   });
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     setSubmitting(true);

  //     // NOTE: Make API request

  //     if (onComplete) {
  //       onComplete();
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
      noValidate
    >
      <Typography variant="h5" color="textPrimary">
        Statement of acceptance
      </Typography>
      <Box mt={2}>
        <Typography
          component="span"
          variant="body2"
          className={classes.inline}
          color="textPrimary"
        >
          I, <b>{data.firstname + ' ' + data.lastname}</b>, of legal age, with
          residence at{' '}
          <b>
            {data.address +
              ', ' +
              data.city +
              ', ' +
              data.state +
              ', ' +
              data.zip}
          </b>
          , depose and state that:
        </Typography>
      </Box>
      <List>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              1.{' '}
            </Typography>
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
                  I am the authorized representative of the business,{' '}
                  <b>{data.businesslegalname}</b>, a/an corporation with an
                  office address at{' '}
                  <b>
                    {data.businessaddress +
                      ', ' +
                      data.businesscity +
                      ', ' +
                      data.businessstate +
                      ', ' +
                      data.businesszip}
                  </b>
                  ;
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>

        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              2.{' '}
            </Typography>
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
                  On behalf of the business, I have fully read, understood and
                  accept the Terms of Use and Privacy Policy and agree to be
                  bound by these agreements;
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>

        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              3.{' '}
            </Typography>
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
                  These agreements constitute the entire agreement between PCEPS
                  and the business of which I am the representative. This
                  supersedes any and all prior memoranda of agreements, whether
                  oral or in writing;
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>

        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              4.{' '}
            </Typography>
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
                  The definitive versions of these agreements are the ones found
                  on the PCEPS website; and,
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>

        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              5.{' '}
            </Typography>
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
                  PCEPS reserves the right to change these agreements from time
                  to time, with or without notice. The latest Terms of Use and
                  Privacy Policy are always posted on the PCEPS website. For any
                  changes to these agreements, our continued use of the Service
                  (as defined in these agreements) constitutes our consent to
                  the new agreements.
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
      <Grid item xs={12} mt="6">
        <Typography variant="h6" color="textPrimary">
          Sign here.
        </Typography>
      </Grid>
      <div className={classes.signPadContainer}>
        <Button
          className={classes.signButton}
          color="secondary"
          variant="contained"
          size="small"
          onClick={handleSignpadClear}
        >
          Clear
        </Button>

        <SignatureCanvas
          ref={signPad}
          canvasProps={{ width: 450, height: 150, className: 'sigCanvas' }}
          onEnd={handlePenLift}
          onBegin={handlePenDrop}
        />
      </div>

      <Input
        ref={register}
        name="signDataUrl"
        value={signatureDataUrl}
        className={classes.signTextField}
      />

      {error && (
        <Box mt={2}>
          <FormHelperText error>{FormHelperText}</FormHelperText>
        </Box>
      )}

      <Box ml={1.8}>
        {!!errors.signDataUrl && (
          <FormHelperText error>{errors?.signDataUrl?.message} </FormHelperText>
        )}
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

StatementOfAcceptance.propTypes = {
  className: PropTypes.string,
  onComplete: PropTypes.func,
  onBack: PropTypes.func,
};

StatementOfAcceptance.defaultProps = {
  onComplete: () => {},
  onBack: () => {},
};

export default StatementOfAcceptance;
