import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card style={{width: "14.5rem"}}
    className="h-100"
     >
      <Card.Body>
        <Card.Img variant="top" style={{ width: "200px" }} src={movie.image} />
        <Card.Title>{movie.title}</Card.Title>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
        <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    director: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string,
      birth: PropTypes.string,
      bio: PropTypes.string,
    }),
    genre: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string,
      description: PropTypes.string,
    }),
    image: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
