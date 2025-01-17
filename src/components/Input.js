import React, { forwardRef } from "react";
import TextField from "@material-ui/core/TextField";

export const Input = forwardRef((props, ref) => {
  return (
    <TextField
      fullWidth
      size="small"
      variant="outlined"
      inputRef={ref}
      {...props}
    />
    );
});


