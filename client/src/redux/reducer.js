import {
  GET_VIDEOGAMES,
  GET_BY_NAME_VIDEOGAMES,
  GET_GENRES,
  GET_VIDEOGAME_DETAIL,
  CLEAN_DETAIL,
  FILTER_BY_GENRES,
  FILTER_BY_SOURCE,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
  SET_VIDEOGAMES_TO_LOADING,
} from "./const.js";

const initialState = {
  videogames: {},
  all_videogames: [],
  genres: [],
  videogameDetail: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        all_videogames: action.payload,
      };
    case GET_BY_NAME_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
      };
    case SET_VIDEOGAMES_TO_LOADING:
      return {
        ...state,
        videogames: action.payload,
      };
    case GET_VIDEOGAME_DETAIL:
      return {
        ...state,
        videogameDetail: action.payload,
        
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        videogameDetail: {},
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case FILTER_BY_GENRES:
      const allVideogames = state.all_videogames;
      const genresFiltered =
        action.payload === "All Genres"
          ? allVideogames
          : allVideogames.filter((v) => v.genre.includes(action.payload));

      return {
        ...state,
        videogames: genresFiltered,
      };
    case FILTER_BY_SOURCE:
      const all_Videogames = state.all_videogames;
      const sourceFiltered =
        action.payload === "Created"
          ? all_Videogames.filter((v) => v.created )
          : all_Videogames.filter((v) => !v.created);

      return {
        ...state,
        videogames:
          action.payload === "All Sources" ? all_Videogames : sourceFiltered,
      };
    case ORDER_BY_NAME:
      let sortedArray =
        action.payload === "Ascendent"
          ? state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name < b.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: sortedArray,
      };
    case ORDER_BY_RATING:
      let sortedRating =
        action.payload === "BestRated"
          ? state.videogames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return 1;
              }
              if (a.rating < b.rating) {
                return -1;
              }
              return 0;
            })
          : state.videogames.sort(function (a, b) {
              if (a.rating > b.rating) {
                return -1;
              }
              if (a.rating < b.rating) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: sortedRating,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;

// const initialState = {
//   users: [],loading
// };

// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {

//     case GET_USERS:
//         return {}

//     default:
//       return { ...state };
//   }
// };

// export default rootReducer
