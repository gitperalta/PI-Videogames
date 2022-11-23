import React from "react";
import { useDispatch } from "react-redux";
import { findVideogame } from "../../redux/actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const handleOnSearch = (e) => {
    e.preventDefault();
    dispatch(findVideogame(e.target.value));
  };
  return (
    <>
      <nav>
        <div>
          <label>Search Videogame: </label>
          <input
            type="search"
            placeholder="Videogame Name..."
            onChange={(e) => handleOnSearch(e)}
          />
          <input type="button" value="Search" />
        </div>
      </nav>
    </>
  );
}
