import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    { id: 1, title: "Psycho", image: "https://upload.wikimedia.org/wikipedia/commons/7/76/Psycho_%281960%29_theatrical_poster_%28retouched%29.jpg", director:"Alfred Hitchcock" },
    { id: 2, title: "Nightcrawler", image: "https://upload.wikimedia.org/wikipedia/en/d/d4/Nightcrawlerfilm.jpg", director:"Dan Gilroy" },
    { id: 3, title: "Rosemaries Baby", image:"https://m.media-amazon.com/images/I/A1Vmrrc2S+L._SL1500_.jpg", director:"Roman Polanski" },
  ]);
  
  const [selectedMovie, setSelectedMovie] = useState(null);

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
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => { // passed a function as a prop called onMovieClick
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};