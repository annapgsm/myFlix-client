import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken? storedToken : null);

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser? storedUser : null);


  useEffect( () => {
    if (!token){
      return;
    }
    fetch("https://movie-api-o14j.onrender.com/movies", {
       headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched movies:", data);
        setMovies(data);
      })
      .catch((err) => console.error("Error fetching movies:", err));
  },[token]);


  return(
    <Row  className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          or
          <SignupView />
        </Col>
      ) : selectedMovie? (
        <>
          <Col md={8} style={{ border: "1px solid black" }}>
            <MovieView
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>

          <hr />
          <h2>Similar Movies</h2>

          <Row>
            {movies
              // filter out only movies with the same genre but different id
              .filter(
                ({ Genre, _id }) =>
                  Genre?.Name === selectedMovie.Genre?.Name && _id !== selectedMovie._id
              )
              // map through the filtered list and render MovieCards
              .map((movie) => (
                <Col key={movie._id} md={3}>
                  <MovieCard
                    movie={movie}               // pass the movie object as a prop
                    onMovieClick={setSelectedMovie} // directly set selected movie when clicked
                  />
                </Col>
              ))}
          </Row>
        </>
      ) : movies.length === 0 ? (
        <div>The list is empty</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className="mb-5" key={movie._id} md={3}>
              <MovieCard 
                movie={movie}
                onMovieClick={(newSelecetedMovie)=>{
                  setSelectedMovie(newSelecetedMovie);
                }}
              />
            </Col>
          ))}
          <hr />
          <button onClick={() => { setUser(null); setToken(null); localStorage.clear();}}>Logout</button>
        </>
      )}
    </Row>
  );
};