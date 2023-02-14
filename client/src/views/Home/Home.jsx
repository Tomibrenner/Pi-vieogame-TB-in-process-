import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../../components/Card/Card";
import Pagination from "../../components/Pagination/Pagination";
import {
  setVideogamesToLoading,
  getAllVideogames,
  getGenres,
  orderByName,
  orderByRating,
  filterSource,
  filterVideogamesByGenres,
} from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  //estados globales desde reducer
  const games = useSelector((state) => state.videogames);
  const allGenres = useSelector((state) => state.genres);

  //estados Locales para ordenar
  // eslint-disable-next-line
  const [order, setOrder] = useState("Select Order");
  // eslint-disable-next-line
  const [rating, setRating] = useState("Select Order");

  //Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(15);
  const lastGameIndex = currentPage * gamesPerPage;
  const firstGameIndex = lastGameIndex - gamesPerPage;
  let currentGame = [];
  const pages = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  if (Array.isArray(games) && games.length > 0) {
    currentGame = games.slice(firstGameIndex, lastGameIndex);
  }

  useEffect(() => {
    dispatch(setVideogamesToLoading());
    dispatch(getAllVideogames());
    dispatch(getGenres());
  }, [dispatch]);

  const orderByNameHandler = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  };

  const orderByRatingHandler = (e) => {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setRating(e.target.value);
  };

  const filterSourceHandler = (e) => {
    dispatch(filterSource(e));
    setCurrentPage(1);
  };

  const filterGenresHandler = (e) => {
    dispatch(filterVideogamesByGenres(e.target.value));
    setCurrentPage(1);
  };

  const clickHandle = (e) => {
    e.preventDefault();
    dispatch(getAllVideogames());
    setTimeout(() => {
      window.location.href = "http://localhost:3000/videogames";
    }, 1000);
  };

  return (
    <div className="background_Home">
      <h1>Choose a Game</h1>
      <div className="homeFilters">
        <div>
          <select onChange={orderByNameHandler}>
            <option value="Select order" key="s">
              Order by Name
            </option>
            <option value="Ascendent" key="a">
              A-Z
            </option>
            <option value="Descendent" key="d">
              Z-A
            </option>
          </select>
        </div>
        <div>
          <select onChange={orderByRatingHandler}>
            <option value="Select order" key="s">
              {" "}
              Order by Rating{" "}
            </option>
            <option value="BestRated" key="a">
              {" "}
              0-5{" "}
            </option>
            <option value="WorstRated" key="d">
              {" "}
              5-0{" "}
            </option>
          </select>
        </div>
        <div>
          <select onChange={(e) => filterSourceHandler(e)}>
            <option value="All Sources" key="s">
              Filter by Sources
            </option>
            <option value="Existent" key="a">
              Existent
            </option>
            <option value="Created" key="d">
              Created
            </option>
          </select>
        </div>
        <div>
          <select onChange={(e) => filterGenresHandler(e)}>
            <option value="All Genres" key="s">
              Filter by Genres
            </option>
            {allGenres.map((genre) => {
              return (
                <option value={genre.name} key={Math.random()}>
                  {genre.name}
                </option>
              );
            })}
          </select>
        </div>
        <button onClick={(e) => clickHandle(e)} id="reloadButton">
          Reset filters
        </button>
        <div className="pages_container">
          {games.loading && <h2>Loading...</h2>}
          {games.error && <h2>{games.error}</h2>}
          {Array.isArray(games) && games.length > 0 ? (
            <Pagination
              gamesPerPage={gamesPerPage}
              games={games.length}
              pages={pages}
            />
          ) : null}
        </div>
        <div className="Card_container">
          {Array.isArray(currentGame) &&
            currentGame.length > 0 &&
            currentGame.map((game) => {
              return (
                <Card
                  name={game.name}
                  image={game.background_image}
                  released={game.released}
                  rating={game.rating}
                  genres={game.genres}
                  key={game.id}
                  id={game.key}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
