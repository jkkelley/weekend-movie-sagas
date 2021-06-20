import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EditMovieTitle from "../EditMovieTitle/EditMovieTitle";
import MovieDescription from "../MovieDescription/MovieDescription";

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

function EditPage() {
  // Bring in Dispatch
  const dispatch = useDispatch();
  // Bring our params in.
  const params = useParams();
  console.log(params.id);
  // Custom CSS
  const classes = useStyles();
  // Bring useHistory in
  const history = useHistory();

  // Function handle Cancel
  const handleCancel = () => {
    console.log(`In handleCancel`);
    history.push(`/details/${params.id}`);
  };

  const formSubmission = useSelector((store) => store.formSubmission);

  // Function handle Update and Save
  const handleUpdateAndSave = () => {
    console.log(`In handleUpdateAndSave`);
    dispatch({
      type: "UPDATE_MOVIE_ITEM",
      payload: { data: formSubmission, id: Number(params.id) },
    });
    history.push(`/details/${Number(params.id)}`)
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Edit Page</Paper>
        </Grid>
        <Grid item xs={12}>
          <EditMovieTitle />
        </Grid>
        <Grid item xs={12}>
          <MovieDescription />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button variant="outlined" onClick={handleUpdateAndSave}>
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default EditPage;
