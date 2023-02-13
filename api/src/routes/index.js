const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogames = require("./videogames");
const videogameId = require("./videogameId");
const genre = require("./genre");

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", videogames);
router.use("/videogame", videogameId);
router.use("/genres", genre);

module.exports = router;
