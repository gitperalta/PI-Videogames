const { Router } = require("express");
const genres = Router();
const { getApiGenres } = require("../controllers");
const { Genre } = require("../db.js");

genres.get("/", async (req, res) => {
  try {
    let genres = await getApiGenres();
    genres.forEach(async (genre) => {
      return await Genre.findOrCreate({
        where: {
          name: genre,
        },
      });
    });
    genres = await Genre.findAll();
    res.status(200).send(genres);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = genres;
