import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import "./DetailsPage.css";
// Genres component import
import Genres from "../Genres/Genres";

// Material-ui Imports
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

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
    history.push("/");
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
      <Container maxWidth="s">
        <img src={movieItem.poster} height="300px"></img>
      </Container>
      <div className="details-page-ul-container">
        <h3>Genres</h3>
        <ul>
          {genres.map((genres, index) => (
            <Genres key={index} genres={genres} />
          ))}
        </ul>
      </div>
      <h3>Description</h3>
      <div className="movie-page-description-container">
        <p>{movieItem.description}</p>
      </div>
    </>
  );
}

export default DetailsPage;