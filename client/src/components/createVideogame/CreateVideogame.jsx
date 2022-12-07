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
  const [form, setForm] = useState({});
  const [error, setError] = useState({});
  const [selectPlatform, setSelectPlatform] = useState(false);

  const validationName = (e) => {
    if (!/([A-Z])\w+/g.test(e.target.value)) {
      error.name = "The name must start with a capital letter.";
    } else {
      error.name = null;
    }
  };

  const validationRating = (e) => {
    if (!/[1-5]/.test(e.target.value)) {
      error.rating = "Rate the game with numbers between 1 and 5.";
    } else {
      error.rating = null;
    }
  };

  const validationDescription = (e) => {
    if (!/([A-Z])\w+/g.test(e.target.value)) {
      error.description =
        "The game must have a description starting with a capital letter.";
    } else {
      error.description = null;
    }
  };

  const validationPlatforms = () => {
    if (formPlatforms.length === 1) {
      error.platforms = "The game must have at least one platform.";
    }
  };

  const validationGenres = () => {
    if (formGenres.length === 1) {
      error.genres = "The game must have at least one genre.";
    }
  };

  useEffect(() => {
    dispatch(getAllPlatforms());
    dispatch(getGenres());
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (
      !error.name ||
      !error.platforms ||
      !error.genres ||
      !error.description
    ) {
      error.error = "Set the require inputs: *";
    } else {
      dispatch(postVideogame(form));
      return history("/home");
    }
  };

  const handleName = (e) => {
    e.preventDefault();
    validationName(e);
    setForm({
      ...form,
      name: e.target.value,
    });
  };

  const handleBackgroundImage = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      background_image: e.target.value,
    });
  };

  const handlePlatforms = (e) => {
    e.preventDefault();
    error.platforms = null;
    if (
      !formPlatforms.includes(e.target.value) &&
      e.target.value !== "select_platforms"
    ) {
      formPlatforms.push(e.target.value);
      setForm({
        ...form,
        platforms: formPlatforms,
      });
    }
  };

  const handleRating = (e) => {
    e.preventDefault();
    validationRating(e);
    setForm({
      ...form,
      rating: e.target.value,
    });
    console.log(form, form.name);
  };

  const handleGenres = (e) => {
    e.preventDefault();
    error.genres = null;
    if (
      !formPlatforms.includes(e.target.value) &&
      e.target.value !== "select_genres"
    ) {
      formGenres.push(e.target.value);
      setForm({
        ...form,
        genres: formGenres,
      });
    }
  };

  const handleDescription = (e) => {
    e.preventDefault();
    validationDescription(e);
    setForm({
      ...form,
      description: e.target.value,
    });
    console.log(form);
  };

  const handleGenresX = (e) => {
    e.preventDefault();
    setGenres(formGenres.filter((genre) => genre !== e.target.value));
    validationGenres();
  };

  const handlePlatformsX = (e) => {
    e.preventDefault();
    setPlatforms(
      formPlatforms.filter((platform) => platform !== e.target.value)
    );
    validationPlatforms();
  };

  return (
    <>
      <Bar />
      <div className={styles.page}>
        <form onSubmit={(e) => handleOnSubmit(e)} className={styles.form}>
          <label htmlFor="name">
            Name <span className={styles.asterisco}>*</span>
          </label>
          {error.name && <span className={styles.asterisco}>{error.name}</span>}
          <input type="text" id="name" onChange={(e) => handleName(e)} />
          <label htmlFor="background_image">Background Image</label>
          <input
            type="text"
            id="background_image"
            onChange={(e) => handleBackgroundImage(e)}
          />
          <label htmlFor="rating">Rating:</label>
          {error.rating && (
            <span className={styles.asterisco}>{error.rating}</span>
          )}
          <input
            type="number"
            id="rating"
            onChange={(e) => handleRating(e)}
            min="1"
            max="5"
            placeholder="1-5"
          />
          <label htmlFor="platforms">
            Platforms<span className={styles.asterisco}>*</span>
          </label>
          {error.platforms && (
            <span className={styles.asterisco}> {error.platforms} </span>
          )}
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
                · {platform}
                <button
                  key={platform}
                  value={platform}
                  onClick={(e) => handlePlatformsX(e)}
                >
                  x
                </button>
              </span>
            ))}
          <label htmlFor="genres">
            Genres<span className={styles.asterisco}>*</span>
          </label>
          {error.genres && (
            <span className={styles.asterisco}> {error.genres} </span>
          )}
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
                · {genre}
                <button value={genre} onClick={(e) => handleGenresX(e)}>
                  x
                </button>
              </span>
            ))}
          <label htmlFor="description">
            Description<span className={styles.asterisco}>*</span>
          </label>
          {error.description && (
            <span className={styles.asterisco}>{error.description}</span>
          )}
          <textarea
            id="description"
            placeholder="Describe the videogame..."
            onChange={(e) => handleDescription(e)}
            rows="10"
            cols="30"
          ></textarea>
          <span className={styles.asterisco}>{error.error}</span>
          {!error.name &&
            !error.rating &&
            !error.description &&
            !error.platforms &&
            !error.genres && (
              <input type="submit" style={{ cursor: "pointer" }} />
            )}
        </form>
      </div>
    </>
  );
}
