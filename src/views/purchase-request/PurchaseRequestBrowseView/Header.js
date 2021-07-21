import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  SvgIcon,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { PlusCircle as PlusCircleIcon } from 'react-feather';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
  root: {},
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1),
    },
  },
}));

const Header = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      justify="space-between"
      spacing={3}
      {...rest}
    >
      <Grid item>
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
            Purchase Requests
          </Typography>
        </Breadcrumbs>
        <Typography variant="h3" color="textPrimary">
          All Purchase Requests
        </Typography>
      </Grid>
      <Grid item>
        <Link
          variant="body1"
          color="inherit"
          to="/app/purchase-request/create"
          component={RouterLink}
        >
          <Button
            color="secondary"
            variant="contained"
            className={classes.action}
            startIcon={
              <SvgIcon fontSize="small">
                <PlusCircleIcon />
              </SvgIcon>
            }
          >
            New Purchase Request
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
