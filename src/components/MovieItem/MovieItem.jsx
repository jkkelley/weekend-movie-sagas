import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

function MovieItem({ movie }) {
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
    <div onClick={handleImageClick}>
      <h3>{movie.title}</h3>
      <img src={movie.poster} alt={movie.title} />
    </div>
  );
}

export default MovieItem;
