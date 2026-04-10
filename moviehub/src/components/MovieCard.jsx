import { addFavorite, removeFavorite, getFavorites } from "../services/favorites";
import { useState, useEffect } from "react";

function MovieCard({ movie, onSelect, refreshFavorites }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkIfFavorite();
  }, [movie]);

  const checkIfFavorite = async () => {
    try {
      const favorites = await getFavorites();

      // 🔥 NORMALIZAÇÃO DO ID (resolve Home + Favorites)
      const movieId = movie.id || movie.movieId;

      const exists = favorites.some(
        (fav) => fav.movieId === movieId
      );

      setIsFavorite(exists);
    } catch (error) {
      console.error("Erro ao verificar favoritos:", error);
    }
  };

  const handleFavorite = async (e) => {
    e.stopPropagation();

    try {
      const movieId = movie.id || movie.movieId;

      if (isFavorite) {
        await removeFavorite(movieId);
        setIsFavorite(false);
      } else {
        await addFavorite(movie);
        setIsFavorite(true);
      }

      if (refreshFavorites) refreshFavorites();
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error);
    }
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
        alt={movie.title}
        style={styles.image}
      />

      <div style={styles.overlay}>
        <h3 style={styles.title}>{movie.title}</h3>

        <p style={styles.rating}>
          Nota: {movie.vote_average || movie.rating}
        </p>

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
    borderRadius: "12px",
    overflow: "hidden",
    transition: "0.3s",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(0,0,0,0.5)"
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
    background: "linear-gradient(transparent, rgba(0,0,0,0.9))",
    padding: "12px",
    color: "#fff"
  },
  title: {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "5px"
  },
  rating: {
    fontSize: "12px",
    color: "#ccc"
  },
  button: {
    marginTop: "10px",
    padding: "8px",
    width: "100%",
    background: "#e50914",
    border: "none",
    color: "#fff",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.2s"
  }
};

export default MovieCard;