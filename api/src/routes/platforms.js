const { Router } = require("express");
const platforms = Router();
const { getPlatforms } = require("../controllers/index.js");

platforms.get("/", async (req, res) => {
  try {
    let platforms = await getPlatforms();
    res.status(200).send(platforms);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = platforms;
