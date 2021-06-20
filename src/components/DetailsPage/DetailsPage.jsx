import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./DetailsPage.css";
// Genres component import
import Genres from "../Genres/Genres";

// Material-ui Imports
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { MovieSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function DetailsPage() {
  const params = useParams();
  // console.log(params);
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
  const movies = useSelector((store) => store.movies);
  const movie = useSelector((store) => store.movie);
  // console.log(movie)
  console.log(movies[0]);
  console.log(params.id);
  const getGenres = () => {
    dispatch({ type: "FETCH_GENRES", payload: movieItem.id });
  };

  // Function to handle back to movie list
  const handleBackToMovies = () => {
    console.log(`You've clicked handleBackToMovies.`);
    history.push("/");
  };

  // Function to handle request to Edit Page
  const handleEditPage = () => {
    history.push(`/edit/${movieItem.id}`);
  };

  const [title, setTitle] = useState();
  const [poster, setPoster] = useState();
  const [description, setDescription] = useState();

  // const fetchMovieDetails = () => {
  //   if (params.id == movies[0].id) {
  //     setTitle(movies[0].title);
  //     setPoster(movies[0].poster);
  //     setDescription(movies[0].description);
  //   }
  // };
  useEffect(() => {
    dispatch({ type: "FETCH_MOVIE_ITEM", payload:  Number(params.id) });
    // fetchMovieDetails();
    // getGenres();
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Button variant="outlined" onClick={handleBackToMovies}>
          Back to Movies
        </Button>
        <Button variant="outlined" onClick={handleEditPage}>
          Edit
        </Button>
      </div>
      <h3>{movie[0]?.title} Details</h3>
      <Container maxWidth="s">
        <img src={movie[0]?.poster} height="300px"></img>
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
        <p>{movie[0]?.description}</p>
      </div>
    </>
  );
}

export default DetailsPage;
