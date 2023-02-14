import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {getAllVideogames, getGenres} from '../../redux/actions';
import axios from "axios";
import "./Form.modules.css"


function validate(input){
  let errors = {};
  const blanks = /^\s+$/
  const validateLetters = /^[0-9a-zA-Z ]+$/

  if (!input.name || input.name.length === 0) {
    errors.name = 'Please enter the videogame Name';
  } else if (input.name.length > 20 ) {
    errors.name = "The name cannot have more than 20 characters"
  } else if (input.name.match(blanks)) {
    errors.name = "The name cannot be blank spaces"
  } else if (!input.name.match(validateLetters)) {
    errors.name = "You can only use alphanumeric characters"
  } else if (!input.description || input.description.length > 300) {
    errors.description = "Please write a description, no longer than 300 characters"
  } else if (input.description.match(blanks)) {
    errors.description = "The description text cannot contain only blank spaces"
  } else if (input.rating < 0 || input.rating > 5  ) {
    errors.rating = "The videogame can have a rating between 0 and 5"
  } else if(input.platforms.length === 0) {
    errors.platforms = "Please choose at least one platform"
  } else if(input.genres.length === 0) {
    errors.genres = "Please choose at least one genre"
  } else if(new Date(input.released) > new Date()) {
    errors.released = "The released date cannot be greater than today"
  }
  return errors;
};



const VideogameCreate = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const games = useSelector((state) => state.all_videogames)
  const allGenres = useSelector((state) => state.genres);
  const [ errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: 0,
    platforms: [],
    genres: []
  });

  const allNames = games.map(v => v.name.toLowerCase());

 
  useEffect(()=>{
    dispatch(getGenres())
  }, [dispatch]);

  //* ------- HANDLE INPUT -------
  const handleChange = (e)=>{
 
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setTimeout(() => {
      setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
      }));
    }, 1000);

  };

  //* -------SELECT / DELETE- GENRES -------

  const genresSelectHandler = (e)=>{
    if(!input.genres.includes(e.target.value)){
      setInput({
        ...input,
        genres: [...input.genres, e.target.value]
      });
      setTimeout(() => {
        setErrors(validate({
          ...input,
          [e.target.name]: e.target.value
        }));
      }, 2000);
    }
  }; 
  const deleteHandler = (value) =>{
    if(input.platforms.includes(value)){
      return setInput({
        ...input,
        platforms: input.platforms.filter( plataforma => plataforma !== value)
      })
    }
    if(input.genres.includes(value)){
      return setInput({
        ...input,
        genres: input.genres.filter( genero => genero !== value)
      })
    }
  };

  //*
  const errorsCheckHandler = (e) => {
    setErrors(validate(input));
  }

  //*------- SUBMIT FORM-------

  const submitHandler = async (e)=>{
    e.preventDefault();
    setErrors(validate(input));
   
    try {
        const response = await axios.post("http://localhost:3001/videogames", input)
        if(response.status >= 200 && response.status <=205){
          dispatch(getAllVideogames())
          alert("Videogame created");
          setInput({
            name: "",
            description: "",
            released: "",
            rating: 0,
            platforms: [],
            genres: []
          });
          history.push(`/videogame/${response.data.id}`) 
        } else {
          alert("Something went wrong, please try again")
        }
      } catch (error) {
        alert(`Something went wrong. ${error.message}`)
      }
    };
  

  return(
    <div className='videogameCreate_Main'>
      <h1>Create your Game</h1>
      <form onSubmit = {e => submitHandler(e)} className='form'>
        <div>
          <label htmlFor="name">Name:</label><br/>
          <input type="text" value= {input.name} name= "name" onChange = {e => handleChange(e)}/>
          { allNames.includes(input.name) ? "This videogame already exists, please create a different one" : null }
          {errors.name && (<p className='error'>{errors.name}</p>)}
        </div>
        <div>
          <label htmlFor="description">Description:</label><br/>
          <textarea value= {input.description} name= "description" onChange = {e => handleChange(e)}  rows="5" cols="33"/>
          {errors.description && (<p className='error'>{errors.description}</p>)}
        </div>
        <div>
          <label htmlFor='released'>Released date:</label><br/>
          <input type="date" value= {input.released} name= "released" onChange = {e => handleChange(e)}/>
          {errors.released && (<p className='error'>{errors.released}</p>)}
        </div>
        <div>
          <label htmlFor='rating'>Rating:</label><br/>
          <input type="number" value= {input.rating} name= "rating" onChange = {e => handleChange(e)} min={0} max={5}/>
          {errors.rating && (<p className='error'>{errors.rating}</p>)}
        </div>
        <div>
          <label htmlFor='image'>Image:</label><br/>
          <input type="text" value= {input.image} name= "image" onChange = {e => handleChange(e)}/>
        </div>
        <div>
          <label>Genres:</label><br/>
          <select onChange = {e => genresSelectHandler(e)}>
            {allGenres?.map(genero =>(
              <option value={genero.name} key={genero.id}>{genero.name}</option>
            ))}
           </select>
            {
              input.genres.map(g =>
                <div className = 'selected_Delete' key={g}>
                  <br/>
                  <button className='buttonX' onClick={()=>deleteHandler(g)}> x </button><span>{g}</span>
                </div>)
            }
             {errors.genres && (<p className='error'>{errors.genres}</p>)}
        </div><br/>
        { Object.keys(errors).length > 0 ?
        <button type="submit" disabled={true} key={Math.random()}>Cannot Submit, complete fields as required</button> :
        <button type='submit' key={Math.random()} > Game Created</button>
        }
      </form>
      <button type="button" onClick = {e=> errorsCheckHandler(e)}>Validate</button>
    </div>
  )
};

export default VideogameCreate;

// import React, { useState } from "react";
// const axios = require("axios");

// const Form = () => {
//   const [form, setForm] = useState({
//     email: "",
//     name: "",
//     phone: "",
//   });

//   const [error, setErrors] = useState({
//     email: "",
//     name: "",
//     phone: "",
//   });

//   const changeHandler = (event) => {
//     const property = event.target.name;
//     const value = event.target.value;

//     validate({ ...form, [property]: value });

//     setForm({ ...form, [property]: value });
//   };

//   const validate = (form) => {
//     //eslint-disable-next-line
//     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)) {
//       setErrors({ ...error, email: "" });
//     } else {
//       setErrors({ ...error, email: "algo mal" });
//     }
//     if (form.email === "") setErrors({ ...error, email: "email vacio" });
//   };

//   const submitHandler = (event) => {
//     event.preventDefault();
//     axios
//       .post("http://localhost:3001/videogames", form)
//       .then((res) => alert(res))
//       .catch(err=>alert(err))
//   };

//   return (
//     <form onSubmit={submitHandler}>
//       <div>
//         <label>Email: </label>
//         <input
//           type="text"
//           value={form.email}
//           onChange={changeHandler}
//           name="email"
//         />
//         {error.email && <span>{error.email}</span>}
//       </div>

//       <div>
//         <label>Name: </label>
//         <input
//           type="text"
//           value={form.name}
//           onChange={changeHandler}
//           name="name"
//         />
//       </div>

//       <div>
//         <label>Phone: </label>
//         <input
//           type="text"
//           value={form.phone}
//           onChange={changeHandler}
//           name="phone"
//         />
//       </div>

//       <button type="submit">SUBMIT</button>
//     </form>
//   );
// };

// export default Form;
