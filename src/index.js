import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App.js";
import { createStore, combineReducers, applyMiddleware } from "redux";
// Provider allows us to use redux within our react app
import { Provider } from "react-redux";
import logger from "redux-logger";
// Import saga middleware
import createSagaMiddleware from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery("FETCH_MOVIES", fetchAllMovies);
  yield takeEvery("FETCH_GENRES", fetchAllGenres);
  yield takeEvery("FETCH_ALL_GENRES", fetchGenresList);
  yield takeEvery("POST_ADD_MOVIE", postNewMovie);
  yield takeEvery("FETCH_MOVIE_ITEM", fetchMovie);
  yield takeEvery("UPDATE_MOVIE_ITEM", updateMovie);
}

function* updateMovie(action) {
  console.log(action.payload.id);
  console.log(action.payload.data.description)
  console.log(action.payload.data.title)
  let datas = {
    id: action.payload.id,
    title: action.payload.data.title,
    description: action.payload.data.description
  }
  try {
    yield axios.put(`/api/movie/${action.payload.id}`, datas)
  } catch(error) {
    console.log(`Sorry there was an Movie UPDATE error ${error}`)
  }
}

function* postNewMovie(action) {
  console.log(action.payload);
  let data = {
    title: action.payload.title,
    poster: action.payload.poster,
    description: action.payload.description,
    genre_id: action.payload.genre_id,
  };
  console.log(data);
  try {
    yield axios.post("/api/movie", data);
    yield put({ type: "CLEAR_MOVIE_SUBMISSION" });
  } catch (error) {
    console.log(`There was a PORT error with postMovie... ${error}`);
  }
}

function* fetchMovie(action) {
  const id = action.payload.id;
  try {
    const oneMovie = yield axios.get(`/api/movie/${action.payload}`, {
      params: {
        id: action.payload,
      },
    });
    console.log("get movie item", oneMovie.data);
    yield put({ type: "SET_MOVIE_ITEM", payload: oneMovie.data });
  } catch (error) {
    console.log(`There was a GET ${error}`);
  }
}

function* fetchAllMovies() {
  // get all movies from the DB
  try {
    const movies = yield axios.get("/api/movie");
    console.log("get all:", movies.data);
    yield put({ type: "SET_MOVIES", payload: movies.data });
  } catch {
    console.log("get all error");
  }
}

function* fetchAllGenres(action) {
  const data = action.payload;
  // get all genres from DB
  try {
    const response = yield axios.get(`/api/genre/${data}`);
    console.log("get all:", response.data);
    yield put({ type: "SET_GENRES", payload: response.data });
  } catch (error) {
    console.log(`We have a GET error... ${error}`);
  }
}

function* fetchGenresList(action) {
  try {
    const response = yield axios.get(`/api/genre/`);
    console.log(`GET data`, response.data);
    yield put({ type: "SET_GENRES_LIST", payload: response.data });
  } catch (error) {
    console.log(`There was an GET genresList... ${error}`);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return action.payload;
    default:
      return state;
  }
};

// Used to store details movie item
const movie = (state = [], action) => {
  switch (action.type) {
    case "SET_MOVIE_ITEM":
      return action.payload;
    default:
      return state;
  }
};

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case "SET_GENRES":
      return action.payload;
    case "FETCH_GENRES":
      return state;
    case "CLEAR_GENRES":
      return [];
    default:
      return state;
  }
};

// Store to hold all Genres in our table
const genresList = (state = [], action) => {
  switch (action.type) {
    case "SET_GENRES_LIST":
      return action.payload;
    case "FETCH_GENRES_LIST":
      return state;
    default:
      return state;
  }
};

// Used to store the movie item
const movieItem = (state = {}, action) => {
  switch (action.type) {
    case "SET_MOVIE_ITEM":
      return action.payload;
    case "CLEAR_MOVIE_ITEM":
      return {};
    case "FETCH_MOVIE_ITEM_ID":
      return state;
    default:
      return state;
  }
};

const formSubmission = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_MOVIE_TITLE":
      return { ...state, title: action.payload };
    case "UPDATE_MOVIE_POSTER_URL":
      return { ...state, poster: action.payload };
    case "UPDATE_MOVIE_DESCRIPTION":
      return { ...state, description: action.payload };
    case "UPDATE_MOVIE_GENRE":
      return { ...state, genre_id: action.payload };
    case "CLEAR_MOVIE_SUBMISSION":
      return {};
    default:
      return state;
  }
};
// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    movieItem,
    genresList,
    formSubmission,
    movie,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
