import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./movie-view.scss";
import { MovieCard } from "../movie-card/movie-card";


export const MovieView = () => {
  const { movieId } = useParams();

  const movies = useSelector((state) => state.movies.list);

  const movie = movies.find((m) => m._id === movieId);

  if (!movie) return <div>Movie not found</div>;

  const similarMovies = movies.filter(
    ({ Genre, _id }) => Genre?.Name === movie.Genre?.Name && _id !== movie._id
  );
  
  return (
    <>
      <Row className="justify-content-md-center mt-4">
        <Col md={8}>
          <div className="movie-view text-center">
        
            <img
              className="img-fluid rounded shadow-sm mb-3"
              src={movie.ImagePath}
              alt={movie.Title}
            />

            <div className="text-start">
              <div className="mb-2">
                <strong>Title:</strong> {movie.Title}
              </div>
              <div className="mb-2">
                <strong>Description:</strong> {movie.Description}
              </div>
              <div className="mb-2">
                <strong>Genre:</strong> {movie.Genre?.Name}
              </div>
              <div className="mb-2">
                <strong>Genre Description:</strong> {movie.Genre?.Description}
              </div>
              <div className="mb-2">
                <strong>Director:</strong> {movie.Director?.Name}
              </div>
              <div className="mb-2">
                <strong>Director Bio:</strong> {movie.Director?.Bio}
              </div>
              {movie.Director?.BirthYear && (
                <div className="mb-2">
                  <strong>Born:</strong> {movie.Director.BirthYear}
                </div>
              )}
              {movie.Director?.DeathYear && (
                <div className="mb-2">
                  <strong>Died:</strong> {movie.Director.DeathYear}
                </div>
              )}
              <div className="mb-2">
                <strong>Release Year:</strong> {movie.ReleaseYear}
              </div>
              <div className="mb-2">
                <strong>Rating:</strong> {movie.Rating}
              </div>
              <div className="mb-2">
                <strong>Featured:</strong> {movie.Featured ? "Yes" : "No"}
              </div>
            </div>

            <div className="mt-4">
              <Link to={`/`}>
                <Button variant="secondary">Back</Button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
      
      {similarMovies.length > 0 && (
        <>
          <h2 className="mt-5 text-center">Similar Movies</h2>
          <Row className="justify-content-md-center">
            {similarMovies.map((sm) => (
              <Col key={sm._id} md={3} className="mb-4">
                {/* Using MovieCard with Link inside instead of onMovieClick */}
                <MovieCard movie={sm} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
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
        Description: PropTypes.string.isRequired
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string,
        BirthYear: PropTypes.number,
        DeathYear: PropTypes.number
      }),
      ImagePath: PropTypes.string.isRequired,
      ReleaseYear: PropTypes.number.isRequired,
      Rating: PropTypes.number.isRequired,
      Featured: PropTypes.bool
    })
  ).isRequired
};