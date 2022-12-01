import styles from "./CreateVideogame.module.css";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllPlatforms, getGenres, postVideogame } from "../../redux/actions";
import Bar from "../../bar/Bar";

export default function CreateVideogame() {
  const history = useNavigate();
  const platforms = useSelector((state) => state.platforms);
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  const [formPlatforms, setPlatforms] = useState([]);
  const [formGenres, setGenres] = useState([]);
  const [form, setForm] = useState({
    name: "",
    background_image: "",
    platforms: [],
    description: "",
    rating: null,
    genres: [],
  });

  useEffect(() => {
    dispatch(getAllPlatforms());
    dispatch(getGenres());
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(postVideogame(form));
    console.log(form);
    return history("/home");
  };

  const handleName = (e) => {
    e.preventDefault();
    setForm({ ...form, name: e.target.value });
  };

  const handleBackgroundImage = (e) => {
    e.preventDefault();
    setForm({ ...form, background_image: e.target.value });
  };

  const handlePlatforms = (e) => {
    e.preventDefault();
    if (!formPlatforms.find((platform) => platform === e.target.value)) {
      formPlatforms.push(e.target.value);
      setForm({ ...form, platforms: formPlatforms });
    }
  };

  const handleRating = (e) => {
    e.preventDefault();
    setForm({ ...form, rating: e.target.value });
    console.log(form);
  };

  const handleGenres = (e) => {
    e.preventDefault();
    if (!formPlatforms.includes(e.target.value)) {
      formGenres.push(e.target.value);
      setForm({ ...form, genres: formGenres });
    }
  };

  const handleDescription = (e) => {
    e.preventDefault();
    setForm({ ...form, description: e.target.value });
    console.log(form);
  };

  const handleGenresX = (e) => {
    e.preventDefault();
    setGenres(formGenres.filter((genre) => genre !== e.target.value));
  };

  const handlePlatformsX = (e) => {
    e.preventDefault();
    setPlatforms(
      formPlatforms.filter((platform) => platform !== e.target.value)
    );
  };

  return (
    <>
      <Bar />
      <div className={styles.page}>
        <form onSubmit={(e) => handleOnSubmit(e)} className={styles.form}>
          {/* <h2>Create Videogame</h2> */}
          <label htmlFor="name">Name: </label>
          <input type="text" id="name" onChange={(e) => handleName(e)} />

          <label htmlFor="background_image">Background Image:</label>
          <input
            type="text"
            id="background_image"
            onChange={(e) => handleBackgroundImage(e)}
          />

          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            onChange={(e) => handleRating(e)}
            min="1"
            max="5"
            placeholder="1-5"
          />

          <label htmlFor="platforms">Platforms:</label>
          <select
            id="platforms"
            onChange={(e) => {
              handlePlatforms(e);
            }}
          >
            <option value="select_platforms">Select platforms...</option>
            {platforms.length > 0 &&
              platforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
          </select>
          {formPlatforms.length > 0 &&
            formPlatforms.map((platform) => (
              <span key={platform}>
                · {platform}{" "}
                <button
                  key={platform}
                  value={platform}
                  onClick={(e) => handlePlatformsX(e)}
                >
                  x
                </button>
              </span>
            ))}
          <label htmlFor="genres">Genres: </label>
          <select id="genres" onChange={(e) => handleGenres(e)}>
            <option value="select_genres">Select genres...</option>
            {genres.length > 0 &&
              genres.map((genre) => (
                <option key={genre.name} value={genre.name}>
                  {genre.name}
                </option>
              ))}
          </select>
          {formGenres.length > 0 &&
            formGenres.map((genre) => (
              <span key={genre}>
                · {genre}{" "}
                <button value={genre} onClick={(e) => handleGenresX(e)}>
                  x
                </button>
              </span>
            ))}
          <label htmlFor="description">Description: </label>
          <textarea
            id="description"
            placeholder="Describe the videogame..."
            onChange={(e) => handleDescription(e)}
            rows="5"
          ></textarea>
          <input type="submit" />
        </form>
      </div>
    </>
  );
}
