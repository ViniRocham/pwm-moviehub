import Parse from "./back4app";

const Favorite = Parse.Object.extend("Favorites");

// CREATE
export const addFavorite = async (movie) => {
  const fav = new Favorite();

  fav.set("movieId", movie.id);
  fav.set("title", movie.title);
  fav.set("poster", movie.poster_path);
  fav.set("rating", movie.vote_average);

  await fav.save();
};

// READ
export const getFavorites = async () => {
  const query = new Parse.Query("Favorites");
  const results = await query.find();

  return results.map((item) => ({
    objectId: item.id,
    movieId: item.get("movieId"),
    title: item.get("title"),
    poster: item.get("poster"),
    rating: item.get("rating")
  }));
};

// DELETE
export const removeFavorite = async (movieId) => {
  const query = new Parse.Query("Favorites");
  query.equalTo("movieId", movieId);

  const results = await query.find();

  for (let item of results) {
    await item.destroy();
  }
};