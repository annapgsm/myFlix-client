import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import "./profile-view.scss";

export const ProfileView = ({ user, token, movies, onLoggedOut,  onUpdateFavorites  }) => {
    const [userData, setUserData] = useState(user);
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);

    // Filter favorite movies
    const favoriteMovies = movies.filter((m) => userData.FavoriteMovies.includes(m._id));

    // Update user info
    const handleUpdate = (e) => {
        e.preventDefault();

        // Create an object with only the fields to update
        const updatedData = {
            Username: username,
            Email: email,
            Birthday: birthday
        };

        // Only include password if user entered something
        if (password) {
            updatedData.Password = password;
        }

        fetch(`https://movie-api-o14j.onrender.com/users/${userData.Username}`, { // use original username
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedData),
        })
            .then(async (response) => {
            if (!response.ok) {
                const text = await response.text(); // read plain text if not ok
                throw new Error(text);
            }
            return response.json();
        })
            .then((updatedUser) => {
            setUserData(updatedUser); // update local state
            alert("Profile updated successfully!");
        })
            .catch((error) => {
            console.error(error);
            alert("Error updating profile: " + error.message);
        });
    };

    // Delete user account
    const handleDelete = () => {
        if (!window.confirm("Are you sure you want to delete your account?")) return;

        fetch(`https://movie-api-o14j.onrender.com/users/${user.Username}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
            alert("Account deleted successfully!");
            onLoggedOut();
        })
        .catch((error) => {
            console.error(error);
            alert("Error deleting account");
        });
    };

    // Remove favorite movie
    const handleRemoveFavorite = (movieId) => {
        fetch(`https://movie-api-o14j.onrender.com/users/${user.Username}/movies/${movieId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(() => {
            setUserData((prev) => { 
                const updated = {
                    ...prev,
                    FavoriteMovies: prev.FavoriteMovies.filter((id) => id !== movieId),
                };

                setTimeout(() => {
                    onUpdateFavorites(updated.FavoriteMovies);
                }, 0);

                return updated;
            });
        })
        .catch((error) => console.error(error));
    };

    const handleAddFavorite = (movieId) => {
    if (!user) return;

    fetch(`https://movie-api-o14j.onrender.com/users/${user.Username}/movies/${movieId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to add favorite");
      dispatch(
        setUser({
          ...user,
          FavoriteMovies: [...user.FavoriteMovies, movieId],
        })
      );
    })
    .catch((err) => console.error(err));
    };

    return (
        <Container style={{ paddingTop: '70px' }}>
        <h2>My Profile</h2>
        <hr/>
        <Row className="mb-4">
            <Col md={6}>
            <h4>User Information</h4>
            <Form onSubmit={handleUpdate}>
                <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>Birthday</Form.Label>
                <Form.Control type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">Update Profile</Button>
                <Button variant="danger" className="ms-2" onClick={handleDelete}>Delete Account</Button>
            </Form>
            </Col>
        </Row>

        <h4>Favorite Movies</h4>
        {favoriteMovies.length === 0 ? (
            <p>No favorite movies yet.</p>
        ) : (
            <Row>
            {favoriteMovies.map((movie) => (
                <Col key={movie._id} md={3} className="mb-3">
                <MovieCard movie={movie} />
                <Button
                    variant="outline-danger"
                    size="sm"
                    className="mt-2"
                    onClick={() => handleRemoveFavorite(movie._id)}
                >
                    Remove from Favorites
                </Button>
                </Col>
            ))}
            </Row>
        )}
        </Container>
    );
};