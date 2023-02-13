const { Router } = require("express");
const router = Router();
const { getGenresHandler} = require('../handlers/genreHan')


router.get("/", getGenresHandler);


// router.post("/", createGenreHandler);

module.exports = router;