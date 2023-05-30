import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card style={{width: "14.5rem"}}
    className="h-100"
      onClick={() => {
        onMovieClick(movie);
      }}>
      <Card.Body>
        <Card.Img variant="top" style={{ width: "200px" }} src={movie.image} />
        <Card.Title>{movie.title}</Card.Title>
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
