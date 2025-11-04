import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { MoviesList } from "../movies-list/movies-list";

import "./main-view.scss";

import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies"; // movies slice
import { setUser } from "../../redux/reducers/user";     // user slice

export const MainView = () => {
  /*
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser? storedUser : null);
  */

  const dispatch = useDispatch();

  // Redux state
  const movies = useSelector((state) => state.movies.movies.list || []);
  const user = useSelector((state) => state.user.user); 
  const token = user ? user.token : "";

  // Local state for UI-specific things
  const [selectedMovie, setSelectedMovie] = useState(null); 

  useEffect( () => {
    if (!token){
      return;
    }
    fetch("https://movie-api-o14j.onrender.com/movies", {
       headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched movies:", data);
        dispatch(setMovies(data));
      })
      .catch((err) => console.error("Error fetching movies:", err));
  },[token, dispatch]);

  const handleAddFavorite = (movieId) => {

    fetch(`https://movie-api-o14j.onrender.com/users/${user.Username}/movies/${movieId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to add favorite");
        dispatch(
          setUser((prevUser) => ({
            ...prevUser,
            FavoriteMovies: [...prevUser.FavoriteMovies, movieId],
          }))
        );
      })
      .catch((err) => console.error(err));
  };

  const handleUpdateFavorites = (newFavorites) => {
    // Ensure deep clone — converts to JSON-safe plain object
    const safeFavorites = JSON.parse(JSON.stringify(newFavorites));

    dispatch(setUser({ 
      ...user, 
      FavoriteMovies: safeFavorites 
    }));
  };

  const handleLoggedOut = () => {
    dispatch(setUser(null));
    localStorage.clear();
  };

  const onUserUpdate = (updatedUser) => {
    debugger
    dispatch(setUser(updatedUser));
  };

  console.log("User from Redux:", user);
  console.log("Token:", token);
  console.log("Movies from Redux state:", movies);

  return(
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLoggedOut}/>
      <Row  className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                { user ? (
                  <Navigate to="/" replace />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={onUserUpdate}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <ProfileView
                  user={user}
                  token={token}
                  movies={movies}
                  onLoggedOut={handleLoggedOut}
                  onUpdateFavorites={handleUpdateFavorites} 
                />
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView 
                      movies={movies}
                      onBackClick={() => setSelectedMovie(null)} 
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <div className="MoviesPage">
                    <Container>
                      <MoviesList
                        onAddFavorite={handleAddFavorite}
                        favoriteMovies={user ? user.FavoriteMovies : []}
                      />
                    </Container>
                  </div>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};


/*{!user ? (
            <Col md={5}>
              <LoginView
                onLoggedIn={(user, token) => {
                  setUser(user);
                  setToken(token);
                }}
              />
              or
              <SignupView />
            </Col>
          ) : selectedMovie? (
            <>
              <Col md={8} style={{ border: "1px solid black" }}>
                <MovieView
                  movie={selectedMovie}
                  onBackClick={() => setSelectedMovie(null)}
                />
              </Col>

              <hr />
              <h2>Similar Movies</h2>

              <Row>
                {movies
                  // filter out only movies with the same genre but different id
                  .filter(
                    ({ Genre, _id }) =>
                      Genre?.Name === selectedMovie.Genre?.Name && _id !== selectedMovie._id
                  )
                  // map through the filtered list and render MovieCards
                  .map((movie) => (
                    <Col key={movie._id} md={3}>
                      <MovieCard
                        movie={movie}               // pass the movie object as a prop
                        onMovieClick={setSelectedMovie} // directly set selected movie when clicked
                      />
                    </Col>
                  ))}
              </Row>
            </>
          ) : movies.length === 0 ? (
            <div>The list is empty</div>
          ) : (
            <>
              {movies.map((movie) => (
                <Col className="mb-5" key={movie._id} md={3}>
                  <MovieCard 
                    movie={movie}
                    onMovieClick={(newSelecetedMovie)=>{
                      setSelectedMovie(newSelecetedMovie);
                    }}
                  />
                </Col>
              ))}
              <hr />
              <button onClick={() => { setUser(null); setToken(null); localStorage.clear();}}>Logout</button>
            </>
          )}
            */

          