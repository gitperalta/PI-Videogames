const initialState = {
  videogames: [],
  videogamesAux: [],
  detail: {},
  genres: [],
  platforms: [],
  errorFilter: false,
};

export default function rootReducer(state = initialState, action) {
  let filtered = [];
  let videogamesAux = state.videogamesAux;
  let videogames = state.videogames;
  switch (action.type) {
    case "GET_ALL_VIDEOGAMES":
      return {
        ...state,
        videogames: action.data,
        videogamesAux: action.data,
        orderedAux: action.data,
      };
    case "FIND_VIDEOGAME":
      videogamesAux.forEach((game) => {
        for (const find of action.data) {
          if (game.id === find.id) {
            filtered.push(find);
          }
        }
      });
      return {
        ...state,
        videogamesAux: videogamesAux,
        videogames: filtered,
      };
    case "VIDEOGAME_DETAIL":
      return {
        ...state,
        detail: action.data,
      };
    case "GET_GENRES":
      return {
        ...state,
        genres: action.data,
      };
    case "GET_ALL_PLATFORMS":
      return {
        ...state,
        platforms: action.data,
      };
    case "FILTER_BY_GENRES":
      for (let i = 0; i < videogames.length; i++) {
        videogames[i].genres.forEach((element) => {
          if (
            element.name === action.filter &&
            !filtered.includes(videogames[i])
          ) {
            filtered.push(videogames[i]);
          }
        });
      }
      return {
        ...state,
        videogamesAux: videogamesAux,
        videogames: action.filter ? filtered : videogamesAux,
        errorFilter: filtered.length === 0 && action.filter ? true : false,
      };
    case "FILTER_BY_ORIGIN":
      if (action.filter === "db") {
        videogamesAux.forEach((game) => {
          if (game.database) {
            filtered.push(game);
          }
        });
      } else {
        videogamesAux.forEach((game) => {
          if (!game.database) {
            filtered.push(game);
          }
        });
      }
      return {
        ...state,
        videogamesAux: videogamesAux,
        videogames: filtered,
      };
    case "ORDER_BY_NAME":
      if (action.order === "as") {
        filtered = videogames.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          } else if (b.name > a.name) {
            return -1;
          } else {
            return 0;
          }
        });
      } else if (action.order === "des") {
        filtered = videogames.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          } else if (b.name > a.name) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      return {
        ...state,
        videogamesAux: videogamesAux,
        videogames: action.order === "default" ? state.orderedAux : filtered,
      };
    case "ORDER_BY_RATING":
      if (action.order === "up") {
        filtered = videogames.sort((a, b) => {
          if (a.rating < b.rating) {
            return 1;
          } else if (b.rating < a.rating) {
            return -1;
          } else {
            return 0;
          }
        });
      } else if (action.order === "down") {
        filtered = videogames.sort((a, b) => {
          if (a.rating < b.rating) {
            return -1;
          } else if (b.rating < a.rating) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      return {
        ...state,
        videogamesAux: videogamesAux,
        videogames: filtered,
      };
    default:
      return {
        ...state,
      };
  }
}
