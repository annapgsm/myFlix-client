import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick, onAddFavorite, favoriteMovies = [] }) => {
 
  const isFavorite = favoriteMovies?.includes(movie._id);

  return (
    <Card className="movie-card">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Genre?.Name}</Card.Text>

        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="outline-light" size="sm" className="open-btn">
            Open
          </Button>
        </Link>

        {onAddFavorite && (
          <Button
            variant={isFavorite ? "success" : "outline-primary"} // green if favorite, blue outline if not
            size="sm"
            className="mt-2"
            onClick={() => onAddFavorite(movie._id)}
          >
            {isFavorite ? "Added to Favorites" : "Add to Favorites"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};



MovieCard.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string
        }),
        ReleaseYear: PropTypes.number,
        ImagePath: PropTypes.string.isRequired,
        Featured: PropTypes.bool
    }).isRequired,
    onAddFavorite: PropTypes.func,
};
