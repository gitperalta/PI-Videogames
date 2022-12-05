import React from "react";
import styles from "./LandingPage.module.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <div>
        <Link to="/home">
          <input type="button" value="START" style={{ cursor: "pointer" }} />
        </Link>
      </div>
    </div>
  );
}
