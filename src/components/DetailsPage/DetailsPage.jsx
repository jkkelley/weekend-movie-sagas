import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

// Genres component import
import Genres from "../Genres/Genres";

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

function DetailsPage() {
  // Bring useHistory in
  const history = useHistory();
  // Custom CSS
  const classes = useStyles();
  // Bring Dispatch in
  const dispatch = useDispatch();
  // Bring in our movieItem to GET data from Database
  const movieItem = useSelector((store) => store.movieItem);
  // Bring in our genres
  const genres = useSelector((store) => store.genres);

  const getGenres = () => {
    dispatch({ type: "FETCH_GENRES", payload: movieItem.id });
  };

  // Function to handle back to movie list
  const handleBackToMovies = () => {
    console.log(`You've clicked handleBackToMovies.`);
    history.push("/")
  };
  useEffect(() => {
    getGenres();
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Button variant="outlined" onClick={handleBackToMovies}>
          Back to Movies
        </Button>
      </div>
      <h3>{movieItem.title} Details</h3>
      <img src={movieItem.poster}></img>
      <div>
        <h3>Genres</h3>
        <ul>
          {genres.map((genres, index) => (
            <Genres key={index} genres={genres} />
          ))}
        </ul>
      </div>
      <p>{movieItem.description}</p>
    </>
  );
}

export default DetailsPage;
