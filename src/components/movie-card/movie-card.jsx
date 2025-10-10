export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
          onClick={()=>{                //callback function
              onMovieClick(movie);
          }}
        >
            {movie.title}
        </div>
    );
};

