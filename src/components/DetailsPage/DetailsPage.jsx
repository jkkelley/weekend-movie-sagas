import { useSelector, useDispatch } from "react-redux";

function DetailsPage() {
  // Bring Dispatch in
  const dispatch = useDispatch();
  // Bring in our movieItem to GET data from Database
  const movieItem = useSelector((store) => store.movieItem);
  // Bring in our genre
  const genre = useSelector((store) => store.genre);
  console.log(movieItem);
  console.log(genre);
  dispatch({type: "FETCH_GENRES", payload: movieItem.id})
  return (
    <>
      <p>Hello</p>
      <h3>{movieItem.title}</h3>
      <img src={movieItem.poster}></img>
      <p>{movieItem.description}</p>
    </>
  );
}

export default DetailsPage;
