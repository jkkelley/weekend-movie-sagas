import React, { useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// Component import
import MovieDescription from "../MovieDescription/MovieDescription";
import MovieDropDownMenu from "../MovieDropDownMenu/MovieDropDownMenu";
import MoviePosterUrl from "../MoviePosterURL/MoviePosterURL";
import MovieTitle from "../MovieTitle/MovieTitle";
// Material-ui Imports
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

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
  const params = useParams();
  // Bring in Dispatch
  const dispatch = useDispatch();
  // Bring useHistory in
  const history = useHistory();
  // Custom CSS
  const classes = useStyles();

  // Function to handle route to add movie form
  const handleToHome = () => {
    console.log(`You've clicked handleToHome.`);
    history.push("/");
  };

  const formSubmission = useSelector((store) => store.formSubmission);

  // Function to handle Save and POST to Database
  const handlePostAndSave = () => {
    console.log(`You clicked handlePostAndSave.`);
    event.preventDefault();
    dispatch({ type: "POST_ADD_MOVIE", payload: formSubmission });
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Enter New Movie Below </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <MovieTitle />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MoviePosterUrl />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MovieDescription />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MovieDropDownMenu />
        </Grid>
        <Grid item xs={6} sm={3}></Grid>
        <Grid item xs={6} sm={3}></Grid>
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
