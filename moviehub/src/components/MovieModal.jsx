function MovieModal({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          style={styles.image}
        />

        <div style={styles.content}>
          <h2>{movie.title}</h2>

          <p style={styles.rating}>
            Nota: {movie.vote_average}
          </p>

          <p style={styles.text}>
            {movie.overview || "Sem descrição disponível"}
          </p>

          <button onClick={onClose} style={styles.button}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  modal: {
    background: "#111",
    display: "flex",
    borderRadius: "10px",
    overflow: "hidden",
    maxWidth: "800px"
  },
  image: {
    width: "300px"
  },
  content: {
    padding: "20px",
    color: "#fff"
  },
  rating: {
    margin: "10px 0",
    color: "#bbb"
  },
  text: {
    fontSize: "14px",
    lineHeight: "1.5"
  },
  button: {
    marginTop: "15px",
    padding: "10px",
    background: "#e50914",
    color: "#fff",
    border: "none",
    borderRadius: "5px"
  }
};

export default MovieModal;