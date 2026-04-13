import { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./movie-view.scss";
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [movieId]);

  const { movieId } = useParams();

  const movies = useSelector((state) => state.movies.movies.list) || [];
  const movie = movies.find((m) => m._id === movieId);

  if (!movie) return <div>Movie not found</div>;

  const similarMovies = movies.filter(
    ({ Genre, _id }) => Genre?.Name === movie.Genre?.Name && _id !== movie._id
  );

  return (
    <Container className="movie-view-page">
      <Link to="/" className="back-link">
        <Button variant="outline-secondary" size="sm" className="back-btn">
          ← Back
        </Button>
      </Link>

      <Row className="movie-hero align-items-center g-4">
        <Col lg={6}>
          <div className="movie-content">
            <h1 className="movie-title">{movie.Title}</h1>

            <div className="movie-meta-row">
              {movie.Rating && (
                <span className="movie-meta-pill">Rating {movie.Rating}</span>
              )}
              {movie.ReleaseYear && (
                <span className="movie-meta-pill">Release Year {movie.ReleaseYear}</span>
              )}
              {movie.Featured && (
                <span className="movie-meta-pill">Featured</span>
              )}
            </div>

            <p className="movie-description">{movie.Description}</p>

            <div className="info-section">
              <div className="meta-label">Genre</div>
              <div className="meta-value">{movie.Genre?.Name || "—"}</div>
              {movie.Genre?.Description && (
                <p className="meta-nested">{movie.Genre.Description}</p>
              )}
            </div>

            <div className="info-section">
              <div className="meta-label">Director</div>
              <div className="meta-value">{movie.Director?.Name || "—"}</div>
              {movie.Director?.Bio && (
                <p className="meta-nested">{movie.Director.Bio}</p>
              )}

              {(movie.Director?.BirthYear || movie.Director?.DeathYear) && (
                <div className="director-years">
                  {movie.Director?.BirthYear && (
                    <span>Born {movie.Director.BirthYear}</span>
                  )}
                  {movie.Director?.DeathYear && (
                    <span>Died {movie.Director.DeathYear}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </Col>

        <Col lg={6}>
          <div className="movie-poster-wrap">
            <img
              className="movie-poster"
              src={movie.ImagePath}
              alt={movie.Title}
            />
          </div>
        </Col>
      </Row>

      {similarMovies.length > 0 && (
        <section className="similar-movies-section">
          <h2 className="similar-heading">Similar Movies</h2>

          <Row className="g-3 similar-movies-grid">
            {similarMovies.map((sm) => (
              <Col key={sm._id} sm={6} md={4} lg={3}>
                <MovieCard movie={sm} />
              </Col>
            ))}
          </Row>
        </section>
      )}
    </Container>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string,
        BirthYear: PropTypes.number,
        DeathYear: PropTypes.number,
      }),
      ImagePath: PropTypes.string.isRequired,
      ReleaseYear: PropTypes.number.isRequired,
      Rating: PropTypes.number.isRequired,
      Featured: PropTypes.bool,
    })
  ).isRequired,
};