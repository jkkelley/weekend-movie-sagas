import { useHistory } from "react-router-dom";

function MovieItem({ movie }) {
  // Set useHistory to a variable
  const history = useHistory();
  // Handle clicking on the image
  const handleImageClick = () => {
    console.log(`handleImageClick pressed`);
  };
  return (
    <div onClick={handleImageClick}>
      <h3>{movie.title}</h3>
      <img src={movie.poster} alt={movie.title} />
    </div>
  );
}

export default MovieItem;
