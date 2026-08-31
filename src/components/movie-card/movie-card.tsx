import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./movie-card.scss";

type Movie = {
  _id: string;
  Title: string;
  Genre?: {
    Name?: string;
  };
  Director?: {
    Name?: string;
  };
  ReleaseYear?: number;
  ImagePath: string;
  Featured?: boolean;
};

type MovieCardProps = {
  movie: Movie;
  onAddFavorite?: (movieId: string) => void;
  favoriteMovies?: string[];
};


export const MovieCard = ({
  movie,
  onAddFavorite,
  favoriteMovies = [],
}: MovieCardProps) => {
  const navigate = useNavigate();
  const isFavorite = favoriteMovies?.includes(movie._id);

  const handleCardClick = () => {
    navigate(`/movies/${encodeURIComponent(movie._id)}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (onAddFavorite) {
      onAddFavorite(movie._id);
    }
  };

  const handleKeyDown = ( e: React.KeyboardEvent<HTMLElement>) => {
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
