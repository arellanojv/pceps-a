import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Link,
  Tooltip,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Page from "src/components/Page";
import Logo from "src/components/Logo";
import useAuth from "src/hooks/useAuth";
import Auth0Register from "./Auth0Register";
import FirebaseAuthRegister from "./FirebaseAuthRegister";
import JWTRegister from "./JWTRegister";

const methodIcons = {
  Auth0: "/static/images/auth0.svg",
  FirebaseAuth: "/static/images/firebase.svg",
  JWT: "/static/images/jwt.svg",
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  cardContainer: {
    paddingBottom: 80,
    paddingTop: 80,
  },
  cardContent: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    minHeight: 400,
  },
  currentMethodIcon: {
    height: 40,
    "& > img": {
      width: "auto",
      maxHeight: "100%",
    },
  },
}));

const RegisterView = () => {
  const classes = useStyles();
  const { method } = useAuth();

  return (
    <Page className={classes.root} title="Register">
      <Container className={classes.cardContainer} maxWidth="sm">
        <Box mb={8} display="flex" justifyContent="center">
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Box>
        <Card>
          <CardContent className={classes.cardContent}>
            <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
              mb={1}
            >
              <div>
                <Typography color="textPrimary" gutterBottom variant="h2">
                  Register
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Select a user type first
                </Typography>
              </div>
            </Box>

            <Box flexGrow={1} mt={0}>
              {method === "Auth0" && <Auth0Register />}
              {method === "FirebaseAuth" && <FirebaseAuthRegister />}
              {method === "JWT" && <JWTRegister />}
            </Box>

            <Box my={3}>
              <Divider />
            </Box>
            <Link
              component={RouterLink}
              to="/login"
              variant="body2"
              color="textSecondary"
            >
              Having an account
            </Link>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default RegisterView;
