const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;

const cleanArray = (arr) =>
  arr.map((element) => {
    return {
      id: element.id,
      name: element.name,
      released: element.released,
      rating: element.rating,
      created: false,
      background_image: element.background_image,
      platforms: element.platforms.map((el) => el.platform.name),
      genres: element.genres.map((el) => el.name),
    };
  });

const createUser = async (
  name,
  rating,
  description,
  platforms,
  background_image,
  genres
) => {
  const newUser = await Videogame.create({
    name,
    rating,
    description,
    platforms,
    background_image,
  });

  const apiGenres = await Genre.findAll({where:{name:genres}})

  await newUser.addGenre(apiGenres);

  const newGame = await Videogame.findOne({
    where: {
      name: name,
    },
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  return newGame
  
};

const searchUserByName = async (name) => {
  const databaseUsers = await Videogame.findAll({ where: { name: name } });

  const apiUsersRaw = (
    await axios.get(
      `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
    )
  ).data.results;

  const apiUsers = cleanArray(apiUsersRaw);

  const allGames = [...databaseUsers, ...apiUsers];

  return allGames.length > 15 ? allGames.slice(0, 15) : allGames;
};

const getAllUsers = async () => {
  //debe buscar en db, api y unificar
  const databaseUsers = await Videogame.findAll(); //usuarios de base de datos

  const games100 = new Set();
  //El objeto Set le permite almacenar valores únicos de cualquier tipo, ya sea valores primitivos o referencias a objetos.

  for (let i = 1; i < 6; i++) {
    const apiUsersRaw = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
    ); //usuarios de la api

    games100.add(apiUsersRaw.data.results);
  }

  const apiGames = [...games100].flat();
  //El método flat() crea una nueva matriz con todos los elementos de sub-array concatenados recursivamente hasta la profundidad especificada.

  const apiUsers = cleanArray(apiGames);

  const result = [...databaseUsers, ...apiUsers];

  return result;
};

module.exports = { createUser, searchUserByName, getAllUsers };
