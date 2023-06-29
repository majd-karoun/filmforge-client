import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/MovieCard";
import { MovieView } from "../movie-view/MovieView";
import { LoginView } from "../login-view/LoginView";
import { SignupView } from "../signup-view/SignupView";
import { Col, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/NavigationBar";

export const MainView = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  
  const [movies, setMovies] = useState([]);

 

  const onLogOut = () => {
    setToken(null)
    localStorage.clear()
  }

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://filmforge.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => response.json()
    .then((data) => {
      
      console.log(data)
      setMovies(data);
      }))
  }, [token])

  

  return (
    <BrowserRouter>
    <NavigationBar user={user} onLoggedOut={onLogOut}/>
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
                    <MovieView movies={movies} />
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
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
      </Routes>
      
    </Row>
    </BrowserRouter>
  );
  
};
