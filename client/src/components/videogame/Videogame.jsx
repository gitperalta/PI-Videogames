import React from "react";
import styles from "./Videogame.module.css";
import { Link } from "react-router-dom";

export default function Videogame(props) {
  return props ? (
    <div className={styles.videogame}>
      <Link to={`/${props.id}`}>
        <h3 className={styles.name}>{props.name}</h3>
      </Link>
      <div className={styles.container}>
        <div className={styles.genres}>
          <span>Genres: </span>
          <ul>
            {props.genres.map((genre) => (
              <li key={genre.name ?? genre}> {genre.name ?? genre}</li>
            ))}
          </ul>
        </div>
        <div>
          <img
            src={props.background_image}
            alt="error"
            className={styles.img}
          />
        </div>
      </div>
    </div>
  ) : (
    <span>Loading...</span>
  );
}
