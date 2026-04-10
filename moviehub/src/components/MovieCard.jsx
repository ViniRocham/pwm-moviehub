import { addFavorite, removeFavorite, getFavorites } from "../services/favorites";
import { useState, useEffect } from "react";

function MovieCard({ movie, onSelect, refreshFavorites }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkIfFavorite();
  }, []);

  const checkIfFavorite = async () => {
    const favorites = await getFavorites();

    const exists = favorites.some(
      (fav) => fav.movieId === movie.id
    );

    setIsFavorite(exists);
  };

  const handleFavorite = async (e) => {
    e.stopPropagation();

    if (isFavorite) {
      await removeFavorite(movie.id);
      setIsFavorite(false);
    } else {
      await addFavorite(movie);
      setIsFavorite(true);
    }

    if (refreshFavorites) refreshFavorites();
  };

  return (
    <div
      style={styles.card}
      onClick={() => onSelect && onSelect(movie)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <img
        src={
          movie.poster_path || movie.poster
            ? `https://image.tmdb.org/t/p/w500${
                movie.poster_path || movie.poster
              }`
            : "https://via.placeholder.com/300x450"
        }
        style={styles.image}
      />

      <div style={styles.overlay}>
        <h3>{movie.title}</h3>

        <p>Nota: {movie.vote_average || movie.rating}</p>

        <button onClick={handleFavorite} style={styles.button}>
          {isFavorite ? "Remover" : "Favoritar"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    position: "relative",
    borderRadius: "10px",
    overflow: "hidden",
    transition: "0.3s",
    cursor: "pointer"
  },
  image: {
    width: "100%",
    height: "270px",
    objectFit: "cover"
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    background: "linear-gradient(transparent, black)",
    padding: "10px",
    color: "#fff"
  },
  button: {
    marginTop: "8px",
    padding: "6px",
    background: "#e50914",
    border: "none",
    color: "#fff",
    borderRadius: "5px"
  }
};

export default MovieCard;