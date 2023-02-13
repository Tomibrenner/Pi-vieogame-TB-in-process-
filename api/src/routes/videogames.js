require("dotenv").config();
const { Router } = require("express");
const router = Router();

const {
  createUserHandler,
  getAllUsersHandler,
  
  
} = require("../handlers/videogamesHan");

router.get("/", getAllUsersHandler);


router.post("/", createUserHandler);



module.exports = router;
