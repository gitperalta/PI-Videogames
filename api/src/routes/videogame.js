const { Router } = require("express");
const {
  getAllVideogames,
  deleteVideogame,
} = require("../controllers/index.js");
const videogame = Router();
const { getVideogameById } = require("../controllers");
const { Videogame } = require("../db.js");

videogame.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let game = {};
    if (id > 0) {
      game = await getVideogameById(id);
      res.status(200).send(game);
    } else {
      game = await getAllVideogames().then((data) =>
        data.find((game) => game.id == id)
      );
      res.status(200).send(game);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = videogame;
