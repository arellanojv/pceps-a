import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Markdown from 'react-markdown/with-html';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  FormHelperText,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { usePurchaseRequest } from 'src/contexts/PurchaseRequestContext';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import firebase from 'src/lib/firebase';
import useAuth from 'src/hooks/useAuth';
import { format } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  root: {},
  markdown: {
    fontFamily: theme.typography.fontFamily,
    '& p': {
      marginBottom: theme.spacing(2),
    },
  },
}));

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'PHP',
});

const schema = yup.object().shape({
  projectfiles: yup
    .array()
    .required('The value for government ID cannot be blank'),
});

const Preview = ({ className, onBack, onComplete, ...rest }) => {
  const classes = useStyles();
  const [isSubmitting, setSubmitting] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('Complete');
  const [uploadedImages, setUploadedImages] = useState([]);
  const { setValues, data } = usePurchaseRequest();
  const { user } = useAuth();

  const db = firebase.firestore();
  const storage = firebase.storage();

  const { register, handleSubmit, errors, control } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setButtonLabel('PLease wait...');
    // https://stackoverflow.com/questions/58425363/how-to-call-a-function-after-map-loop-executed
    var projectFiles = data.projectfiles.map(
      (file) =>
        new Promise((resolve, reject) => {
          try {
            const storageRef = storage.ref();
            var uploadTask = storageRef
              .child('project_images/' + file.name)
              .put(file);
            uploadTask.on(
              'state_changed',
              (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setButtonLabel('Upload is ' + Math.floor(progress) + '% done');
                switch (snapshot.state) {
                  case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                  case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                }
              },
              (error) => {
                // Handle unsuccessful uploads
              },
              () => {
                setButtonLabel('PLease wait...');
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                  resolve(downloadURL);
                });
              }
            );
          } catch (error) {
            console.log(error);
            resolve(null); // so one failure doesn't stop the whole process
          }
        })
    );

    Promise.all(projectFiles).then((projectFilesArray) => {
      return db
        .collection('purchase_request')
        .doc()
        .set({
          user: user.id,
          title: data.title,
          description: data.description,
          budget: data.budget,
          category: data.category,
          projectdeadline: data.projectdeadline,
          full_address: {
            address: data.address,
            city: data.city,
            state: data.state,
            zip: data.zip,
          },
          projectfiles: projectFilesArray,
          created: firebase.firestore.Timestamp.now(),
          modified: firebase.firestore.Timestamp.now(),
          status: 1 //active
        })
        .then(() => {
          if (onComplete) {
            onComplete();
          }
        })
        .catch((error) => {
          console.error('Error updating document: ', error);
        });
        setSubmitting(false);
        setButtonLabel('Complete');
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className={clsx(classes.root, className)}
      {...rest}
      noValidate
    >
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Project Name
              </Typography>
              <Typography variant="h6" color="textPrimary">
                {data.title}
              </Typography>
            </Grid>
          </Grid>
          <Box mt={3}>
            <Typography variant="subtitle2" color="textSecondary">
              Description
            </Typography>
            <Markdown source={data.description} className={classes.markdown} />
          </Box>
          <Box mt={3}>
            <Typography variant="subtitle2" color="textSecondary">
              Budget
            </Typography>
            <Typography variant="h6" color="textPrimary">
              {formatter.format(data.budget)}
            </Typography>
          </Box>
          <Box mt={3}>
            <Typography variant="subtitle2" color="textSecondary">
              Category
            </Typography>
            <Typography variant="h6" color="textPrimary">
              {data.category}
            </Typography>
          </Box>
          <Box mt={3}>
            <Typography variant="subtitle2" color="textSecondary">
              Project Deadline
            </Typography>
            <Typography variant="h6" color="textPrimary">
              {format(
                data.projectdeadline ? data.projectdeadline : new Date(),
                'MM/dd/yyyy'
              )}
            </Typography>
          </Box>
          <Box mt={3}>
            <Typography variant="subtitle2" color="textSecondary">
              Project Address
            </Typography>
            <Typography variant="h6" color="textPrimary">
              {data.address +
                ', ' +
                data.city +
                ', ' +
                data.state +
                ', ' +
                data.zip}
            </Typography>
          </Box>
          <Box mt={3}>
            <Typography variant="subtitle2" color="textSecondary">
              Project images
            </Typography>
          </Box>

          <Grid item xs={12}>
            <List>
              {data.projectfiles &&
                data.projectfiles.map((file) => (
                  <ListItem key={file.lastModified}>
                    <ListItemText primary={file.name} secondary={null} />
                  </ListItem>
                ))}
            </List>
          </Grid>
        </CardContent>
      </Card>
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
          {buttonLabel}
        </Button>
      </Box>
    </form>
  );
};

Preview.propTypes = {
  className: PropTypes.string,
  onComplete: PropTypes.func,
  onBack: PropTypes.func,
};

Preview.defaultProps = {
  onComplete: () => {},
  onBack: () => {},
};

export default Preview;
