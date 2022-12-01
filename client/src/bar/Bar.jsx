import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Bar.module.css";

export default function Bar() {
  return (
    <>
      <nav className={styles.menu}>
        <NavLink to="/home" className={styles.link}>
          <div className={styles.div}> HOME</div>
        </NavLink>
        <NavLink to="/create" className={styles.link}>
          <div className={styles.div}> CREATE VIDEOGAME </div>
        </NavLink>
      </nav>
    </>
  );
}
