import axios from "axios";

const API_KEY = "3b28a4d8da6a56faa835dc56883f4452";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const searchMovies = async (query) => {
  const response = await api.get(
    `/search/movie?api_key=${API_KEY}&query=${query}`
  );
  return response.data.results;
};

export const getMovieDetails = async (id) => {
  const response = await api.get(
    `/movie/${id}?api_key=${API_KEY}`
  );
  return response.data;
};