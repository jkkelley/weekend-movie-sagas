import {
  HashRouter as Router,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import "./App.css";

// Component imports
import AddMoviePage from "../AddMoviePage/AddMoviePage";
import DetailsPage from "../DetailsPage/DetailsPage";
import MovieList from "../MovieList/MovieList";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Switch> */}

        <Switch>
          <Route
            // path="/details/:id/:poster/:title/:description"
            path="/details"

            component={DetailsPage}
            // children={<DetailsPage />}
            // /:title/:poster/:description
          />
        </Switch>
        <Route path="/" exact>
          <h1>The Movies Saga!</h1>
          <MovieList />
        </Route>
        {/* Details page */}

        {/* Add Movie page */}
        <Route path="/addMovie">
          <AddMoviePage />
        </Route>
        {/* </Switch> */}
      </Router>
    </div>
  );
}

export default App;
