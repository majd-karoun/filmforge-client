import { useParams } from "react-router";
import { Link } from "react-router-dom";
import './movie-view.scss'

export const MovieView = ({ movies, user, token}) => {
  const {movieId} = useParams();
  const movie = movies.find((m) => m._id === movieId)

  const addToFavorites = () => {
    fetch(`https://filmforge.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      if (response.ok) {
        alert('Movie added to favorites');
      } else {
        alert('Failed to add movie to favorites');
      }
    }).catch(error => {
      console.log(error);
      alert('Failed to add movie to favorites');
    });
  }

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
      <button onClick={addToFavorites} className="favorite-button">Add to favorites</button>
    </div>
  );
};
