import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByGenres, getGenres } from "../../redux/actions";
import styles from "./FilterByGenres.module.css";

export default function FilterByGenres({ setPage }) {
  const errorFilter = useSelector((state) => state.errorFilter);
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const handleOnChange = (e) => {
    e.preventDefault();
    if (!filters.includes(e.target.value)) {
      filters.push(e.target.value);
      dispatch(filterByGenres(e.target.value));
      setPage(1);
    }
    console.log(filters);
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    setFilters([]);
    dispatch(filterByGenres());
  };

  return (
    <div>
      <label htmlFor="genres">
        Genres:
        <br />
        {errorFilter && <span>No videogames</span>}
        <select
          id="genres"
          onChange={(e) => handleOnChange(e)}
          className={styles.genres}
        >
          <option>All </option>
          {genres.map((genre) => (
            <option value={genre.name} key={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <button className={styles.button} onClick={(e) => handleOnClick(e)}>
          x
        </button>
        <br />
        {filters.length > 0 &&
          filters.map((filter) => (
            <span key={filter}>
              · {filter} <br />
            </span>
          ))}
      </label>
    </div>
  );
}
