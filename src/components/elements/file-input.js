import React from "react";
import Dropzone from "react-dropzone";
import { Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#eee",
    textAlign: "center",
    cursor: "pointer",
    color: "#333",
    padding: "10px",
    marginTop: "20px"
  },
  icon: {
    marginTop: "16px",
    color: "#888",
    fontSize: "42px"
  }
});

export const FileInput = ({control, name}) => {
  const styles = useStyles();

  return(
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({onChange, onBlur, value}) => (
        <>
          <Dropzone onDrop={onChange}>
            {({getRootProps, getInputProps}) => (
              <Paper variant="outlined" 
                className={styles.root}
                { ...getRootProps() }>
                <input {...getInputProps()} name={name} onBlur={onBlur} />
                <p> Drag 'n' Drop </p>
              </Paper>
            )}
          </Dropzone>
          <List>
            {value.map((f, index) => (
              <ListItem key={index}>
                <ListItemText primary={f.name} secondary={f.size} />
              </ListItem>
            ))}
          </List>
        </>  
      )}
    />
  )
}