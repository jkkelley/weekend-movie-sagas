import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
// import { useParams } from "react-router";
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

function DetailsPage(props) {
  // console.log(children)
  // const {title} = props.match.params
  // const {poster} = props.match.params
  // const { title, poster, description } = useParams();
  // console.log(title);
  // const params = useParams()
  // console.log(params)
  // Bring useHistory in
  const history = useHistory();
  // Custom CSS
  const classes = useStyles();
  // Bring Dispatch in
  const dispatch = useDispatch();
  // Bring in our movieItem to GET data from Database
  const [movieTitle, setMovieTitle] = useState("");
  const [moviePoster, setMoviePoster] = useState("");
  const [movieDescription, setMovieDescription] = useState("");
  // Bring in our genres
  const genres = useSelector((store) => store.genres);

  // const [movieIdState, setMovieIdState] = useState();
  const movieItem = useSelector((store) => store.movieItem);

  const getGenres = () => {
    dispatch({ type: "FETCH_GENRES", payload: movieItem.id });
  };

  // Function to handle back to movie list
  const handleBackToMovies = () => {
    console.log(`You've clicked handleBackToMovies.`);
    history.push("/");
  };
  // useEffect(() => {
  //   getMovie();
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("movieTitle", movieTitle);
  //   localStorage.setItem("moviePoster", moviePoster);
  //   localStorage.setItem("description", movieDescription);
  // }, [movieTitle, moviePoster, movieDescription]);
  // let { title } = useParams();
  // let { id, title, poster, description } = useParams();
  // const params = useParams();
  // console.log(this.props)
  // console.log(title);
  // console.log(poster);
  // console.log(description);
  let params = useParams();
  // console.log(params)
  // console.log(props.location.state.title);
  // console.log(params.poster)
  // console.log(props.state.title);
  // const location = useLocation();
  const getMovie = () => {
    //   dispatch({ type: "FETCH_MOVIE_ITEM_ID" });
    //   console.log(params.title);
    setMovieTitle(location.state.title);
    setMoviePoster(location.state.poster);
    setMovieDescription(location.state.description);
  };

  // useEffect(() => {
  //   getMovie();
  // }, []);

  const [poster, setPoster] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const location = useLocation();

  useEffect(() => {
    const titleState = localStorage.getItem("title" || "");
    setTitle(titleState);
    const posterState = localStorage.getItem("poster" || "");
    setPoster(posterState);
    const descriptionState = localStorage.getItem("description" || "");
    setDescription(descriptionState);
  }, []);

  useEffect(() => {
    // console.log(location.pathname); // result: '/secondpage'
    // console.log(location.search); // result: '?query=abc'
    // console.log(location.state.title);
    // console.log(location.state.poster);
    // console.log(location.state.description); // result: 'some_value'
    localStorage.setItem("title", location.state.title);
    localStorage.setItem("poster", location.state.poster);
    localStorage.setItem("description", location.state.description);
  }, ["title", "poster", "description"]);
  // localStorage.setItem("title", location.state.title);
  // localStorage.setItem("poster", location.state.poster);
  // localStorage.setItem("description", location.state.description);

  // const [poster, setPoster] = useStickyState("", "poster");
  // const [description, setDescription] = useStickyState("", "description")

  // localStorage.setItem("title", location.state.title);


  return (
    <>
      <h3>{title}</h3>
      <img src={poster} height="300px"></img>
      <p>{description}</p>
    </>
  );
}

export default DetailsPage;

{
  /* <div>
        <div className={classes.root}>
          <Button variant="outlined" onClick={handleBackToMovies}>
            Back to Movies
          </Button>
        </div>
        <h3>{title} Details</h3>
        <Container maxWidth="s">
          <img src={poster} height="300px"></img>
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
          <p>{description}</p>
        </div>
      </div> */
}
