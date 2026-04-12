import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./movie-card.scss";

export const MovieCard = ({
  movie,
  onAddFavorite,
  favoriteMovies = [],
}) => {
  const navigate = useNavigate();
  const isFavorite = favoriteMovies?.includes(movie._id);

  const handleCardClick = () => {
    navigate(`/movies/${encodeURIComponent(movie._id)}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();

    if (onAddFavorite) {
      onAddFavorite(movie._id);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <Card
      className="movie-card"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
    >
      <Card.Img variant="top" src={movie.ImagePath} alt={`${movie.Title} poster`} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text className="movie-genre">{movie.Genre?.Name}</Card.Text>

        {onAddFavorite && (
          <div className="movie-card-actions">
            <Button
              className={`favorite-btn ${isFavorite ? "is-favorite" : ""}`}
              size="sm"
              onClick={handleFavoriteClick}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }),
    ReleaseYear: PropTypes.number,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool,
  }).isRequired,
  onAddFavorite: PropTypes.func,
  favoriteMovies: PropTypes.array,
};