import { useEffect, useState } from "react";
import { getFavorites } from "../services/favorites";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <div style={{ background: "#111", minHeight: "100vh" }}>
      <Navbar />

      <h2 style={{ color: "#fff", padding: "20px" }}>
        Meus Favoritos
      </h2>

      <div style={styles.grid}>
        {favorites.map((movie) => (
          <MovieCard
            key={movie.movieId}
            movie={movie}
            refreshFavorites={loadFavorites}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "20px",
    padding: "20px"
  }
};

export default Favorites;