import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import {SignupView} from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  //fetch data from API and store it in movies
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
        setMovies(data);
      })
      .catch((err) => console.error("Error fetching movies:", err));
    },[token]);

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }

// if no movie is selected, render nothing (early return)
if (!selectedMovie) return null;

return (
  <>
    <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    <hr />
    <h2>Similar Movies</h2>

    {movies
      // filter out only movies with the same genre but different id
      .filter(
        ({ Genre, _id }) =>
          Genre?.Name === selectedMovie.Genre?.Name && _id !== selectedMovie._id
      )
      // map through the filtered list and render MovieCards
      .map((movie) => (
        <MovieCard
          key={movie._id}             // unique key for React
          movie={movie}               // pass the movie object as a prop
          onMovieClick={setSelectedMovie} // directly set selected movie when clicked
        />
      ))}
  </>
);

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <>
      <div>
        {movies.map((movie) => ( //loops through movie array
          <MovieCard
            key={movie._id}       //gives each MovieCard a unique key
            movie={movie}        //passes the actual movie object as a prop
            onMovieClick={(newSelectedMovie) => { //passes a function as another prop 
              setSelectedMovie(newSelectedMovie); //updates selectedMovie state when clicked
            }}
          />
        ))}
      </div>
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear();}}>Logout</button>
    </>
  );
};