import React from "react";
import { useSelector, useDispatch} from "react-redux";
import { Form, Row, Col } from 'react-bootstrap';
import { MovieCard } from "../movie-card/movie-card";
import { MoviesFilter } from "../movies-filter/movies-filter";
import "./movies-list.scss";

export const MoviesList = ({ favoriteMovies, onAddFavorite, user }) => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies.list) || [];
  const filter = (useSelector((state) => state.movies.movies.filter) || "").trim().toLowerCase();
  
  const filteredMovies = movies.filter(
    (movie) => !filter || (movie.Title && movie.Title.toLowerCase().includes(filter))
  );

  const handleSearchChange = (e) => {
    dispatch({ type: 'movies/setFilter', payload: e.target.value });
  };

  return (
    <>
        <div className="sticky-search-wrapper">
            <Form className="mb-3 mt-0 mx-0" style={{ maxWidth: "300px" }}>
                <Form.Control
                    type="text"
                    placeholder="Search movies..."
                    value={filter}
                    onChange={handleSearchChange}
                    style={{
                        backgroundColor: '#495057',
                        border: 'none',
                        color: 'white',
                        boxShadow: 'none',
                    }}
                    />
            </Form>
        </div>
        

        <Row>
            {movies.length === 0 ? (
                <Col>The list is empty!</Col>
            ) : (
                filteredMovies.map((movie) => (
                    <Col className="mb-4 mt-2" key={movie._id} xs={12} sm={6}md={3}>
                        <MovieCard 
                        movie={movie}
                        onAddFavorite={onAddFavorite}
                        favoriteMovies={favoriteMovies} />
                    </Col>
                ))
            )}
        </Row>
    </>
  );
};

