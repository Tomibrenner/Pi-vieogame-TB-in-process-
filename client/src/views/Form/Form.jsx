import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideogames } from "../../redux/actions";
import axios from "axios";
import "./Form.modules.css";

function validate(input) {
  let errors = {};
  const blanks = /^\s+$/;
  const validateLetters = /^[0-9a-zA-Z ]+$/;

  if (!input.name || input.name.length === 0) {
    errors.name = "Please enter the videogame Name";
  } else if (input.name.length > 20) {
    errors.name = "The name cannot have more than 20 characters";
  } else if (input.name.match(blanks)) {
    errors.name = "The name cannot be blank spaces";
  } else if (!input.name.match(validateLetters)) {
    errors.name = "You can only use alphanumeric characters";
  } else if (!input.description || input.description.length > 300) {
    errors.description =
      "Please write a description, no longer than 300 characters";
  } else if (input.description.match(blanks)) {
    errors.description =
      "The description text cannot contain only blank spaces";
  } else if (input.rating < 0 || input.rating > 5) {
    errors.rating = "The videogame can have a rating between 0 and 5";
  } else if (input.platforms.length === 0) {
    errors.platforms = "Please choose at least one platform";
  } else if (input.genres.length === 0) {
    errors.genres = "Please choose at least one genre";
  } else if (new Date(input.released) > new Date()) {
    errors.released = "The released date cannot be greater than today";
  }
  return errors;
}

const VideogameCreate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const allVideogames = useSelector((state) => state.all_videogames);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: 0,
    background_image: "",
    platforms: "",
    genres: "",
  });

  const allNames = allVideogames.map((v) => v.name.toLowerCase());

  //* ------- HANDLE INPUT -------
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setTimeout(() => {
      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    }, 1000);
  };

  //* -------SELECT / DELETE- PALTFORMS & GENRES -------

  //*
  const handleErrorsCheck = (e) => {
    setErrors(validate(input));
  };

  //*------- SUBMIT FORM-------

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validate(input));

    try {
      const response = await axios.post(
        "http://localhost:3001/videogames",
        input
      );
      if (response.status >= 200 && response.status <= 205) {
        dispatch(getAllVideogames());
        alert("Videogame created");
        setInput({
          name: "",
          description: "",
          released: "",
          rating: 0,
          background_image: "",
          platforms: "",
          genres: "",
        });
        history.push(`/videogame/${response.data.id}`);
      } else {
        alert("Something went wrong, please try again");
      }
    } catch (error) {
      alert(`Something went wrong. ${error.message}`);
    }
  };

  return (
    <div className="videogameCreate_Main">
      <h1>Create your Videogame</h1>
      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <div>
          <label htmlFor="name">Name:</label>
          <br />
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {allNames.includes(input.name)
            ? "This videogame already exists, please create a different one"
            : null}
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <br />
          <textarea
            value={input.description}
            name="description"
            onChange={(e) => handleChange(e)}
            rows="5"
            cols="33"
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <div>
          <label htmlFor="released">Released date:</label>
          <br />
          <input
            type="date"
            value={input.released}
            name="released"
            onChange={(e) => handleChange(e)}
          />
          {errors.released && <p className="error">{errors.released}</p>}
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <br />
          <input
            type="number"
            value={input.rating}
            name="rating"
            onChange={(e) => handleChange(e)}
            min={0}
            max={5}
          />
          {errors.rating && <p className="error">{errors.rating}</p>}
        </div>
        <div>
          <label htmlFor="background_image">Image:</label>
          <br />
          <input
            type="text"
            value={input.background_image}
            name="background_image"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label htmlFor="platforms">Platforms:</label>
          <br />
          <input
            type="text"
            value={input.platforms}
            name="platforms"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label htmlFor="genres">Genres:</label>
          <br />
          <input
            type="text"
            value={input.genres}
            name="genres"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <br />
        {Object.keys(errors).length > 0 ? (
          <button type="submit" disabled={true} key={Math.random()}>
            Cannot Submit, complete fields as required
          </button>
        ) : (
          <button type="submit" key={Math.random()}>
            Create Videogame
          </button>
        )}
      </form>
      <br />
      <button type="button" onClick={(e) => handleErrorsCheck(e)}>
        Validate
      </button>
      <br />
    </div>
  );
};

export default VideogameCreate;
