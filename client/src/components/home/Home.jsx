import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Bar from "../../bar/Bar";
import {
  findVideogame,
  getAllVideogames,
  orderByName,
  orderByRating,
} from "../../redux/actions";
import FilterByGenres from "../filterByGenres/FilterByGenres";
import FilterByOrigin from "../filterByOrigin/FilterByOrigin";
import Videogame from "../videogame/Videogame";
import styles from "./Home.module.css";

export default function Home() {
  const videogames = useSelector((state) => state.videogames);
  const findAux = useSelector((state) => state.findAux);
  const dispatch = useDispatch();
  const [orderName, setOrderName] = useState("");
  const [orderRating, setOrderRating] = useState("");

  useEffect(() => {
    dispatch(getAllVideogames());
  }, [dispatch]);

  const handleOrderName = (e) => {
    setOrderName(e.target.id);
    dispatch(orderByName(e.target.id));
  };

  const handleOrderRating = (e) => {
    setOrderRating(e.target.id);
    dispatch(orderByRating(e.target.id));
  };

  const handleOnSearch = (e) => {
    dispatch(findVideogame(e.target.value));
    console.log(findAux);
  };

  return (
    <div className={styles.home}>
      <Bar />
      <div className={styles.filters}>
        <nav className={styles.lateral}>
          <label htmlFor="search">
            Search Videogame:
            <input
              id="search"
              type="search"
              placeholder="Videogame Name..."
              onChange={(e) => handleOnSearch(e)}
              className={styles.bars}
            />
          </label>
          <div className={styles.filters}>
            <div className={styles.titles}>Filters</div>
            <FilterByGenres />
            <FilterByOrigin />
          </div>
          <div className={styles.items}>
            <div className={styles.titles}>Orders</div>
            <span>Name</span>
            <div className={styles.order}>
              <label htmlFor="as" className={styles.input}>
                <input
                  type="radio"
                  name="orderName"
                  id="as"
                  checked={orderName === "as"}
                  onChange={(e) => handleOrderName(e)}
                />
                A - Z
              </label>
              <label htmlFor="des" className={styles.input}>
                <input
                  type="radio"
                  name="orderName"
                  id="des"
                  checked={orderName === "des"}
                  onChange={(e) => handleOrderName(e)}
                />
                Z - A
              </label>
            </div>
            <span>Rating</span>
            <div className={styles.order}>
              <label htmlFor="up">
                <input
                  type="radio"
                  id="up"
                  name="orderRating"
                  checked={orderRating === "up"}
                  onChange={(e) => handleOrderRating(e)}
                />
                Ascending
              </label>
              <label htmlFor="down">
                <input
                  type="radio"
                  id="down"
                  name="orderRating"
                  checked={orderRating === "down"}
                  onChange={(e) => handleOrderRating(e)}
                />
                Descending
              </label>
            </div>
          </div>
        </nav>
        <div className={styles.container}>
          {videogames.length > 0 ? (
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
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </div>
  );
}
