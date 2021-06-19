import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Material-ui Imports
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";


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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
}));

function MovieDropDownMenu() {
  // Bring Dispatch in
  const dispatch = useDispatch();
  const genresList = useSelector((store) => store.genresList);

  // Area to hold our local states
  const [flipState, setFlipState] = useState(false);
  // Local State to hold Select Value state
  const [selectState, setSelectState] = useState("");
  // Local id state
  const [selectedId, setSelectedId] = useState();
  // Genre status State
  const [movieGenreStatus, setMovieGenreStatus] = useState(false);
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
    setMovieGenreStatus(!movieGenreStatus);
  };



  // Handle Change function
  const handleChanges = (event) => {
    event.preventDefault();
    console.log(selectedId);
  };

  const handleChange = (event) => {
    setSelectState(event.target.value);
  };

  const addInput = (select) => {
    console.log(select);
    setSelectedId(select);
    dispatch({
      type: "UPDATE_MOVIE_GENRE",
      payload: select,
    });
  };

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_GENRES" });
  }, []);

  return (
    <>
      {!flipState ? (
        !movieGenreStatus ? (
          <Paper className={classes.paper} onClick={handleFlip}>
            Add Genre
          </Paper>
        ) : (
          <p onClick={handleFlips}>Movie Genre: {selectState}</p>
        )
      ) : (
        <div>
          <FormControl
            className={classes.formControl}
            required
            onChange={handleChanges}
          >
            <InputLabel id="demo-simple-select-label">Genre</InputLabel>

            <Select value={selectState} onChange={handleChange}>
              {genresList.map((genre, index) => (
                <MenuItem
                  onClick={() => addInput(genre.id)}
                  key={genre.id}
                  value={genre.name}
                >
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button color="primary" onClick={handleFlips}>
            Confirm
          </Button>
        </div>
      )}
    </>
  );
}

export default MovieDropDownMenu;
