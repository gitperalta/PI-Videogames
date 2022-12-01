import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByGenres, getGenres } from "../../redux/actions";

export default function FilterByGenres() {
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
        <select id="genres" onChange={(e) => handleOnChange(e)}>
          <option>All </option>
          {genres.map((genre) => (
            <option value={genre.name} key={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <input
          type="button"
          value="    X    "
          style={{ cursor: "pointer" }}
          onClick={(e) => handleOnClick(e)}
        />
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
