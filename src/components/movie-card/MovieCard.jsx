import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
   
      onClick={() => {
        onMovieClick(movie);
      }}>
      {movie.title}
    </div>
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
    image: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
