import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function MovieItem({ movie }) {
  const classes = useStyles();

  const dispatch = useDispatch();
  // Set useHistory to a variable
  const history = useHistory();
  // Handle clicking on the image
  const handleImageClick = () => {
    let data = {
      id: movie.id,
      title: movie.title,
      poster: movie.poster,
      description: movie.description,
    };
    console.log(`handleImageClick pressed`);
    // Dispatch to redux our movie item
    dispatch({ type: "SET_MOVIE_ITEM", payload: movie });
    history.push({
      pathname: `/details/${movie.id}`,
      state: {
        id: movie.id,
        title: movie.title,
        poster: movie.poster,
        description: movie.description,
      },
    });
  };
  return (
    <div className={classes.root}>
      <div onClick={handleImageClick}>
        <h3>{movie.title}</h3>
        <img src={movie.poster} alt={movie.title} height="300px" />
      </div>
    </div>
  );
}

export default MovieItem;
