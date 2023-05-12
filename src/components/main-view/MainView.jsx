import { useState } from "react";
import { MovieCard } from "../movie-card/MovieCard";
import { MovieView } from "../movie-view/MovieView";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
          _id: { $oid: "644660bcc034b14635f6203f" },
          title: "Inception",
          description:
            "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
          director: "Christopher Nolan",
          genre: "Action",
          image: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/9c592dee1ac813fcaf8c93557a487557_675ff711-4f45-4a98-95a5-0f97302b2126_480x.progressive.jpg?v=1573618688",
        },
        {
          _id: { $oid: "644660bcc034b14635f62040" },
          title: "The Prestige",
          description:
            "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.",
          director: "Christopher Nolan",
          genre: "Drama",
          image:"https://cdn.shopify.com/s/files/1/0057/3728/3618/products/99763af666ee931302e21c9cad3243ed_48a46774-8baf-4a98-b2bc-9ecf85dbff8b_480x.progressive.jpg?v=1573655133",
        },
        {
          _id: { $oid: "644660bcc034b14635f62041" },
          title: "Memento",
          description:
            "A man with short-term memory loss attempts to track down his wife's murderer.",
          director: "Christopher Nolan",
          genre: "Thriller",
          image: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/memento24_480x.progressive.jpg?v=1617303456",
        },
        {
          _id: { $oid: "644660bcc034b14635f62042" },
          title: "Interstellar",
          description:
            "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
          director: "Christopher Nolan",
          genre: "Sci-Fi",
          image: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/interstellar5_480x.progressive.jpg?v=1585846879",
        },
        {
          _id: { $oid: "644660bcc034b14635f62043" },
          title: "Blade Runner 2049",
          description:
            "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.",
          director: "Denis Villeneuve",
          genre: "Sci-Fi",
          image: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/07c231f2775f4ece93b1af53e5009298_5e9d1433-5ebd-4343-956c-5478acce8afa_480x.progressive.jpg?v=1573618953",
        },
      ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
