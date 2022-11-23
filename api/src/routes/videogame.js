const { Router } = require("express");
const videogame = Router();
const { getVideogameById } = require("../controllers");

videogame.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let game = await getVideogameById(id);
    res.status(200).send(game);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = videogame;
