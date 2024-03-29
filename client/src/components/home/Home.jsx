import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const history = useNavigate();
  const videogames = useSelector((state) => state.videogames);
  const dispatch = useDispatch();
  const [orderName, setOrderName] = useState("");
  const [orderRating, setOrderRating] = useState("");
  const [page, setPage] = useState(1);
  const videogamesPerPage = 15;
  const lastIndex = page * videogamesPerPage;
  const firstIndex = lastIndex - videogamesPerPage;
  const pageVideogames = videogames.slice(firstIndex, lastIndex);
  const pagesNumber = Math.ceil(videogames.length / 15);
  const post = useSelector((state) => state.post);
  const pages = [];
  for (let i = 1; i <= pagesNumber; i++) {
    pages.push([i]);
  }
  console.log(videogames);

  useEffect(() => {
    if (post === true) {
      dispatch(getAllVideogames());
      console.log("esto es");
    }
    if (videogames.length === 0) {
      dispatch(getAllVideogames());
    }
  }, [dispatch]);

  const handlePageChange = (newPage, paging) => {
    if (newPage) {
      setPage(newPage[0]);
    } else if (page !== pagesNumber && paging === "+") {
      setPage(page + 1);
    } else if (page !== 1 && paging === "-") {
      setPage(page - 1);
    }
    console.log(page);
  };

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
    setPage(1);
    console.log(videogames);
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
            <FilterByGenres setPage={setPage} />
            <FilterByOrigin setPage={setPage} />
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
        <div className={styles.number}>
          {videogames.length > 0 && (
            <div className={styles.paging}>
              {pages.length > 1 && (
                <button
                  id="-"
                  onClick={(e) => handlePageChange(null, e.target.id)}
                  className={styles.font}
                >
                  PREV
                </button>
              )}
              {pages.map((newPage) => (
                <button
                  key={newPage}
                  onClick={() => handlePageChange(newPage)}
                  className={styles.font}
                >
                  {newPage}
                </button>
              ))}
              {pages.length > 1 && (
                <button
                  id="+"
                  onClick={(e) => handlePageChange(null, e.target.id)}
                  className={styles.font}
                >
                  NEXT
                </button>
              )}
            </div>
          )}
        </div>
        {videogames.length > 0 ? (
          <div>
            <div className={styles.pageNumberTop}>page: {page}</div>
            <div className={styles.container}>
              {pageVideogames.map((game) => (
                <Videogame
                  id={game.id}
                  key={game.id}
                  name={game.name}
                  background_image={game.background_image}
                  genres={game.genres}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.all}>
            <div className={styles.loader}>
              <div className={styles.bar1}></div>
              <div className={styles.bar2}></div>
              <div className={styles.bar3}></div>
              <div className={styles.bar4}></div>
              <div className={styles.bar5}></div>
              <div className={styles.bar6}></div>
              <div className={styles.bar7}></div>
              <div className={styles.bar8}></div>
              <div className={styles.bar9}></div>
              <div className={styles.bar10}></div>
              <div className={styles.bar11}></div>
              <div className={styles.bar12}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
