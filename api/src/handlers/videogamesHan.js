const {
  createUser,
  searchUserByName,
  getAllUsers,
} = require("../controllers/videogamesCon");

const createUserHandler = async (req, res) => {
  const { name, rating, description, platforms, background_image, genres } = req.body;
  try {
    const newUser = await createUser(name, rating, description, platforms,background_image,genres);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllUsersHandler = async (req, res) => {
  const { name } = req.query;

  const result = name ? await searchUserByName(name) : await getAllUsers();
  try {
    result.length
      ? res.status(200).json(result)
      : res.status(400).json({ error: "Juego no encontrado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUserHandler,
  getAllUsersHandler,
};
