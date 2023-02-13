const axios = require("axios");
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");

const getGenre = async () => {
  const dbGenres = await Genre.findAll();

  if (dbGenres.length) return dbGenres;

  const api = (await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`))
    .data.results;

  const apiGenres = [...api].sort((a, b) => {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  });

  apiGenres.forEach(async (genre) => {
    await Genre.findOrCreate({
      where: {id:genre.id, name: genre.name },
    });
  });

  const arrayGenres = apiGenres.map((game) => {
    return { id: game.id, name: game.name };
  });

  return arrayGenres;
};



module.exports = { getGenre, };
