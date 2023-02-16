const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;

const getUserById = async (id, source) => {
  if (source === "api") {
    const apiId = (await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    )).data;
    return {
      id: apiId.id,
      name: apiId.name,
      description: apiId.description,
      releaseDate: apiId.released,
      rating: apiId.rating,
      platforms: apiId.platforms.map((el) => el.platform.name),
      genres: apiId.genres.map((el) => el.name),
      background_image: apiId.background_image
    };
  } else {
    return await Videogame.findByPk(id);
  }
};

module.exports = { getUserById };
