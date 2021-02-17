import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
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
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import {
  User as UserIcon,
  Star as StarIcon,
  Briefcase as BriefcaseIcon,
  File as FileIcon,
} from "react-feather";
import Page from "src/components/Page";
import PersonalInformation from "./PersonalInformation";
import BusinessInformation from "./BusinessInformation";
import StatementOfAcceptance from "./StatementOfAcceptance";
import BlockIt from "src/components/BlockIt";
import useAuth from 'src/hooks/useAuth';

const steps = [
  {
    label: "Personal information",
    icon: UserIcon,
  },
  {
    label: "Business information",
    icon: BriefcaseIcon,
  },
  {
    label: "Statement of Acceptance",
    icon: FileIcon,
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
    minHeight: "100%",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  avatar: {
    backgroundColor: colors.red[600],
  },
  stepper: {
    backgroundColor: "transparent",
  },
}));

const ActivateView = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { user } = useAuth();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleComplete = () => {
    setCompleted(true);
  };

  console.log("User Data Within the Active account component", user.blocking);

  return (
    <BlockIt blocking={!user.blocking}>
      <Page className={classes.root} title="PCEPS | Account Activation">
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
                Activate
              </Typography>
            </Breadcrumbs>
            <Typography variant="h3" color="textPrimary">
              Activate your PCEPS account
            </Typography>
            <Typography variant="body2">
              Before you can create purchase requests on PCEPS, we need to learn
              more information about you and your business.
            </Typography>
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
                    {activeStep === 0 && (
                      <PersonalInformation onNext={handleNext} />
                    )}
                    {activeStep === 1 && (
                      <BusinessInformation
                        onBack={handleBack}
                        onNext={handleNext}
                      />
                    )}
                    {activeStep === 2 && (
                      <StatementOfAcceptance
                        onBack={handleBack}
                        onComplete={handleComplete}
                      />
                    )}
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
                      <StarIcon />
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
                      Donec ut augue sed nisi ullamcorper posuere sit amet eu
                      mauris. Ut eget mauris scelerisque.
                    </Typography>
                  </Box>
                  <Box mt={2} display="flex" justifyContent="center">
                    <Button
                      variant="contained"
                      color="secondary"
                      component={RouterLink}
                      to="/app/projects/1"
                    >
                      View your project
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}
        </Container>
      </Page>
    </BlockIt>
  );
};

export default ActivateView;
