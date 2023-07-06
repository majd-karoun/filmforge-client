import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/MovieCard";
import { MovieView } from "../movie-view/MovieView";
import { LoginView } from "../login-view/LoginView";
import { SignupView } from "../signup-view/SignupView";
import { Col, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/NavigationBar";
import ProfileView from "../profile-view/ProfileView";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [movies, setMovies] = useState([]);

  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  

  const onLogOut = () => {
    setToken(null);
    localStorage.clear();
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://filmforge.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) =>
      response.json().then((data) => {
        console.log(data);
        setMovies(data);
      })
    );
  }, [token]);

  const filteredMovies = movies.filter(
    (movie) => selectedGenre === "" || movie.genre[0].name === selectedGenre
  );

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={onLogOut} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} user={user} token={token} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    <select
                    
                    
                      value={selectedGenre}
                      onChange={(e) => setSelectedGenre(e.target.value)}>
                      <option value="">All</option>
                      <option value="Action">Action</option>
                      <option value="Sci-Fi">Sci-Fi</option>
                      <option value="Thriller">Thriller</option>
                      <option value="Drama">Drama</option>
                      {genres.map((genre) => (
                        <option key={genre} value={genre}>
                          {genre}
                        </option>
                      ))}
                    </select>
                    {filteredMovies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/users/:username"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <ProfileView onLoggedOut={onLogOut} token={token} />
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
