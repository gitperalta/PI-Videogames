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
      if (games.length === 0) {
        res.status(400).send("Videogame not found");
      } else {
        res.status(200).send(games);
      }
    } else {
      games = await getAllVideogames();
      res.status(200).send(games);
    }
  } catch (error) {
    res.status(400);
  }
});

videogames.post("/", async (req, res) => {
  try {
    let { name, background_image, rating, platforms, genres, description } =
      req.body;
    let game = await Videogame.create({
      name,
      background_image:
        background_image ||
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gridoffset-videogames-1-1585583517.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*",
      rating,
      platforms,
      description,
    });
    let genresDb = await Genre.findAll({
      where: {
        name: genres,
      },
    });
    await game.addGenre(genresDb);
    res.status(200).send("Videogame created successfully");
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

module.exports = videogames;
