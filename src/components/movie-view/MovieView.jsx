import './movie-view.scss'


export const MovieView = ({ movie, onBackClick }) => {
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
      <button style={{cursor : "pointer"}} className="back-button" onClick={onBackClick}>Back</button>
    </div>
  );
};
