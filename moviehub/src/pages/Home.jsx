import { useState } from "react";
import { searchMovies, getMovieDetails } from "../services/api";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import Navbar from "../components/Navbar";

function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState(null);
  const [backdrop, setBackdrop] = useState(null);

  const handleSearch = async () => {
    const results = await searchMovies(query);
    setMovies(results);

    if (results[0]?.backdrop_path) {
      setBackdrop(
        `https://image.tmdb.org/t/p/original${results[0].backdrop_path}`
      );
    }
  };

  const handleSelect = async (movie) => {
    const details = await getMovieDetails(movie.id);
    setSelected(details);
  };

  return (
    <div style={styles.page}>
      <Navbar />

      <div
        style={{
          ...styles.banner,
          backgroundImage: backdrop
            ? `url(${backdrop})`
            : "linear-gradient(#000, #111)"
        }}
      />

      <div style={styles.container}>
        <div style={styles.searchBox}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar filme..."
            style={styles.input}
          />
          <button onClick={handleSearch} style={styles.button}>
            Buscar
          </button>
        </div>

        <div style={styles.grid}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      {selected && (
        <MovieModal movie={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

const styles = {
  page: {
    background: "#111",
    minHeight: "100vh",
    color: "#fff"
  },
  banner: {
    height: "300px",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  container: {
    padding: "30px"
  },
  searchBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },
  input: {
    padding: "10px",
    width: "300px",
    background: "#222",
    color: "#fff",
    border: "none",
    borderRadius: "5px"
  },
  button: {
    padding: "10px",
    background: "#e50914",
    color: "#fff",
    border: "none",
    borderRadius: "5px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "20px"
  }
};

export default Home;