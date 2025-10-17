import React from "react";
import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
          onClick={()=>{                //callback function
              onMovieClick(movie);
          }}
        >
            {movie.Title}
        </div>
    );
};


MovieCard.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string,
            Description: PropTypes.string
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string,
            Bio: PropTypes.string
        }),
        ImagePath: PropTypes.string,
        Featured: PropTypes.bool
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};

