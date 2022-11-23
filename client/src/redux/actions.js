import axios from "axios";

export function getAllVideogames() {
  return function (dispatch) {
    return axios
      .get("http://localhost:3001/videogames")
      .then((json) => json.data)
      .then((data) =>
        dispatch({
          type: "GET_ALL_VIDEOGAMES",
          data,
        })
      );
  };
}

export function findVideogame(payload) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3001/videogames?name=${payload}`)
      .then((json) => json.data)
      .then((data) => dispatch({ type: "FIND_VIDEOGAME", data }));
  };
}

export function videogameDetail(id) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3001/videogame/${id}`)
      .then((json) => json.data)
      .then((data) => dispatch({ type: "VIDEOGAME_DETAIL", data }));
  };
}
