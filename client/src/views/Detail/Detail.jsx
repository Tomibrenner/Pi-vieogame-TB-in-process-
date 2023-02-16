import { React, useEffect } from "react";
import { connect } from "react-redux";
import { getVideogameDetail } from "../../redux/actions";
import photo from "../../img/created.jpg";
import "./Detail.modules.css";

function GameDetails(props) {
  const { getVideogameDetail, gameDetails } = props;
  const { idVideogame } = props.match.params;

  // me carga los details del juego
  useEffect(() => {
    getVideogameDetail(idVideogame);
  }, [getVideogameDetail, idVideogame]);

  return (
    <div className="container-detail">
      <div className="details-div">
        {gameDetails ? (
          <div>
            <h3 className="title">{gameDetails.name}</h3>
            {gameDetails.background_image ? (
              <div className="div-img">
                <img src={gameDetails.background_image} alt="Videogame"></img>
              </div>
            ) : (
              <div className="div-img">
                <img src={photo} alt="Videogame"></img>
              </div>
            )}
            {
              <p>
                <strong>Release Date</strong>:{" "}
                {`${gameDetails.releaseDate || "None"}`}
              </p>
            }
            <p>
              <strong>Rating</strong>: ★ {`${gameDetails.rating}`}
            </p>
            {gameDetails.description ? (
              <div className="div-descr">
                <strong>Description: </strong>
                {
                  <p className="descripcion">
                    {gameDetails.description.replace(/(<([^>]+)>)/gi, "")}
                  </p>
                }
                {
                  <p>
                    <strong>Genres</strong>: {`${gameDetails.genres}`}
                  </p>
                }
                {
                  <p>
                    <strong>Platforms</strong>: {`${gameDetails.platforms}`}
                  </p>
                }
              </div>
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    gameDetails: state.videogameDetail,
  };
};

export default connect(mapStateToProps, { getVideogameDetail })(GameDetails);
