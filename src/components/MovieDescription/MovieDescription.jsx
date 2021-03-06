import React, { useState } from "react";
import { useDispatch } from "react-redux";

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

function MovieDescription() {
  // Bring in Dispatch
  const dispatch = useDispatch();
  // Area to hold our local states
  const [flipState, setFlipState] = useState(false);

  const [movieDescriptionInput, setMovieDescriptionInput] = useState("");
  const [movieDescriptionStatus, setMovieDescriptionStatus] = useState(false);
  // Custom CSS
  const classes = useStyles();

  const handleFlip = (event) => {
    event.preventDefault();
    setFlipState(!flipState);
  };

  const handleFlips = (event) => {
    event.preventDefault();
    setFlipState(!flipState);
    setMovieDescriptionStatus(!movieDescriptionStatus);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setMovieDescriptionInput(event.target.value);
    dispatch({
      type: "UPDATE_MOVIE_DESCRIPTION",
      payload: event.target.value,
    });
  };
  return (
    <>
      {!flipState ? (
        !movieDescriptionStatus ? (
          <Paper className={classes.paper} onClick={handleFlip}>
            Add Movie Description Here
          </Paper>
        ) : (
          <p onClick={handleFlips}>
            Movie Description: {movieDescriptionInput}
          </p>
        )
      ) : (
        <div>
          <TextField
            id="standard-read-only-input"
            label="Movie Description"
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

export default MovieDescription;
