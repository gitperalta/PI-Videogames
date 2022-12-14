import axios from "axios";

export function getAllVideogames() {
  return function (dispatch) {
    return axios
      .get("/videogames")
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
      .get(`/videogames?name=${payload}`)
      .then((json) => json.data)
      .then((data) => dispatch({ type: "FIND_VIDEOGAME", data }))
      .catch((error) => alert(error.response.data));
  };
}

export function videogameDetail(id) {
  return function (dispatch) {
    return axios
      .get(`/videogame/${id}`)
      .then((json) => json.data)
      .then((data) => dispatch({ type: "VIDEOGAME_DETAIL", data }));
  };
}

export function getGenres() {
  return function (dispatch) {
    return axios
      .get("/genres")
      .then((json) => json.data)
      .then((data) => dispatch({ type: "GET_GENRES", data }));
  };
}

export function filterByGenres(filter) {
  return function (dispatch) {
    return dispatch({ type: "FILTER_BY_GENRES", filter });
  };
}

export function filterByOrigin(filter) {
  return function (dispatch) {
    dispatch({ type: "FILTER_BY_ORIGIN", filter });
  };
}

export function getAllPlatforms() {
  return function (dispatch) {
    return axios
      .get("/platforms")
      .then((json) => json.data)
      .then((data) => dispatch({ type: "GET_ALL_PLATFORMS", data }));
  };
}

export function postVideogame(form) {
  return function (dispatch) {
    return axios
      .post("/videogames", form)
      .then((data) => {
        axios("/videogames")
          .then((json) => json.data)
          .then((data) => dispatch({ type: "GET_ALL_VIDEOGAMES", data }));
        return data;
      })
      .then((data) => alert(data.data))
      .catch((error) => alert(error.message));
  };
}

export function orderByName(order) {
  return function (dispatch) {
    return dispatch({ type: "ORDER_BY_NAME", order });
  };
}

export function orderByRating(order) {
  return function (dispatch) {
    return dispatch({ type: "ORDER_BY_RATING", order });
  };
}
