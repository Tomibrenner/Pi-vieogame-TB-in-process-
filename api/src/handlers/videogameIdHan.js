const { getUserById } = require("../controllers/videogameIdCon");


const getUserHandler = async (req, res) => {
  const { id } = req.params;

  const source = isNaN(id)
    ? "BDD" /*esto es de la database - uuid*/
    : "api"; /*//esto es de la api */

  try {
    const user = await getUserById(id, source);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getUserHandler };
