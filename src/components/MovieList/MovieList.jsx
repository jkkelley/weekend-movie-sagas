import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import "./MovieList.css";
import MovieItem from "../MovieItem/MovieItem";

// Material-ui Imports
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function MovieList() {
  // Bring useHistory in
  const history = useHistory();
  // Custom CSS
  const classes = useStyles();
  // Bring Dispatch in
  const dispatch = useDispatch();
  // Bring in our Movies list
  const movies = useSelector((store) => store.movies);

  // Function to handle route to add movie form
  const handleAddToMovies = () => {
    console.log(`You've clicked handleAddToMovies.`);
    // Clear our Temp storage out.
    dispatch({ type: "CLEAR_GENRES" });
    dispatch({ type: "CLEAR_MOVIE_ITEM" });
    history.push("/addMovie");
  };

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
  }, []);

  return (
    <main>
      <h1>MovieList</h1>
      <div className={classes.root}>
        <Button variant="outlined" onClick={handleAddToMovies}>
          Add a Movie?
        </Button>
      </div>
      <section className="movies">
        {movies.map((movie, index) => (
          <MovieItem key={index} movie={movie} />
        ))}
      </section>
    </main>
  );
}

export default MovieList;
