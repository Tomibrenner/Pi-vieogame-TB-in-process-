const { Router } = require("express");
const router = Router();
const {getUserHandler} = require('../handlers/videogameIdHan')



router.get("/:id", getUserHandler);

module.exports = router;