import React from "react";
import styles from "./LandingPage.module.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <Link to="/home">
        <input type="button" value="Home" style={{ cursor: "pointer" }} />
      </Link>
    </div>
  );
}
