const { Router } = require("express");
const videogames = Router();
const { getAllVideogames } = require("../controllers/index.js");
const { Videogame, Genre } = require("../db.js");

videogames.get("/", async (req, res) => {
  try {
    let { name } = req.query;
    let games = [];
    if (name) {
      games = await getAllVideogames().then((data) =>
        data.filter((game) =>
          game.name.toLowerCase().includes(name.toLowerCase())
        )
      );
      res.status(200).send(games);
    } else {
      games = await getAllVideogames();
      res.status(200).send(games);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

videogames.post("/", async (req, res) => {
  try {
    let { name, background_image, rating, platforms, genres, description } =
      req.body;
    let game = await Videogame.create({
      name,
      background_image,
      rating,
      platforms,
      description,
    });
    let genresDb = await Genre.findAll({
      where: {
        name: genres,
      },
    });
    console.log(genresDb);
    game.addGenre(genresDb);
    res.status(200).send(game);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = videogames;
