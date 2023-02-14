import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByNameVideogames } from "../../redux/actions";
import "./SearchBar.modules.css"


const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const inputChangeHandler = (e)=>{
    e.preventDefault();
    setName(e.target.value)
  };

  const submitHandler = (e)=>{
    e.preventDefault();
    dispatch(getByNameVideogames(name))
    setName("");
  };


  return (
    <div className='searchBar_main'>
      <input 
      type="text"
      value={name}
      placeholder="Search Game..."
      onChange = {e=> inputChangeHandler(e)}
      />
      <button type="submit" onClick= {e => submitHandler(e)}> Search </button>
    </div>
  )
};

export default SearchBar;