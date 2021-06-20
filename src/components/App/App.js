import {
  HashRouter as Router,
  Route,
  Switch,
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
        <Switch>
          <Route
            path="/details"
            component={DetailsPage}
          />
        </Switch>
        <Route path="/" exact>
          <h1>The Movies Saga!</h1>
          <MovieList />
        </Route>
        <Route path="/addMovie">
          <AddMoviePage />
        </Route>
      </Router>
    </div>
  );
}

export default App;
