import React from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "./movies-list.scss";

export const MoviesList = ({ favoriteMovies, onAddFavorite }) => {
  const movies = useSelector((state) => state.movies.movies.list) || [];
  const filter = (useSelector((state) => state.movies.movies.filter) || "").trim().toLowerCase();
  
  return (
    <>
        <Row>
            {movies.length === 0 ? (
                <Col>The list is empty!</Col>
            ) : (
                filteredMovies.map((movie) => (
                    <Col className="mb-4 mt-2" key={movie._id} xs={12} sm={6}md={3}>
                        <MovieCard 
                        movie={movie}
                        onAddFavorite={onAddFavorite}
                        favoriteMovies={favoriteMovies || []} />
                    </Col>
                ))
            )}
        </Row>
    </>
  );
};

