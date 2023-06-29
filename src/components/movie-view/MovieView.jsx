import { useParams } from "react-router";
import { Link } from "react-router-dom";
import './movie-view.scss'

export const MovieView = ({ movies }) => {
  const {movieId} = useParams();
  const movie = movies.find((m) => m._id === movieId)
  return (
    <div>
      <div>
        <img  src={movie.image} alt={movie.title} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director[0].name}</span>
        
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre[0].name}</span>
      </div>
      <div>
        <span>Description: </span>
        <p>{movie.description}</p>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};
