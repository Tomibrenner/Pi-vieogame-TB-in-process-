import React from "react";
import { Link } from "react-router-dom";
import "./Card.modules.css";

const Card = (props) => {
  // {name, image, released, rating, genre, id}
  return (
    <div className="Card_main">
      <Link to={`/videogame/${props.id}`}>
        <h3>{props.name}</h3>
        <img
          src={props.image}
          alt="img not found"
          width="350px"
          height="200px"
        />
      </Link>
      <div className="atributes" >
        <li>
          <h4>Released: {props.released}</h4>
        </li>
        <li>
          <h4>Rating: {props.rating}</h4>
        </li>
        <li>
          <h4>Genres: {props.genres + " "}</h4>
        </li>
      </div>
    </div>
  );
};

export default Card;
