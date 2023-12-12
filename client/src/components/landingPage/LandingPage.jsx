import React from "react";
import styles from "./LandingPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllVideogames } from "../../redux/actions";

export default function LandingPage() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const handleOnStart = (e) => {
    e.preventDefault();
    dispatch(getAllVideogames());
    return history("/home");
  };

  return (
    <div className={styles.container}>
      <div className={styles.div}>
        This is the my PI about videogames. You can search any game you want to
        find based in genres or even the origin of it.
        <br /> And the best part is that you can create your own videogame.
        <br /> Lets go, just press start to initiate tha game.
      </div>
      <Link to="/home">
        <input
          type="button"
          value="START"
          className={styles.button}
          onClick={(e) => handleOnStart(e)}
        />
      </Link>
    </div>
  );
}
