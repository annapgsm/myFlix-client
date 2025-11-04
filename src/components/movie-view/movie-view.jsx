import { useParams } from "react-router";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Container, Row, Col, Card, Navbar, Nav, Button } from 'react-bootstrap';
import "./movie-view.scss";
import { MovieCard } from "../movie-card/movie-card";



export const MovieView = () => {
  const { movieId } = useParams();

  const movies = useSelector((state) => state.movies.movies.list) || [];

  const movie = movies.find((m) => m._id === movieId);

  if (!movie) return <div>Movie not found</div>;

  const similarMovies = movies.filter(
    ({ Genre, _id }) => Genre?.Name === movie.Genre?.Name && _id !== movie._id
  );
  
  return (
    <>

      <Container fluid style={{ paddingTop: '80px' }}>
        <Link to={`/`}>
          <Button
            variant="outline-secondary"
            size="sm"
            className="mb-3"
          >
            ← Back
          </Button>
        </Link>
        
        <Row className="align-items-center mb-5 g-4">
          <Col md={6}>
            <h2 className="mb-3">{movie.Title}</h2>

            <div className="small mb-4">
              {movie.Rating && <span>Rating: {movie.Rating}</span>}
              {movie.Rating && movie.ReleaseYear && <span className="mx-2">|</span>}
              {movie.ReleaseYear && <span>Release Year: {movie.ReleaseYear}</span>}
            </div>
    
            <p className="mb-4">{movie.Description}</p>

            <dl className="mb-0">
              
              <div className="mb-3">
                <dt className="meta-label">Genre</dt>
                <dd className="meta-value mb-1">{movie.Genre?.Name || "—"}</dd>
                {movie.Genre?.Description && (
                  <dd className="meta-nested"> {movie.Genre.Description} </dd>
                )}
              </div>

              <div className="mb-3">
                <dt className="meta-label">Director</dt>
                <dd className="meta-value mb-1">{movie.Director?.Name || "—"}</dd>
                {movie.Director?.Bio && (
                  <dd className="meta-nested">{movie.Director.Bio}</dd>
                )}

                {movie.Director?.BirthYear && (
                  <dd className="meta-value mt-2">Born: {movie.Director.BirthYear}</dd>
                )}
                {movie.Director?.DeathYear && (
                  <dd className="meta-value">Died: {movie.Director.DeathYear}</dd>
                )}
              </div>

              <div className="mb-3">
                <dt className="meta-label">Featured</dt>
                <dd className="meta-value">{movie.Featured ? "Yes" : "No"}</dd>
              </div>
            </dl>
          </Col>
          
          <Col md={6}>
              <img
                className="img-fluid rounded shadow-sm mb-3 w-75"
                src={movie.ImagePath}
                alt={movie.Title}
              />
          </Col>
        </Row>

        {similarMovies.length > 0 && (
          <Row>
            <h4 className="text-center mb-4">Similar Movies</h4>
            <Row className="justify-content-center">
              {similarMovies.map((sm) => (
                <Col key={sm._id} md={3} className="mb-4">
                  <MovieCard movie={sm} />
                </Col>
              ))}
            </Row>
          </Row>
        )}
      </Container>
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

/*
return (
    <>
      <Row className="justify-content-md-center mt-4">
        <Col md={8}>
          <div className="movie-view d-flex flex-column flex-md-row align-items-start">
          
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
                <MovieCard movie={sm} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};
*/
