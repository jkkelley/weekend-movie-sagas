import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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

function MoviePosterUrl() {
  // Bring in Dispatch
  const dispatch = useDispatch();
  // Area to hold our local states
  const [flipState, setFlipState] = useState(false);

  const [moviePosterUrlInput, setMoviePosterUrlInput] = useState("");
  const [moviePosterUrlStatus, setMoviePosterUrlStatus] = useState(false);
  // Bring useHistory in
  const history = useHistory();
  // Custom CSS
  const classes = useStyles();

  const handleFlip = (event) => {
    event.preventDefault();
    setFlipState(!flipState);
  };

  const handleFlips = (event) => {
    event.preventDefault();
    setFlipState(!flipState);
    setMoviePosterUrlStatus(!moviePosterUrlStatus);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setMoviePosterUrlInput(event.target.value);
    dispatch({
      type: "UPDATE_MOVIE_POSTER_URL",
      payload: event.target.value,
    });
  };
  return (
    <>
      {!flipState ? (
        !moviePosterUrlStatus ? (
          <Paper className={classes.paper} onClick={handleFlip}>
            Add Movie Poster URL Here
          </Paper>
        ) : (
          <p onClick={handleFlips}>Movie URL: {moviePosterUrlInput}</p>
        )
      ) : (
        <div>
          <TextField
            id="standard-read-only-input"
            label="Movie Poster URL"
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

export default MoviePosterUrl;
