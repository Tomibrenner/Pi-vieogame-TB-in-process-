import React from 'react';
import {Link} from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import './NavBar.modules.css'

const Nav = () => {
  return(
    <div className='nav_main'>
    <Link to='/videogames'> <button>Home</button> </Link>
    <SearchBar/>
    <Link to='/creategame'><button>Create New Videogame</button>  </Link>
    </div>
  )
}

export default Nav;