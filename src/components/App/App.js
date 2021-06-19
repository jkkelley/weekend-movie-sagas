import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';

// Component imports
import AddMoviePage from '../AddMoviePage/AddMoviePage';
import DetailsPage from '../DetailsPage/DetailsPage';
import MovieList from '../MovieList/MovieList'

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        
        {/* Details page */}
        <Route path="/details">
          <DetailsPage />
        </Route>
        {/* Add Movie page */}
        <Route path="/addMovie">
          <AddMoviePage />
        </Route>
      </Router>
    </div>
  );
}


export default App;
