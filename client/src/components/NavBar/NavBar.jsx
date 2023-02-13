import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.modules.css'

const NavBar = () =>{

  return (
    <div className='nav_main'>
        <Link to='/videogames'>Home</Link>
        <Link to='/creategame'>Create game</Link>
    </div>
  )
}

export default NavBar