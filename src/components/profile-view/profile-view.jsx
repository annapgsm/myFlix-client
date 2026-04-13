import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import "./profile-view.scss";

export const ProfileView = ({ user, token, movies, onLoggedOut,  onUpdateFavorites  }) => {
    const [userData, setUserData] = useState(user);
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday ? user.Birthday.slice(0, 10) : "");

    useEffect(() => {
        setBirthday(userData.Birthday ? userData.Birthday.slice(0, 10) : "");
    }, [userData]);

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

    /* 
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
    */

    return (
        <Container className="profile-page">
            <h2 className="profile-title">My Profile</h2>

            <Row className="g-4 align-items-start">
            
            {/* LEFT: FORM */}
            <Col lg={5}>
                <div className="profile-panel">
                <h4 className="section-title">User Information</h4>

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

                    <Form.Group className="mb-4">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                    </Form.Group>

                    <div className="profile-actions">
                    <Button type="submit">Update</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    </div>
                </Form>
                </div>
            </Col>

            {/* RIGHT: FAVORITES */}
            <Col lg={7}>
                <div className="profile-panel">
                <h4 className="section-title">Favorite Movies</h4>

                {favoriteMovies.length === 0 ? (
                    <p className="empty-state">No favorite movies yet.</p>
                ) : (
                    <Row className="g-4">
                    {favoriteMovies.map((movie) => (
                        <Col key={movie._id} sm={6} xl={4}>
                        <MovieCard
                            movie={movie}
                            onAddFavorite={handleRemoveFavorite}
                            favoriteMovies={userData.FavoriteMovies}
                        />
                        </Col>
                    ))}
                    </Row>
                )}
                </div>
            </Col>

            </Row>
        </Container>
    );
};