import React from "react";
import styles from "./LandingPage.module.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.div}>
        This is the my PI about videogames. You can search any game you want to
        find based in genres or even the origin of it.
        <br /> And the best part is that you can create your own videogame.
        <br /> Lets go, just press start to initiate tha game.
      </div>
      <Link to="/home">
        <input type="button" value="START" className={styles.button} />
      </Link>
    </div>
  );
}
