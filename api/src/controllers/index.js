const axios = require("axios");
const { Videogame, Genre } = require("../db.js");
require("dotenv").config();

async function getAllVideogames() {
  let links = [];
  let apis = [];
  for (let i = 1; i <= 5; i++) {
    links.push(
      `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${i}`
    );
  }
  apis = links.map((link) => {
    return axios
      .get(link)
      .then((data) => data.data)
      .then((data) => data.results)
      .then((data) => {
        return data.map((game) => ({
          id: game.id,
          name: game.name,
          background_image: game.background_image,
          genres: game.genres.map((genre) => ({ name: genre.name })),
          platforms: game.platforms.map((element) => element.platform.name),
          rating: game.rating,
        }));
      });
  });

  let databaseVideoGames = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  return Promise.all(apis)
    .then((data) => data.flat())
    .then((data) => [...data, ...databaseVideoGames])
    .catch((error) => new Error(error));
}

function getVideogameById(id) {
  return axios
    .get(`https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`)
    .then((json) => json.data)
    .then((game) => ({
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      description: game.description,
      released: game.released,
      rating: game.rating,
      platforms: game.platforms.map((element) => element.platform.name),
      genres: game.genres.map((genre) => genre.name),
    }))
    .catch((error) => new Error(error));
}

function getApiGenres() {
  return axios
    .get(`https://api.rawg.io/api/genres?key=${process.env.API_KEY}`)
    .then((data) => data.data.results.map((genre) => genre.name))
    .catch((error) => new Error(error));
}

function getPlatforms() {
  return getAllVideogames()
    .then((videogames) => videogames.map((game) => game.platforms))
    .then((platforms) => platforms.flat())
    .then((platforms) => new Set(platforms))
    .then((platforms) => Array.from(platforms))
    .catch((error) => new Error(error));
}

module.exports = {
  getAllVideogames,
  getVideogameById,
  getApiGenres,
  getPlatforms,
};
