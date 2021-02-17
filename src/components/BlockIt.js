import React from "react";
import PropTypes from "prop-types";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import MuiAlert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";

const BlockIt = ({ children, ...rest }) => {
  const Alert = (props) => {
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <MuiAlert
              elevation={6}
              variant="filled"
              severity="info"
              {...props}
            />
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </div>
    );
  };

  return (
    <BlockUi
      tag="div"
      message={
        <div>
          <Alert>
            Please don't forget to confirm your e-mail address to start the
            activation process of your account. Refresh this page if you already
            verified your e-mail. Did not receive an e-mail?
            <br /> <a href="#"> Resend confirmation</a>
          </Alert>
        </div>
      }
      keepInView
      {...rest}
    >
      {children}
    </BlockUi>
  );
};

BlockIt.propTypes = {
  children: PropTypes.node,
};

export default BlockIt;
