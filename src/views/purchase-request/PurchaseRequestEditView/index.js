import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  Paper,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Typography,
  colors,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Check as CheckIcon, Briefcase as BriefcaseIcon } from 'react-feather';
import Page from 'src/components/Page';
import { DataProvider } from 'src/contexts/PurchaseRequestContext';
import PurchaseRequestEditForm from './PurchaseRequestEditForm';
import Preview from './Preview';
import firebase from 'src/lib/firebase';
import { useParams } from 'react-router';

const steps = [
  {
    label: 'Purchase Request Details',
    icon: BriefcaseIcon,
  },
  {
    label: 'Preview',
    icon: BriefcaseIcon,
  },
];

const CustomStepConnector = withStyles((theme) => ({
  vertical: {
    marginLeft: 19,
    padding: 0,
  },
  line: {
    borderColor: theme.palette.divider,
  },
}))(StepConnector);

const useCustomStepIconStyles = makeStyles((theme) => ({
  root: {},
  active: {
    backgroundColor: theme.palette.secondary.main,
    boxShadow: theme.shadows[10],
    color: theme.palette.secondary.contrastText,
  },
  completed: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
}));

const CustomStepIcon = ({ active, completed, icon }) => {
  const classes = useCustomStepIconStyles();

  const Icon = steps[icon - 1].icon;

  return (
    <Avatar
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      <Icon size="20" />
    </Avatar>
  );
};

CustomStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  avatar: {
    backgroundColor: colors.green[600],
  },
  stepper: {
    backgroundColor: 'transparent',
  },
}));

const PurchaseRequestEditView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [purchaseRequest, setPurchaseRequest] = useState(null);
  let { purchaseRequestId } = useParams();

  console.log('This is the PR ID:', purchaseRequestId);

  //Firebase Call
  const db = firebase.firestore();
  var docRef = db.collection('purchase_request').doc(purchaseRequestId);

  const getPurchaseRequest = useCallback(async () => {
    docRef
      .get()
      .then((doc) => {
        if (isMountedRef.current) {
          console.log('Document data:', doc.data());
          setPurchaseRequest(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }, [isMountedRef]);

  useEffect(() => {
    getPurchaseRequest();
  }, [getPurchaseRequest]);

  if (!purchaseRequest) {
    return null;
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleComplete = () => {
    setCompleted(true);
  };

  return (
    <Page className={classes.root} title="PCEPS | Edit Purchase Request">
      <Container maxWidth="lg">
        <Box mb={3}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link
              variant="body1"
              color="inherit"
              to="/app"
              component={RouterLink}
            >
              Dashboard
            </Link>
            <Typography variant="body1" color="textPrimary">
              Purchase Request
            </Typography>
          </Breadcrumbs>
        </Box>
        {!completed ? (
          <Paper>
            <Grid container>
              <Grid item xs={12} md={3}>
                <Stepper
                  activeStep={activeStep}
                  className={classes.stepper}
                  connector={<CustomStepConnector />}
                  orientation="vertical"
                >
                  {steps.map((step) => (
                    <Step key={step.label}>
                      <StepLabel StepIconComponent={CustomStepIcon}>
                        {step.label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Grid>
              <Grid item xs={12} md={9}>
                <Box p={3}>
                  <DataProvider>
                    {activeStep === 0 && (
                      <PurchaseRequestEditForm onNext={handleNext} purchaseRequest={purchaseRequest} />
                    )}
                    {activeStep === 1 && (
                      <Preview
                        onBack={handleBack}
                        onComplete={handleComplete}
                      />
                    )}
                    {/* {activeStep === 2 && (
                      <ProjectDescription
                        onBack={handleBack}
                        onComplete={handleComplete}
                      />
                    )} */}
                  </DataProvider>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        ) : (
          <Card>
            <CardContent>
              <Box maxWidth={450} mx="auto">
                <Box display="flex" justifyContent="center">
                  <Avatar className={classes.avatar}>
                    <CheckIcon />
                  </Avatar>
                </Box>
                <Box mt={2}>
                  <Typography variant="h3" color="textPrimary" align="center">
                    You are all done!
                  </Typography>
                </Box>
                <Box mt={2}>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    align="center"
                  >
                    Thank you for posting.
                  </Typography>
                </Box>
                <Box mt={2} display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    component={RouterLink}
                    to="/app/purchase-requests/browse"
                  >
                    View your Purchase request
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </Page>
  );
};

export default PurchaseRequestEditView;
