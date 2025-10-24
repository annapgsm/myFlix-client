import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onMovieClick, onAddFavorite,favoriteMovies = []}) => {
    const isFavorite = favoriteMovies.includes(movie._id); // check if it's already favorite
    return (
        <Card>
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>Directed by: {movie.Director?.Name}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                <Button variant="link">Open</Button>
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

