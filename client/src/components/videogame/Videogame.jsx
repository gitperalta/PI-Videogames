import React from "react";
import styles from "./Videogame.module.css";
import { NavLink } from "react-router-dom";

export default function Videogame(props) {
  return (
    <div className={styles.textCard}>
      <div className={styles.container}>
        <div className={styles.genres}>
          <NavLink to={`/${props.id}`} className={styles.detail}>
            <div className={styles.name}>{props.name.toUpperCase()}</div>
          </NavLink>
          <div className={styles.text}>
            <ul>
              {props.genres.map((genre) => (
                <li key={genre.name}> {genre.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <img src={props.background_image} alt="error" className={styles.img} />
      </div>
    </div>
  );
}
