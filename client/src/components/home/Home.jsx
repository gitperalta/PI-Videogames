import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideogames } from "../../redux/actions";
import SearchBar from "../searchBar/SearchBar";
import Videogame from "../videogame/Videogame";
import styles from "./Home.module.css";

export default function Home() {
  const videogames = useSelector((state) => state.videogames);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVideogames());
  }, [dispatch]);

  return (
    <div>
      <h1>Home</h1>
      <SearchBar />
      <div className={styles.container}>
        {videogames.length ? (
          videogames.map((game) => (
            <Videogame
              id={game.id}
              key={game.id}
              name={game.name}
              background_image={game.background_image}
              genres={game.genres}
            />
          ))
        ) : (
          <span>loading...</span>
        )}
      </div>
    </div>
  );
}
