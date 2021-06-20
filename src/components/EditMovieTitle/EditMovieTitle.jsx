import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Material-ui Imports
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
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

function EditMovieTitle() {
    // Bring in Dispatch
  const dispatch = useDispatch();
  // Area to hold our local states
  const [flipState, setFlipState] = useState(false);

  const [movieTitleInput, setMovieTitleInput] = useState("");
  const [movieTitleStatus, setMovieTitleStatus] = useState(false);
  // Custom CSS
  const classes = useStyles();

  const handleFlip = (event) => {
    event.preventDefault();
    setFlipState(!flipState);
  };

  const handleFlips = (event) => {
    event.preventDefault();
    setFlipState(!flipState);
    setMovieTitleStatus(!movieTitleStatus);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setMovieTitleInput(event.target.value);
    dispatch({
      type: "UPDATE_MOVIE_TITLE",
      payload: event.target.value,
    });
  };

  const formSubmission = useSelector((store) => store.formSubmission);
  console.log(formSubmission.title);

  return (
    <>
      {!flipState ? (
        !movieTitleStatus ? (
          <Paper className={classes.paper} onClick={handleFlip}>
            Add Movie Title Here
          </Paper>
        ) : (
          <p onClick={handleFlips}>Movie Title: {movieTitleInput}</p>
        )
      ) : (
        <div>
          <TextField
            id="standard-read-only-input"
            label="Movie Title"
            onChange={handleChange}
          />
          <Button color="primary" onClick={handleFlips}>
            Confirm
          </Button>
        </div>
      )}
    </>
  );
}

export default EditMovieTitle;
