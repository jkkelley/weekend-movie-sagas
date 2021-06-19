import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

// Component import
import MovieTitle from "../MovieTitle/MovieTitle";

// Material-ui Imports
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function AddMoviePage() {
  // Area to hold our local states

  // Bring useHistory in
  const history = useHistory();
  // Custom CSS
  const classes = useStyles();

  // Function to handle route to add movie form
  const handleToHome = () => {
    console.log(`You've clicked handleToHome.`);
    history.push("/");
  };

  // Function to handle Save and POST to Database
  const handlePostAndSave = () => {
    console.log(`You clicked handlePostAndSave.`);
  };


  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Add A New Movie</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <MovieTitle />

        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>Movie Poster URL</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>Movie Description</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>Drop Menu Genres</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          {/* <Paper className={classes.paper}></Paper> */}
        </Grid>
        <Grid item xs={6} sm={3}>
          {/* <Paper className={classes.paper}></Paper> */}
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button variant="outlined" onClick={handleToHome}>
            Cancel
          </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button variant="outlined" onClick={handlePostAndSave}>
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default AddMoviePage;
