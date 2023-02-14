import axios from "axios";
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

export const getAllVideogames = () =>{
  return function (dispatch){
    axios
    .get("http://localhost:3001/videogames")
    .then((response) => {
      return response.data;
    })
    .then((data) => dispatch({ type: GET_VIDEOGAMES, payload: data }))
    .catch((error) => dispatch({ type: GET_VIDEOGAMES, payload: {error: error.message} }));
  };
};
export const getByNameVideogames = (name) =>{
  return function (dispatch){
    axios
    .get(`http://localhost:3001/videogames?name=${name}`)
    .then((response) => {
      return response.data;
    })
    .then((data) => dispatch({ type: GET_BY_NAME_VIDEOGAMES, payload: data }))
    .catch((error) => dispatch({ type: GET_BY_NAME_VIDEOGAMES, payload: {error: error.message} }));
  };
};

export const setVideogamesToLoading = ()=>{
  return async function (dispatch){
   try {
    return dispatch({
      type: SET_VIDEOGAMES_TO_LOADING,
      payload: {loading: true}
    })
   } catch (error) {
    return dispatch({
      type: SET_VIDEOGAMES_TO_LOADING,
      payload: {error: error.message}
    })
   }
  }
}

export const getVideogameDetail = (id) => {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/videogame/${id}`)
      .then((resp) => dispatch({ type: GET_VIDEOGAME_DETAIL, payload: resp.data }))
      .catch((error) => console.log(error));
  };
};

export const cleanDetail = () => {
  return { type: CLEAN_DETAIL };
};

//* ------------------------------------------ GET GENRES & PLATFORMS ------------------------------------------

export const getGenres = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get("http://localhost:3001/genres");
      const genres = apiData.data;
      dispatch( { type: GET_GENRES, payload: genres} );
    } catch (error) {
      console.log(error)
    }
  };
};


//* ------------------------------------------ FILTROS Y ORDENAMIENTO ------------------------------------------

export const filterVideogamesByGenres = (genreName) => {
  return {
      type: FILTER_BY_GENRES,
      payload: genreName
    }
};

export const filterSource = (payload)=>{
  return {
    type: FILTER_BY_SOURCE,
    payload
}};

export const orderByName = (payload)=>{
  return {
    type: ORDER_BY_NAME,
    payload
}};

export const orderByRating = (payload)=>{
  return {
    type: ORDER_BY_RATING,
    payload
}};


// export const getUsers = () => {
//   return async function (dispatch) {
//     const apiData = await axios.get(
//       `https://api.rawg.io/api/games?key=${API_KEY}`
//     );
//         console.log(apiData.data);
//     const users = apiData.data.results;

//     dispatch({type: GET_USERS, payload: users});
//   };
// };



