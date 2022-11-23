const initialState = {
  videogames: [],
  detail: {},
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_VIDEOGAMES":
      return { ...state, videogames: action.data };
    case "FIND_VIDEOGAME":
      return { ...state, videogames: action.data };
    case "VIDEOGAME_DETAIL":
      return { ...state, detail: action.data ?? {} };
    default:
      return { ...state };
  }
}
