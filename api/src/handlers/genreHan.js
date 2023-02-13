const { getGenre } = require("../controllers/genreCon");

const getGenresHandler = async (req, res) => {
  const result = await getGenre();
  try {
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




module.exports = { getGenresHandler };
