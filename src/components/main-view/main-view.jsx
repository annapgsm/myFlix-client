import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  
  const [selectedMovie, setSelectedMovie] = useState(null);

  //fetch data from API and store it in movies
  useEffect( () => {
    fetch("https://movie-api-o14j.onrender.com")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      });
    },[]);

  if (selectedMovie) {
    return (
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    ); 
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => ( //loops through movie array
        <MovieCard
          key={movie.id}       //gives each MovieCard a unique key
          movie={movie}        //passes the actual movie object as a prop
          onMovieClick={(newSelectedMovie) => { //passes a function as another prop 
            setSelectedMovie(newSelectedMovie); //updates selectedMovie state when clicked
          }}
        />
      ))}
    </div>
  );
};