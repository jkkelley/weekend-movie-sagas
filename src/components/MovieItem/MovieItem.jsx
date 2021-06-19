import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

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
    console.log(`handleImageClick pressed`);
    // Dispatch to redux our movie item
    dispatch({ type: "SET_MOVIE_ITEM", payload: movie });
    history.push("/details");
  };
  return (
    <div className={classes.root}>
      {/* <Grid container spacing={3}> */}
      {/* <Grid item xs={3}> */}
        <div onClick={handleImageClick}>
          <h3>{movie.title}</h3>
          <img src={movie.poster} alt={movie.title} height="300px"/>
        </div>
      {/* </Grid> */}
      {/* </Grid> */}
    </div>
  );
}

export default MovieItem;
